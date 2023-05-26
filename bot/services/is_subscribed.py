from models import session, MailingUser
from services.service_logger import logger


@logger
def is_subscribed(user_id):
    user = session.query(MailingUser).filter_by(id=user_id).first()
    session.commit()
    return user is not None
