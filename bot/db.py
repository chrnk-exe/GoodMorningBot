from models import session, User, Videos, MailingUser
import json

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


