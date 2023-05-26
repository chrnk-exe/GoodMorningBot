import datetime
import os
import logging
from sqlalchemy import create_engine
from sqlalchemy import Column, Integer, String, Text, Date, Boolean, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.dialects.postgresql import BYTEA
from dotenv import load_dotenv
load_dotenv()

database_username = os.getenv('DB_USERNAME')
database_password = os.getenv('DB_PASSWORD')
database_host = os.getenv('DB_HOST')
database_port = os.getenv('DB_PORT')
database_name = os.getenv('DB_DATABASE')

isProduction = os.getenv('APP_MODE') == 'production'
logging.basicConfig(level=logging.DEBUG if isProduction else logging.INFO,
                    filename=f'{os.getcwd()}/../logs/{__name__}.log', filemode='a',
                    format="%(name)s %(asctime)s %(levelname)s %(message)s")


engine = create_engine(f'postgresql://{database_username}:{database_password}@{database_host}:{database_port}/'
                       f'{database_name}', echo=False)
Session = sessionmaker(bind=engine)
session = Session()
Base = declarative_base()

logging.info(f'[DB]: Connected to {database_name} by {database_username}:{database_password} on {database_host}:'
             f'{database_port}')


class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    email = Column(String)
    password = Column(String)
    vklink = Column(String)
    last_vizit = Column(Date)
    added_videos = Column(Text, nullable=False)
    vk_access_token = Column(String)
    activated = Column(Boolean)
    createdAt = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.now)
    updatedAt = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.now)

    def __init__(self, id, email, password, vklink, last_vizit, added_videos, activated = False):
        self.id = id
        self.email = email
        self.password = password
        self.vklink = vklink
        self.last_vizit = last_vizit
        self.added_videos = added_videos
        # self.isAdmin = isAdmin
        # self.vk_access_token = vk_access_token
        self.activated = activated


class Videos(Base):
    __tablename__ = 'videos'
    id = Column(Integer, primary_key=True)
    ownerid = Column(Integer)
    content = Column(BYTEA)
    vkcontent = Column(String)
    day = Column(Integer)
    
    # date_of_creation = Column(Date)
    createdAt = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.now)
    updatedAt = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.now)
    
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
    createdAt = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.now)
    updatedAt = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.now)

    def __init__(self, vklink, vkid, customVideos):
        self.id = vkid
        self.vklink = vklink
        self.customVideos = customVideos


class Admins(Base):
    __tablename__ = 'admins'
    id = Column(Integer, primary_key=True)
    createdAt = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.now)
    updatedAt = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.now)

    def __init__(self, id):
        self.id = id


Base.metadata.create_all(engine)
