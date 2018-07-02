import json
import datetime
import sqlalchemy as sqla
from sqlalchemy import ForeignKey, UniqueConstraint
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
import datetime
conn = sqla.create_engine('mysql+pymysql://root@localhost/alchemytest?host=localhost?port=3306?charset=utf8', pool_pre_ping=True) 
Base = declarative_base()

class user(Base):
    __tablename__= 'user'
    user_id = sqla.Column('user_id', sqla.Integer, autoincrement=True, primary_key=True)
    user_name = sqla.Column('user_name', sqla.VARCHAR(45), nullable=False, unique=True )
    user_email = sqla.Column('user_email', sqla.VARCHAR(45), nullable=False, unique=True)
    user_password = sqla.Column('user_password', sqla.VARCHAR(45), nullable=False )
    user_bio = sqla.Column('user_bio', sqla.VARCHAR(45))

    def __init__(self, user_name, user_password, user_email, user_bio):
        self.user_name = user_name
        self.user_password = user_password
        self.user_email = user_email
        self.user_bio = user_bio

    @property
    def is_active(self):
            return True

    @property
    def is_authenticated(self):
            return True

    @property
    def is_anonymous(self):
            return False

    def get_id(self):
            try:
                    return(self.user_id)
            except AttributeError:
                    raise NotImplementedError('No `id` attribute')

    def __repr__(self):
            return self.user_name

class category(Base):
	__tablename__= 'category'
	
	category_id = sqla.Column('category_id', sqla.Integer, autoincrement=True, primary_key=True)
	category_name = sqla.Column('category_name', sqla.VARCHAR(45), nullable=False, unique=True)
	
class movie(Base):
	__tablename__= 'movie'
	
	movie_id = sqla.Column('movie_id', sqla.Integer, autoincrement=True, primary_key=True)
	movie_name = sqla.Column('movie_name', sqla.VARCHAR(50), nullable=False , unique=True)
	movie_runtime = sqla.Column('movie_runtime', sqla.Integer )
	movie_description = sqla.Column('movie_description', sqla.VARCHAR(250), unique=False )
	movie_category = sqla.Column('movie_category', sqla.VARCHAR(100),)
	movie_thumbnail = sqla.Column('movie_thumbnail', sqla.VARCHAR(150), nullable=True, unique=True )
	movie_trailer = sqla.Column('movie_trailer', sqla.VARCHAR(150), nullable=True, unique=True )
	movie_trailer_runtime = sqla.Column('movie_trailer_runtime', sqla.Integer )
	movie_release_date = sqla.Column('movie_release_date', sqla.DATE )
	movie_added_date = sqla.Column('movie_added_date', sqla.DateTime, nullable=True, default=datetime.datetime.utcnow)
	
class friends(Base):
	__tablename__= 'friends'
	friends_id = sqla.Column('friends_id', sqla.Integer, autoincrement=True, primary_key=True)
	friend_one_id = sqla.Column('friend_one_id', sqla.Integer, ForeignKey("user.user_id"), nullable=False)
	friend_two_id = sqla.Column('friend_two_id', sqla.Integer, ForeignKey("user.user_id"), nullable=False)

class friend_request(Base):
	__tablename__= 'friend_request'

	request_id = sqla.Column('request_id', sqla.Integer, autoincrement=True, primary_key=True)
	sender_id = sqla.Column('sender_id', sqla.Integer, ForeignKey("user.user_id"), nullable=False)
	receiver_id = sqla.Column('receiver_id', sqla.Integer, ForeignKey("user.user_id"), nullable=False)
	request_timestamp = sqla.Column('request_timestamp', sqla.DateTime, nullable=False, default=datetime.datetime.utcnow)

class rating(Base):
	__tablename__= 'rating'
	
	rating_id = sqla.Column('rating_id', sqla.Integer, autoincrement=True, primary_key=True)
	user_id = sqla.Column('user_id', sqla.Integer, ForeignKey("user.user_id"), nullable=False)
	movie_id = sqla.Column('movie_id', sqla.Integer, ForeignKey("movie.movie_id"), nullable=False)
	rating = sqla.Column('rating', sqla.Integer, nullable=False)
	rating_timestamp = sqla.Column('rating_timestamp', sqla.DateTime, nullable=False, default=datetime.datetime.utcnow)
	__table_args__ = (UniqueConstraint('user_id', 'movie_id', name='_user_rating'), )
	
