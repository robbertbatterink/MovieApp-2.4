import json
import datetime
import sqlalchemy as sqla
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user

conn = sqla.create_engine('mysql+pymysql://root@localhost/alchemytest?host=localhost?port=3306') 
Base = declarative_base()
	
class category(Base):
	__tablename__= 'category'
	
	category_id = sqla.Column('category_id', sqla.Integer, autoincrement=True, primary_key=True)
	category_name = sqla.Column('category_name', sqla.VARCHAR(45), nullable=False, unique=True)
	
class movie(Base):
	__tablename__= 'movie'
	
	movie_id = sqla.Column('movie_id', sqla.Integer, autoincrement=True, primary_key=True)
	movie_name = sqla.Column('movie_name', sqla.VARCHAR(45), nullable=False , unique=True)
	movie_runtime = sqla.Column('movie_runtime', sqla.Integer )
	movie_description = sqla.Column('movie_description', sqla.VARCHAR(45), unique=True )
	movie_category = sqla.Column('movie_category', sqla.Integer)
	movie_thumbnail = sqla.Column('movie_thumbnail', sqla.VARCHAR(45), nullable=False, unique=True )
	movie_trailer = sqla.Column('movie_trailer', sqla.VARCHAR(45), nullable=False, unique=True )
	movie_trailer_runtime = sqla.Column('movie_trailer_runtime', sqla.Integer )
	movie_release_date = sqla.Column('movie_release_date', sqla.DATE )
	movie_added_date = sqla.Column('movie_added_date', sqla.DateTime, nullable=False )
	
	


class friends(Base):
	__tablename__= 'friends'

	user_id = sqla.Column('user_id', sqla.Integer, primary_key=True)
	friend = sqla.Column('friend_id', sqla.Integer, nullable=False)

class friend_request(Base):
	__tablename__= 'friend_request'

	request_id = sqla.Column('request_id', sqla.Integer, autoincrement=True, primary_key=True)
	sender_id = sqla.Column('sender_id', sqla.Integer, nullable=False)
	receiver_id = sqla.Column('receiver_id', sqla.Integer, nullable=False)

	
class rating(Base):
	__tablename__= 'rating'
	
	rating_id = sqla.Column('rating_id', sqla.Integer, autoincrement=True, primary_key=True)
	user_id = sqla.Column('user_id', sqla.Integer, nullable=False)
	movie_id = sqla.Column('movie_id', sqla.Integer, nullable=False)
	rating = sqla.Column('rating', sqla.Integer, nullable=False)
	comment = sqla.Column('comment', sqla.VARCHAR(45))
	rating_timestamp = sqla.Column('rating_timestamp', sqla.DateTime, nullable=False)
	
class user(Base):
	__tablename__= 'user'
	user_id = sqla.Column('user_id', sqla.Integer, autoincrement=True, primary_key=True)
	user_name = sqla.Column('user_name', sqla.VARCHAR(45), nullable=False, unique=True )
	user_email = sqla.Column('user_email', sqla.VARCHAR(45), nullable=False, unique=True)
	user_password = sqla.Column('user_password', sqla.VARCHAR(45), nullable=False )
	
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
		
class user_activety(Base):
	__tablename__= 'user_activety'
	
	activety_id = sqla.Column('activety_id', sqla.Integer, autoincrement=True, primary_key=True)
	user_id = sqla.Column('user_id', sqla.Integer, nullable=False)
	movie_id = sqla.Column('movie_id', sqla.Integer, nullable=False )
	activety = sqla.Column('activety', sqla.Enum('watched', 'rated/commented', 'recommended', 'interested'), nullable=False)
	activety_timestamp = sqla.Column('activety_timestamp', sqla.DateTime, nullable=False)

class view_status(Base):
	__tablename__= 'view_status'
	
	view_status_id = sqla.Column('view_status_id', sqla.Integer, autoincrement=True, primary_key=True)
	user_id = sqla.Column('user_id', sqla.Integer, nullable=False)
	movie_id = sqla.Column('movie_id', sqla.Integer, nullable=False)
	view_status = sqla.Column('view_status', sqla.Enum('interested', 'watched'), nullable=False)
	
class recommendation(Base):
	__tablename__= 'recommendation'
	
	recommendation_id = sqla.Column('recommendation_id', sqla.Integer, autoincrement=True, primary_key=True)
	sender_id = sqla.Column('sender_id', sqla.Integer, nullable=False)
	receiver_id = sqla.Column('receiver_id', sqla.Integer, nullable=False)
	movie_id = sqla.Column('movie_id', sqla.Integer, nullable=False)

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
