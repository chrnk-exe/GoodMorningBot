from models import session, Videos
import random
from services.service_logger import logger


@logger
def get_random_video():
    videos = list(map(lambda x: x.vkcontent, session.query(Videos).all()))
    session.commit()
    return videos[random.randint(0, len(videos) - 1)]