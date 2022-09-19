from models import session, User, Videos, MailingUser, Column
import datetime, json

def is_admin(id):
    user = session.query(User).filter_by(id=id).first()
    session.commit()
    try:
        return user.isAdmin
    except:
        return False