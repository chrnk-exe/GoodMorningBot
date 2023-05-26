from models import session, MailingUser
from service_logger import logger


@logger
def check_mailing_user(user_id):
    user = session.query(MailingUser).filter_by(id=user_id).first()
    session.commit()
    return user if user is None else True
