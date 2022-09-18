from models import session, User, Videos, MailingUser, Column
import datetime, json
from services.check_mailing_user import *

def add_mailing_user(id):
    if check_mailing_user(id) == None:
        new_user = MailingUser('vk.com/id'+str(id), id, '[]')
        session.add(new_user)
    session.commit()