import json, random, re
from models import session, User, Videos, MailingUser
from services.services import is_subscribed, is_admin

from vk_session import vk_session


def get_button(button):
    return {
        "action": {
            "type": "text",
            "payload": "{\"button\": \""+ "1" + "\"}",
            "label": str(button['text'])
        },
        "color": str(button['color'])
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

def get_keyboard_arr(item):
    if type(item) is list:
        return list(map(get_button, item))
    else:
        return [get_button(item)]

def configure_keyboard(user_id):
    user_is_admin = is_admin(user_id)
    user_is_subscribed = is_subscribed(user_id)

    # configure_keyboard
    arr = []
    if user_is_subscribed:
        arr.append({'text': 'Отписаться от рассылки', 'color': 'negative'})
    else:
        arr.append({'text': 'Подписаться на рассылку', 'color': 'positive'})
    if user_is_admin:
        arr.append({'text': 'Разослать!', 'color': 'secondary'})
    arr.append([
        {'text': 'Об авторе', 'color': 'secondary'}, 
        {'text': 'Как добавить видео', 'color': 'secondary'}
    ])

    # getting keyboard 
    buttons = []
    for line_of_buttons in arr:
        buttons.append(get_keyboard_arr(line_of_buttons))

    # keyboard settings 
    keyboard = {
        "one_time": False,
        "buttons": buttons
    }
    keyboard = json.dumps(keyboard, ensure_ascii=False).encode("utf-8")
    keyboard = str(keyboard.decode("utf-8"))
    return keyboard
    

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

def get_random_video():
    videos = list(map(lambda x: x.vkcontent, session.query(Videos).all()))
    session.commit()
    return videos[random.randint(0, len(videos) - 1)]