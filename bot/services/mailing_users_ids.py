from models import session, MailingUser
from service_logger import logger


@logger
def mailing_users_ids():
    mailing_users = session.query(MailingUser).all()
    session.commit()
    return [user.id for user in mailing_users]
