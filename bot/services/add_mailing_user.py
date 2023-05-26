from models import session, MailingUser
from services.check_mailing_user import check_mailing_user
from services.service_logger import logger


@logger
def add_mailing_user(user_id):
    if check_mailing_user(user_id) is None:
        new_user = MailingUser(vkid=user_id, vklink='vk.com/id' + str(user_id), customVideos='[]')
        session.add(new_user)
        session.commit()
