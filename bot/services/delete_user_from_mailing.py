from models import session, User, Videos, MailingUser, Column
import datetime, json


def delete_user_from_mailing(userID: int) -> int:
    user = session.query(MailingUser).filter_by(id=userID).first()
    try:
        session.delete(user)
    except Exception as ex:
        print('Пользователя vk.com/id' + str(userID) + ' не существует в базе данных')
        return -1
    session.commit()
    return 0