import os
from vk_api.longpoll import VkLongPoll, VkEventType
from lib import write_msg, configure_keyboard, get_attach_content_user
from vk_session import vk_session
from services.services import *
import logging
from dotenv import load_dotenv
load_dotenv()

isProduction = os.getenv('APP_MODE') == 'production'

main_logger = logging.getLogger(__name__)
main_logger.setLevel(logging.DEBUG if isProduction else logging.INFO)
handler = logging.FileHandler(f"./logs/{__name__}.log", mode='a')
handler.setFormatter(logging.Formatter("%(name)s %(asctime)s %(levelname)s %(message)s"))
main_logger.addHandler(handler)


# attachment
VIDEO = 'video'

# Название кнопок
buttons = {
    'sub':'Подписаться на рассылку',
    'unsub': 'Отписаться от рассылки',
    'about': 'Об авторе',
    'add': 'Добавить своё видео',
    'send': 'Разослать!'
}

if __name__ == '__main__':
    longpoll = VkLongPoll(vk_session)
    # Работа с сообщениями
    # Основной цикл
    main_logger.info('[APP]: Started')
    for event in longpoll.listen():
        # Если пришло новое сообщение
        if event.type == VkEventType.MESSAGE_NEW:
            # Если оно имеет метку для бота
            if event.to_me:
                # Сообщение от пользователя
                user_id, attachments, request = event.user_id, event.attachments, event.text
                main_logger.info(f'New message from: {user_id}')

                if request == buttons['sub']:
                    add_mailing_user(user_id)
                    write_msg(user_id, 'Спасибо!', configure_keyboard(user_id))
                    main_logger.debug(f'New sub: {user_id}')
                    continue

                if request == buttons['unsub']:
                    message = 'Вы и не были подписаны!' if delete_user_from_mailing(user_id) == -1 else 'За что...'
                    write_msg(user_id, message, configure_keyboard(user_id))
                    main_logger.debug(f'New unsubscribe: {user_id}')
                    continue

                if request == buttons['about']:
                    write_msg(user_id, 'https://vk.com/no_one_hears_u', configure_keyboard(user_id))
                    continue
                    
                if request == buttons['add']:
                    write_msg(user_id, 'Пришлите ваше видео!', configure_keyboard(user_id))
                    continue

                if request.find('добавить админа') != -1 and is_admin(user_id):
                    id_list = [int(s) for s in request.split(' ') if s.isdigit()]
                    message = f'vk.com/id{user_id} теперь админ!' if add_admin(id_list[0]) == 0 else f'vk.com/id' \
                                                                                                     f'{user_id} и так' \
                                                                                                     f' админ!'
                    write_msg(user_id, message, configure_keyboard(user_id))
                    main_logger.info(f'New admin: vk.com/id{id_list[0]}')
                    continue

                if request.find('удалить админа') != -1 and is_admin(user_id):
                    id_list = [int(s) for s in request.split(' ') if s.isdigit()]
                    message = 'Его и так нет в БД' if delete_admin(id_list[0]) == 1 else f'vk.com/id + {user_id}' \
                                                                                         f' теперь не админ!'
                    write_msg(user_id, message, configure_keyboard(user_id))
                    main_logger.info(f'Admin vk.com/id{id_list[0]} deleted by {user_id}')
                    continue

                if request == buttons['send'] and is_admin(user_id):
                    for mailing_user_id in mailing_users_ids():
                        write_msg(mailing_user_id, 'С добрым утром!', configure_keyboard(mailing_user_id),
                                  get_random_video())
                    main_logger.info(f'New mailing by user {user_id}')
                    continue

                contents = get_attach_content_user(attachments, VIDEO)
                if len(contents) and is_admin(user_id):
                    add_video_to_mailing(user_id, contents)
                    main_logger.info(f'New content from {user_id}, video is {contents}')
                    continue

                if request == '1000-7':
                    write_msg(user_id, '993', configure_keyboard(user_id))
                    continue

                if request == 'test':
                    write_msg(user_id, 'test video', configure_keyboard(user_id), contents[0])
                    print(contents[0])
                    continue

                write_msg(user_id, 'Прости, я не знаю что тебе ответить(', configure_keyboard(user_id))