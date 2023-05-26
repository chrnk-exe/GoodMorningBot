from models import session, Admins
from service_logger import logger


@logger
def is_admin(user_id):
    user = session.query(Admins).filter_by(id=user_id).first()
    session.commit()
    return user is not None
