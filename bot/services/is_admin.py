from models import session, User, Videos, MailingUser, Column, Admins
import datetime, json

def is_admin(id):
    id = session.query(Admins).filter_by(id=id).first()
    session.commit()
    return True if id is not None else False
