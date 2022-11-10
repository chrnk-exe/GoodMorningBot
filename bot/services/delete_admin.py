from models import session, User, Videos, MailingUser, Column
import datetime, json

def delete_admin(id):
    id = session.query(id).filter_by(id=id).first()
    if id == None:
        session.commit()
        return 'Его и так нет в БД'
    session.delete(id)
    session.commit()
    return 'vk.com/id' + str(id) + ' теперь не админ!'