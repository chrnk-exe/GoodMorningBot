from models import session, User, Videos
import json

def add_user(name, email, password, vklink, last_vizit, added_videos):
    new_user = User(name, email, password, vklink, last_vizit, added_videos)
    session.add(new_user)
    session.commit()

def add_video_to_user(id, videoid):
    user = session.query(User).filter_by(id=id).first()
    try:
        video = session.query(Videos).filter_by(id=videoid).first()
        if video.id:
            userVideos = json.loads(user.added_videos)
            try:
                userVideos.index(videoid)
            except:
                userVideos.append(videoid)
                user.added_videos = json.dumps(userVideos)
                session.commit()
    except:
        raise ValueError

