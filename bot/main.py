import imp
from vk_api.longpoll import VkLongPoll, VkEventType

from apifuncs import write_msg, configure_keyboard, get_attach_content_user, get_random_video
from vk_session import vk_session
# from db import *
from services.services import *

VIDEO = 'video'

buttons = { 'sub':'Подписаться на рассылку', 
            'unsub': 'Отписаться от рассылки', 
            'about': 'Об авторе', 
            'add': 'Добавить своё видео',
            'send': 'Разослать!'}

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
                    write_msg(user_id, delete_user_from_mailing(user_id), configure_keyboard(user_id))
                    continue


                if request == buttons['about']:
                    write_msg(user_id, 'https://vk.com/no_one_hears_u', configure_keyboard(user_id))
                    continue
                    
                if request == buttons['add']:
                    write_msg(user_id, 'Пришлите ваше видео!', configure_keyboard(user_id))
                    continue

                if request.find('добавить админа') != -1 and is_admin(user_id):
                    id = [int(s) for s in request.split(' ') if s.isdigit()]
                    write_msg(user_id, add_admin(id[0]), configure_keyboard(user_id))
                    continue

                if request.find('удалить админа') != -1 and is_admin(user_id):
                    id = [int(s) for s in request.split(' ') if s.isdigit()]
                    write_msg(user_id, delete_admin(id[0]), configure_keyboard(user_id))
                    continue

                if request == buttons['send'] and is_admin(user_id):
                    for id in mailing_users_ids():
                        write_msg(id, 'С добрым утром!', configure_keyboard(id), get_random_video())
                    continue

                contents = get_attach_content_user(attachments, VIDEO)
                if len(contents) and is_admin(user_id):
                    add_video_to_mailing(user_id, contents)
                if request == '1000-7':
                    write_msg(user_id, '993', configure_keyboard(user_id))
                if request == 'test':
                    write_msg(user_id, 'test video', configure_keyboard(user_id), contents[0])
                    print(contents[0])
                write_msg(user_id, 'ну привет!', configure_keyboard(user_id))