from sqlalchemy import create_engine
from sqlalchemy import Column, Integer, String, Text, Date, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.dialects.postgresql import BYTEA
import time
import json

engine = create_engine('postgresql://postgres:1234@localhost:5432/BotDB', echo=False)
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

    def __init__(self, name, email, password, vklink, last_vizit, added_videos, isAdmin):
        self.name = name
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

    def __init__(self, ownerid, content, day):
        self.vklink = vklink
        self.customVideos = customVideos

Base.metadata.create_all(engine)

# video = Videos(1, b'312312djaw', 0)
# user = User('Вася', 'vasya@mail.ru', '1234', 'vk.com/vassyan', '2022-02-10', '[]', True)
# session.add(user)
# session.commit()

# print(session.query(User).filter_by(name='Вася').first().email)