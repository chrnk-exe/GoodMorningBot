import vk_api, json, requests
import random
from vk_api.keyboard import VkKeyboard, VkKeyboardColor
from vk_api.longpoll import VkLongPoll, VkEventType
from vk_api.upload import VkUpload

from vk_session import vk_session


def get_button(text, color):
    return {
        "action": {
            "type": "text",
            "payload": "{\"button\": \""+ "1" + "\"}",
            "label": str(text)
        },
        "color": str(color)
    }

def add_video(name):
    return {
        'name': name,
        'description': '',
        'is_private': 1,
        'wallpost': 0,
        'no_comments': 1,
    }

def write_msg(user_id, message, keyboard):
    vk_session.method('messages.send', {'user_id': user_id, 'message': message, "random_id": 0, "keyboard": keyboard})

def configure_keyboard(arr):
    buttons = []
    for button in arr:
        buttons.append([get_button(button['text'], button['color'])])
    keyboard = {
        "one_time": False,
        "buttons": buttons
    }
    keyboard = json.dumps(keyboard, ensure_ascii=False).encode("utf-8")
    keyboard = str(keyboard.decode("utf-8"))
    return keyboard