from models import session, User, Videos, MailingUser, Column
import datetime, json

def mailing_users_ids():
    mailing_users = session.query(MailingUser).all()
    session.commit()
    # ids = []
    # for user in mailing_users:
    #     ids.append(user.id)
    return [user.id for user in mailing_users]