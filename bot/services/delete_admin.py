from models import session, User, Videos, MailingUser, Column
import datetime, json

def delete_admin(id):
    user = session.query(User).filter_by(id=id).first()
    if user == None:
        session.commit()
        return 'Его и так нет в БД'
    user.isAdmin = False
    session.commit()
    return 'vk.com/id' + str(id) + ' теперь не админ!'