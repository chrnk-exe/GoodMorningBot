from models import session, MailingUser
from services.service_logger import logger, service_logger


@logger
def delete_user_from_mailing(userID: int) -> int:
    user = session.query(MailingUser).filter_by(id=userID).first()
    try:
        session.delete(user)
    except Exception as ex:
        service_logger.debug(f'Пользователя vk.com/id{str(userID)} не существует в базе данных')
        return 1
    session.commit()
    return 0