class opmerking(Base):
	__tablename__ = 'opmerking'
	
	comment_id = sqla.Column('comment_id', sqla.Integer, autoincrement=True, primary_key=True)
	user_id = sqla.Column('user_id', sqla.Integer, ForeignKey("user.user_id"), nullable=False)
	movie_id = sqla.Column('movie_id', sqla.Integer, ForeignKey("movie.movie_id"), nullable=False)
	opmerking = sqla.Column('opmerking', sqla.VARCHAR(45), nullable=False)
	comment_timestamp = sqla.Column('comment_timestamp', sqla.DateTime, nullable=False, default=datetime.datetime.utcnow)
			
class user_activety(Base):
	__tablename__= 'user_activety'
	
	activety_id = sqla.Column('activety_id', sqla.Integer, autoincrement=True, primary_key=True)
	user_id = sqla.Column('user_id', sqla.Integer, ForeignKey("user.user_id"), nullable=False)
	movie_id = sqla.Column('movie_id', sqla.Integer, ForeignKey("movie.movie_id"), nullable=True )
	friend_id = sqla.Column('friend_id', sqla.Integer, ForeignKey("user.user_id"), nullable=True)
	activety = sqla.Column('activety', sqla.Enum('watched', 'rated', 'commented', 'recommended', 'interested', 'friends'), nullable=False)
	activety_timestamp = sqla.Column('activety_timestamp', sqla.DateTime, nullable=False, default=datetime.datetime.utcnow)

class view_status(Base):
	__tablename__= 'view_status'
	
	view_status_id = sqla.Column('view_status_id', sqla.Integer, autoincrement=True, primary_key=True)
	user_id = sqla.Column('user_id', sqla.Integer, ForeignKey("user.user_id"), nullable=False)
	movie_id = sqla.Column('movie_id', sqla.Integer, ForeignKey("movie.movie_id"), nullable=False)
	status = sqla.Column('status', sqla.Enum('interested', 'watched'), nullable=False)
	status_timestamp = sqla.Column('status_timestamp', sqla.DateTime, nullable=False, default=datetime.datetime.utcnow)
	__table_args__ = (UniqueConstraint('user_id', 'movie_id', name='_user_view_status'), )
	
class recommendation(Base):
	__tablename__= 'recommendation'
	
	recommendation_id = sqla.Column('recommendation_id', sqla.Integer, autoincrement=True, primary_key=True)
	sender_id = sqla.Column('sender_id', sqla.Integer, ForeignKey("user.user_id"), nullable=False)
	receiver_id = sqla.Column('receiver_id', sqla.Integer, ForeignKey("user.user_id"), nullable=False)
	movie_id = sqla.Column('movie_id', sqla.Integer, ForeignKey("movie.movie_id"),  nullable=False)
	recommendation_timestamp = sqla.Column('recommendation_timestamp', sqla.DateTime, nullable=False, default=datetime.datetime.utcnow)
	
class Persister():
    def persist_object(self, obj): 
        # todo
        self.session.add(obj)
        self.session.commit()
        pass;

    def __init__ (self): 
        # todo
        Session = sessionmaker(bind=conn)
        self.session = Session()
        pass


    def get_thumbs(self, id=0):
        # todo
        pass


    def get_photo(self, id):
        # todo
        pass
    

    def _repr_(self):
        return "<Persister (session: {})>".format(self.session)


#http://stackoverflow.com/questions/12122007/python-json-encoder-to-support-datetime
class DatetimeEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime.datetime):
            return obj.isoformat()
        elif isinstance(obj, datetime.date):
            return obj.isoformat()
        elif isinstance(obj, datetime.timedelta):
            return (datetime.datetime.min + obj).time().isoformat()
        else:
            return super(DateTimeEncoder, self).default(obj)

Base.metadata.create_all(conn)