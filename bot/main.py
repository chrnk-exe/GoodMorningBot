from vk_api.longpoll import VkLongPoll, VkEventType
from lib import write_msg, configure_keyboard, get_attach_content_user
from vk_session import vk_session
# from db import *
from services.services import *

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
    for event in longpoll.listen():
        # Если пришло новое сообщение
        if event.type == VkEventType.MESSAGE_NEW:
            # Если оно имеет метку для бота
            if event.to_me:
                # Сообщение от пользователя
                user_id, attachments, request = event.user_id, event.attachments, event.text
                if request == buttons['sub']:
                    add_mailing_user(user_id)
                    write_msg(user_id, 'Спасибо!', configure_keyboard(user_id))
                    continue

                if request == buttons['unsub']:
                    message = 'Вы и не были подписаны!' if delete_user_from_mailing(user_id) == -1 else 'За что...'
                    write_msg(user_id, message, configure_keyboard(user_id))
                    continue

                if request == buttons['about']:
                    write_msg(user_id, 'https://vk.com/no_one_hears_u', configure_keyboard(user_id))
                    continue
                    
                if request == buttons['add']:
                    write_msg(user_id, 'Пришлите ваше видео!', configure_keyboard(user_id))
                    continue

                if request.find('добавить админа') != -1 and is_admin(user_id):
                    id_list = [int(s) for s in request.split(' ') if s.isdigit()]
                    write_msg(user_id, add_admin(id_list[0]), configure_keyboard(user_id))
                    continue

                if request.find('удалить админа') != -1 and is_admin(user_id):
                    id_list = [int(s) for s in request.split(' ') if s.isdigit()]
                    write_msg(user_id, delete_admin(id_list[0]), configure_keyboard(user_id))
                    continue

                if request == buttons['send'] and is_admin(user_id):
                    for mailing_user_id in mailing_users_ids():
                        write_msg(mailing_user_id, 'С добрым утром!', configure_keyboard(mailing_user_id),
                                  get_random_video())
                    continue

                contents = get_attach_content_user(attachments, VIDEO)
                if len(contents) and is_admin(user_id):
                    add_video_to_mailing(user_id, contents)
                    continue

                if request == '1000-7':
                    write_msg(user_id, '993', configure_keyboard(user_id))
                    continue

                if request == 'test':
                    write_msg(user_id, 'test video', configure_keyboard(user_id), contents[0])
                    print(contents[0])
                    continue

                write_msg(user_id, 'Прости, я не знаю что тебе ответить(', configure_keyboard(user_id))