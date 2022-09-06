import datetime
from enum import unique
from time import timezone
from sqlalchemy import create_engine
from sqlalchemy import Column, Integer, String, Text, Date, Boolean, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.dialects.postgresql import BYTEA
from sqlalchemy.sql import func

engine = create_engine('postgresql://postgres:qwerty@localhost:5432/BotDB', echo=False)
Session = sessionmaker(bind=engine)
session = Session()
Base = declarative_base()

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    email = Column(String)
    password = Column(String)
    vklink = Column(String)
    last_vizit = Column(Date)
    added_videos = Column(Text, nullable=False)
    isAdmin = Column(Boolean)
    activated = Column(Boolean)
    createdAt = Column(DateTime, default=datetime.datetime.utcnow)
    updatedAt = Column(DateTime, default=datetime.datetime.utcnow)

    def __init__(self, id, email, password, vklink, last_vizit, added_videos, isAdmin, activated = False):
        self.id = id
        self.email = email
        self.password = password
        self.vklink = vklink
        self.last_vizit = last_vizit
        self.added_videos = added_videos
        self.isAdmin = isAdmin
        self.activated = activated


class Videos(Base):
    __tablename__ = 'videos'
    id = Column(Integer, primary_key=True)
    ownerid = Column(Integer)
    content = Column(BYTEA)
    vkcontent = Column(String)
    day = Column(Integer)
    date_of_creation = Column(Date)
    createdAt = Column(DateTime, default=datetime.datetime.utcnow)
    updatedAt = Column(DateTime, default=datetime.datetime.utcnow)
    
    def __init__(self, ownerid, content, vkcontent, day):
        self.ownerid = ownerid
        self.content = content
        self.vkcontent = vkcontent
        self.day = day
        self.date_of_creation = datetime.datetime.now()

class MailingUser(Base):
    __tablename__ = 'mailing_list'
    id = Column(Integer, primary_key=True)
    vklink = Column(String)
    customVideos = Column(Text)
    createdAt = Column(DateTime, default=datetime.datetime.utcnow)
    updatedAt = Column(DateTime, default=datetime.datetime.utcnow)

    def __init__(self, vklink, vkid, customVideos):
        self.id = vkid
        self.vklink = vklink
        self.customVideos = customVideos

Base.metadata.create_all(engine)

# user = User(184915743, 'ivan_kot2001@mail.ru', 'iqw184915743', 'vk.com/id184915743', datetime.date(2022, 1, 1).today(), '[]', True)
# session.add(user)
# session.commit()

# print(session.query(User).filter_by(name='Вася').first().email)