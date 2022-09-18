from models import session, User, Videos, MailingUser, Column
import datetime, json

def delete_user_from_mailing(id):
    user = session.query(MailingUser).filter_by(id=id).first()
    try:
        session.delete(user)
    except Exception as ex:
        print('Пользователя vk.com/id' + str(id) + ' не существует в базе данных')
        return 'Вы и не были подписаны!'
    session.commit()
    return 'За что...'