import vk_api, json, requests
import random
from vk_api.keyboard import VkKeyboard, VkKeyboardColor
from vk_api.longpoll import VkLongPoll, VkEventType
from vk_api.upload import VkUpload

videos = []

def get_button(text, color):
    return {
        "action": {
            "type": "text",
            "payload": "{\"button\": \""+ "1" + "\"}",
            "label": str(text)
        },
        "color": str(color)
    }
keyboard = 0

def add_video(name):
    return {
        'name': name,
        'description': '',
        'is_private': 1,
        'wallpost': 0,
        'no_comments': 1,
    }

def write_msg(user_id, message, keyboard=keyboard):
    vk_session.method('messages.send', {'user_id': user_id, 'message': message, "random_id": 0, "keyboard": keyboard})

if __name__ == '__main__':
    keyboard = {
        "one_time": False,
        "buttons": [
            [get_button('Подписаться на рассылку', 'positive')],
            [get_button('Отписаться от рассылки', 'negative')],
            [get_button('Об авторе', 'secondary')]
        ]
    }
    keyboard = json.dumps(keyboard, ensure_ascii=False).encode("utf-8")
    keyboard = str(keyboard.decode("utf-8"))

    token = "vk1.a.dmeOyHG1FyokLXkTxETchbft3bxx6QPd8tyKPiD4rn2iA1CDi682zEEgpxI_8Q5sk9T5JYNyJ3XHvkemkNILJXXilHMT9vFwWLaQNpTQaq6dqfYfGlxWhMtW6vmtx1hfLtxkMw6kCtQkU9Dypo1mgIUPBITSpMdhBvdqIzCwDieDHS-pU-fIHRC6Zs3myDOQ"
    vk_session = vk_api.VkApi(token=token)
    
    longpoll = VkLongPoll(vk_session)
    # Работа с сообщениями
    # Основной цикл
    try:
        for event in longpoll.listen():
            # Если пришло новое сообщение
            if event.type == VkEventType.MESSAGE_NEW:
                # Если оно имеет метку для бота
                if event.to_me:
                    # Сообщение от пользователя
                    request = event.text
                    write_msg(event.user_id, 'aaa', keyboard)
    except KeyboardInterrupt:
        exit(0)