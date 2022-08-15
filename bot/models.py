from sqlalchemy import create_engine
from sqlalchemy import Column, Integer, String, Text, Date, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.dialects.postgresql import BYTEA
import time
import json
import datetime

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

    def __init__(self, id, email, password, vklink, last_vizit, added_videos, isAdmin):
        self.id = id
        self.email = email
        self.password = password
        self.vklink = vklink
        self.last_vizit = last_vizit
        self.added_videos = added_videos
        self.isAdmin = isAdmin



class Videos(Base):
    __tablename__ = 'videos'
    id = Column(Integer, primary_key=True)
    ownerid = Column(Integer)
    content = Column(BYTEA)
    day = Column(Integer)
    
    def __init__(self, ownerid, content, day):
        self.ownerid = ownerid
        self.content = content
        self.day = day

class MailingUser(Base):
    __tablename__ = 'mailing_list'
    id = Column(Integer, primary_key=True)
    vklink = Column(String)
    customVideos = Column(Text)

    def __init__(self, vklink, vkid, customVideos):
        self.id = vkid
        self.vklink = vklink
        self.customVideos = customVideos

Base.metadata.create_all(engine)

# user = User(184915743, 'ivan_kot2001@mail.ru', 'iqw184915743', 'vk.com/id184915743', datetime.date(2022, 1, 1).today(), '[]', True)
# session.add(user)
# session.commit()

# print(session.query(User).filter_by(name='Вася').first().email)