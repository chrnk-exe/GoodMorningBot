from models import session, User, Videos, MailingUser, Column
import datetime, json

def is_subscribed(id):
    user = session.query(MailingUser).filter_by(id=id).first()
    session.commit()
    try:
        return user.id
    except:
        return False