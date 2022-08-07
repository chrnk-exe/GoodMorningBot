import vk_api, json, requests
import random
import time
from vk_api.keyboard import VkKeyboard, VkKeyboardColor
from vk_api.longpoll import VkLongPoll, VkEventType
from vk_api.upload import VkUpload

from apifuncs import write_msg, add_video, configure_keyboard, get_attach_content_user, get_attach_content_only
from vk_session import vk_session
from db import *


videos = []

buttons = {'sub':'Подписаться на рассылку', 'unsub': 'Отписаться от рассылки', 'about': 'Об авторе', 'add': 'Добавить своё видео'}

if __name__ == '__main__':
    keyboard = configure_keyboard([
    	{'text': 'Подписаться на рассылку', 'color': 'positive'}, 
    	{'text': 'Отписаться от рассылки', 'color': 'negative'}, 
    	{'text': 'Об авторе', 'color': 'secondary'}
    ])
    
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
                request = event.text
                attachments = event.attachments
                if request == buttons['sub']:
                    write_msg(event.user_id, 'Спасибо!', keyboard)
                    add_mailing_user(event.user_id)
                if request == buttons['unsub']:
                    write_msg(event.user_id, delete_user_from_mailing(event.user_id), keyboard)
                if request == buttons['about']:
                    write_msg(event.user_id, 'https://vk.com/no_one_hears_u', keyboard)
                if request == buttons['add']:
                    write_msg(event.user_id, 'Пришлите ваше видео!', keyboard)
                print(attachments)
                print(get_attach_content_user(attachments))
                # print(get_attach_content_only(attachments))
        #         try:
        #         	n = int(event.text)
        #         	if n < 4095 and n > 0:
        #         		write_msg(event.user_id, 'a' * n, keyboard)
        #         	else: 
        #         		write_msg(event.user_id, 'Плохое число...', keyboard)
        #         except:
        #         	write_msg(event.user_id, event.text, keyboard)