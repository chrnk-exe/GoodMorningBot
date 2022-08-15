from models import session, User, Videos, MailingUser, Column
from sqlalchemy.orm import load_only
import datetime

def check_mailing_user(id):
    user = session.query(MailingUser).filter_by(id=id).first()
    return user

def add_mailing_user(id):
    if check_mailing_user(id) == None:
        new_user = MailingUser('vk.com/id'+str(id), id, '[]')
        session.add(new_user)
    session.commit()
    

def add_video_to_user(user_id, video):
    pass

def delete_user_from_mailing(id):
    user = session.query(MailingUser).filter_by(id=id).first()
    try:
        session.delete(user)
    except Exception as ex:
        print('Пользователя vk.com/id' + str(id) + ' не существует в базе данных')
        return 'Вы и не были подписаны!'
    session.commit()
    return 'За что...'

# переделать на то, если юзер с таким id уже есть делать его админом
def add_admin(id):
    user = User(id ,'None', '', 'vk.com/id' + str(id), datetime.date(2022, 1, 1).today(), '[]', True)
    try: 
        session.add(user)
        session.commit()
        return 'vk.com/id' + str(id) + ' теперь админ!'
    except:
        return 'vk.com/id' + str(id) + ' и так админ!'


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
    return user.isAdmin

def mailing_users_ids():
    mailing_users = session.query(MailingUser).all()
    session.commit()
    ids = []
    for user in mailing_users:
        ids.append(user.id)
    return ids