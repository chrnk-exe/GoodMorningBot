from models import session, User, Videos, MailingUser, Column, Admins
import datetime, json

def add_admin(id):
    id = session.query(Admins).filter_by(id=id).first()
    if id == None:
        user = Admins(id)
        try: 
            session.add(user)
            session.commit()
            return 'vk.com/id' + str(id) + ' теперь админ!'
        except:
            return 'vk.com/id' + str(id) + ' и так админ!'
    else:
        session.commit()
        return 'vk.com/id' + str(id) + ' теперь админ!'