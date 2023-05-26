from models import session, Admins
from services.service_logger import logger


@logger
def add_admin(user_id):
    user_is_admin = session.query(Admins).filter_by(id=user_id).first()
    if not user_is_admin:
        user = Admins(user_id)
        try:
            session.add(user)
            session.commit()
            return 0
        except:
            session.rollback()
            return 1
    else:
        session.commit()
        return 1

