import vk_api, json, requests
import random
import re
import youtube_dl
from models import session, User
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

def write_msg(user_id, message, keyboard, attachment=None):
    if attachment == None:
        vk_session.method('messages.send', {'user_id': user_id, 'message': message, "random_id": random.randint(1, 99999999), "keyboard": keyboard})
    else:
        vk_session.method('messages.send', {'user_id': user_id, 'message': message, "random_id": random.randint(1, 99999999), "keyboard": keyboard, "attachment": 'video'+attachment})

def configure_keyboard(user_id):
    user = session.query(User).filter_by(id = user_id).first()
    arr = [
            {'text': 'Подписаться на рассылку', 'color': 'positive'}, 
            {'text': 'Отписаться от рассылки', 'color': 'negative'}, 
            {'text': 'Об авторе', 'color': 'secondary'}
        ]
    if user == None or user.isAdmin == False:        
        buttons = []
        for button in arr:
            buttons.append([get_button(button['text'], button['color'])])
        buttons[len(buttons)-1].append(get_button('Добавить своё видео', 'secondary'))
        keyboard = {
            "one_time": False,
            "buttons": buttons
        }
    else:
        buttons = []
        buttons.append([get_button(arr[0]['text'], arr[0]['color']), get_button(arr[1]['text'], arr[1]['color'])])
        buttons.append([get_button('Разослать!', 'secondary')])
        buttons.append([get_button(arr[2]['text'], arr[2]['color']), get_button('Добавить своё видео', 'secondary')])
        keyboard = {
            "one_time": False,
            "buttons": buttons
        }
    keyboard = json.dumps(keyboard, ensure_ascii=False).encode("utf-8")
    keyboard = str(keyboard.decode("utf-8"))
    return keyboard

# сделать проверку на videos, чтоб человек не мог добавить фото

def get_attach_keys(arr):
    keys = list(arr.keys())
    append = True
    new_keys = []
    for key in keys:
        if (re.search('\d+', key) is not None) and append:
            new_keys.append(key)
        append = key == 'video'
    return new_keys

def get_attach_content_user(arr, content):
    keys = list(arr.keys())
    result = []
    append = True
    for key in keys:
        if (re.search('\d+', arr[key]) is not None) and append:
            result.append(arr[key])
        append = arr[key] == content
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