import vk_api, json, requests
import random
import youtube_dl
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
    buttons[len(buttons)-1].append(get_button('Добавить своё видео', 'secondary'))
    keyboard = {
        "one_time": False,
        "buttons": buttons
    }
    keyboard = json.dumps(keyboard, ensure_ascii=False).encode("utf-8")
    keyboard = str(keyboard.decode("utf-8"))
    return keyboard

def get_attach_keys(arr):
    keys = list(arr.keys())
    new_keys = keys[1:len(keys):2]
    return new_keys

def get_attach_content_user(arr):
    keys = get_attach_keys(arr)
    result = []
    for key in keys:
        result.append(arr[key])
    return result

def get_attach_content_only(arr):
    keys = get_attach_keys(arr)
    result = []
    for key in keys:
        item = arr[key].split('_')[1]
        result.append(item)
    return result

def configure_link_to_load(attach_item):
    ownerid, msgid = attach_item.split('_')
    return 'https://vk.com/video-' + ownerid + '_' + msgid
    # https://vk.com/video-30316056_456326877

# ydl_opts = {
#     'username': '+79113084016',
#     'password': 'iQWERTY184915743ZXC'
# }

# with youtube_dl.YoutubeDL(ydl_opts) as ydl:
#     ydl.download(['https://vk.com/video-184915743_456239137'])