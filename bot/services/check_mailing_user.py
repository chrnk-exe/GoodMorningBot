from models import session, User, Videos, MailingUser, Column
import datetime, json

def check_mailing_user(id):
    user = session.query(MailingUser).filter_by(id=id).first()
    session.commit()
    return user