from models import session, User, Videos, MailingUser, Column
import datetime, json

# Доделать прикручивание видео к определённому юзеру
def add_video_to_mailing(user_id, video_seeds):
    videos = session.query(Videos).all()
    videos = list(map(lambda x: x.vkcontent, videos))
    for seed in video_seeds:
        if seed not in videos:
            session.add(Videos(user_id, None, seed, 0))
    session.commit()
    return 
    # needs testing
    videos = list(map(lambda x: x.id, session.query(Videos).filter(Videos.vkcontent._in(video_seeds)).all()))
    user = session.query(User).filter_by(id=user_id).first()
    ids = json.loads(user.added_videos)
    ids.append(videos)
    user.added_videos = json.dumps(ids)
    session.commit()