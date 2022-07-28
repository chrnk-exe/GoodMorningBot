import vk_api, json, requests
import random
from vk_api.keyboard import VkKeyboard, VkKeyboardColor
from vk_api.longpoll import VkLongPoll, VkEventType
from vk_api.upload import VkUpload

from apifuncs import get_button, write_msg, add_video, configure_keyboard
from vk_session import vk_session

videos = []

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
        # Если пришло новое сообщение
        if event.type == VkEventType.MESSAGE_NEW:
            # Если оно имеет метку для бота
            if event.to_me:
                # Сообщение от пользователя
                request = event.text
                try:
                	n = int(event.text)
                	if n < 4095 and n > 0:
                		write_msg(event.user_id, 'a' * n, keyboard)
                	else: 
                		write_msg(event.user_id, 'Плохое число...', keyboard)
                except:
                	write_msg(event.user_id, event.text, keyboard)