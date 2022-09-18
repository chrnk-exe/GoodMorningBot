from models import session, User, Videos, MailingUser, Column
import datetime, json

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