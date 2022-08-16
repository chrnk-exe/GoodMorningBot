from models import session, User, Videos, MailingUser, Column
import datetime, json

def check_mailing_user(id):
    user = session.query(MailingUser).filter_by(id=id).first()
    session.commit()
    return user

def add_mailing_user(id):
    if check_mailing_user(id) == None:
        new_user = MailingUser('vk.com/id'+str(id), id, '[]')
        session.add(new_user)
    session.commit()
    

# Доделать прикручивание видео к определённому юзеру
def add_video_to_mailing(user_id, video_seeds):
    videos = session.query(Videos).all()
    videos = list(map(lambda x: x.vkcontent, videos))
    for seed in video_seeds:
        if seed not in videos:
            session.add(Videos(user_id, None, seed, 0))
    session.commit()
    return 
    # needs testing
    videos = list(map(lambda x: x.id, session.query(Videos).filter(Videos.vkcontent._in(video_seeds)).all()))
    user = session.query(User).filter_by(id=user_id).first()
    ids = json.loads(user.added_videos)
    ids.append(videos)
    user.added_videos = json.dumps(ids)
    session.commit()


def delete_user_from_mailing(id):
    user = session.query(MailingUser).filter_by(id=id).first()
    try:
        session.delete(user)
    except Exception as ex:
        print('Пользователя vk.com/id' + str(id) + ' не существует в базе данных')
        return 'Вы и не были подписаны!'
    session.commit()
    return 'За что...'

def add_admin(id):
    user = session.query(User).filter_by(id=id).first()
    if user == None:
        user = User(id ,'None', '', 'vk.com/id' + str(id), datetime.date(2022, 1, 1).today(), '[]', True)
        try: 
            session.add(user)
            session.commit()
            return 'vk.com/id' + str(id) + ' теперь админ!'
        except:
            return 'vk.com/id' + str(id) + ' и так админ!'
    else:
        user.isAdmin = True
        session.commit()
        return 'vk.com/id' + str(id) + ' теперь админ!'


def delete_admin(id):
    user = session.query(User).filter_by(id=id).first()
    if user == None:
        session.commit()
        return 'Его и так нет в БД'
    user.isAdmin = False
    session.commit()
    return 'vk.com/id' + str(id) + ' теперь не админ!'

def isAdmin(id):
    user = session.query(User).filter_by(id=id).first()
    session.commit()
    try:
        return user.isAdmin
    except:
        return False

def mailing_users_ids():
    mailing_users = session.query(MailingUser).all()
    session.commit()
    ids = []
    for user in mailing_users:
        ids.append(user.id)
    return ids