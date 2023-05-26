from models import session, Admins
from services.service_logger import logger


@logger
def delete_admin(user_id):
    user = session.query(Admins).filter_by(id=user_id).first()
    if user is None:
        session.commit()
        return 1
    else:
        session.delete(user_id)
        session.commit()
        return 0
