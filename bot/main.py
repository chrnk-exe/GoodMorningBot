from vk_api.keyboard import VkKeyboard, VkKeyboardColor
from vk_api.longpoll import VkLongPoll, VkEventType
from vk_api.upload import VkUpload

from apifuncs import write_msg, add_video, configure_keyboard, get_attach_content_user, get_attach_content_only
from vk_session import vk_session
from db import *

videos = []

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
        # write_msg(631757212, 'здарова это рассылка', keyboard)
        # # Если пришло новое сообщение
        if event.type == VkEventType.MESSAGE_NEW:
            # Если оно имеет метку для бота
            if event.to_me:
                # Сообщение от пользователя
                user_id = event.user_id
                request = event.text
                attachments = event.attachments
                if request == buttons['sub']:
                    write_msg(user_id, 'Спасибо!', configure_keyboard(user_id))
                    add_mailing_user(user_id)

                if request == buttons['unsub']:
                    write_msg(user_id, delete_user_from_mailing(user_id), configure_keyboard(user_id))

                if request == buttons['about']:
                    write_msg(user_id, 'https://vk.com/no_one_hears_u', configure_keyboard(user_id))

                if request == buttons['add']:
                    write_msg(user_id, 'Пришлите ваше видео!', configure_keyboard(user_id))

                if request.find('добавить админа') != -1 and isAdmin(user_id):
                    id = [int(s) for s in request.split(' ') if s.isdigit()]
                    write_msg(user_id, add_admin(id[0]), configure_keyboard(user_id))

                if request.find('удалить админа') != -1 and isAdmin(user_id):
                    id = [int(s) for s in request.split(' ') if s.isdigit()]
                    write_msg(user_id, delete_admin(id[0]), configure_keyboard(user_id))
                if request == buttons['send'] and isAdmin(user_id):
                    for id in mailing_users_ids():
                        write_msg(id, 'Здарова, рассылочка подъехала!', configure_keyboard(id))
                contents = get_attach_content_user(attachments, VIDEO)
                if len(contents) and isAdmin(user_id):
                    add_video_to_mailing(user_id, contents)