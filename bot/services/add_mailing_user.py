from models import session, MailingUser
from services.check_mailing_user import check_mailing_user
from service_logger import logger


@logger
def add_mailing_user(user_id):
    if check_mailing_user(user_id) is None:
        new_user = MailingUser('vk.com/id' + str(user_id), user_id, '[]')
        session.add(new_user)
        session.commit()
