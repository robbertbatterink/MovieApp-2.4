from flask import Flask
from flask import render_template, request, jsonify
from flask_cors import CORS
import Database
from Database import *
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user

import json
import os

from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import IntegrityError
from sqlalchemy import update
import datetime

app = Flask(__name__)
app.config['SECRET_KEY'] = 'thisissecret'

CORS(app, supports_credentials=True, resources={r"/*": {"origins": "http://localhost:3000"}})
#CORS(app, supports_credentials=True)

Session = sessionmaker(bind=Database.conn)
session = Session()

login_manager = LoginManager()
login_manager.init_app(app)

@login_manager.user_loader
def load_user(user_id):
    print('fucking shit man')
    return session.query(user).filter(user.user_id==user_id).first()

	
# accountmanagement Create, read, update, delete, 

@app.route('/api/registreren', methods=['POST']) #, methods=['POST']
def registreren():
	if request.method == 'POST':
		content = request.get_json()
		print(content['naam'])
		postNaam = content['naam']
		postEmail = content['email']
		postPassword = content['wachtwoord']
		if postNaam and postEmail and postPassword:
			return registreer_gebruiker(postNaam, postEmail, postPassword)
		
		return "Alle verplichte velden invullen svp..."
		
		
def registreer_gebruiker(postNaam, postEmail, postPassword):
    gebruiker = user(user_name= postNaam, user_email= postEmail, user_password= postPassword)
    
    try:
        session.add(gebruiker)
        session.commit()
    except IntegrityError:
        session.rollback()
        return jsonify(error='True',
            title='regstration failed',
            message='This email adress is already in use.')
			
    uservar = session.query(user).filter(user.user_email==postEmail).filter(user.user_password==postPassword).first()
    login_user(uservar)
    return 'registratie succesful'
	#return jsonify(error='False',
    #       title='Login succesful',
    #        message='You are now logged in',
    #        username= current_user.user_name,
    #        userid= current_user.user_id)


			
#request.url
#request.query_string
#request.args.get('user')		send the request like this: http://localhost:5000/api/gebruiker?user_id=1	
@app.route('/api/gebruiker')
def gebruiker():
	if(request.args.get('user_id')): # if a user_id is provided by the get request we return user details, if no matching user is found for user id we return error
		try:
			uservar = session.query(user).filter(user.user_id==request.args.get('user_id')).first()
			return jsonify(username = uservar.user_name,
							userbio = uservar.user_bio )
		except:
			return jsonify(error='true',
			title='query failed',
			message='no user for user_id' + request.args.get('user_id'))
	else:	# if no user_id is provided we check if user is logged in and return his own details
		if(current_user.is_authenticated):
			return jsonify(username = current_user.user_name,
							userid = current_user.user_id,
							useremail = current_user.user_email,
							userbio = current_user.user_bio)
		else: # if user is not logged in we return an error
			return jsonify(error='true',
			title='query failed',
			message='You need to be logged in')
	
@app.route('/api/updategebruiker', methods=['PUT'])
def updategebruiker():
	if(current_user.is_authenticated):# check if user is logged in, else we return an error
		content = request.get_json()
		if(content['naam']): # check if user wants to edit this value
			setattr(current_user, 'user_name', content['naam']) # change the value for the session
		if(content['bio']):
			setattr(current_user, 'user_bio', content['bio'])
		if(content['wachtwoord']):
			setattr(current_user, 'user_password', content['wachtwoord'])
		session.commit() # commit changes to database
		return jsonify(error='false',
			title='update succesful',
			message='your account information has been updated')
	else: # if user is not logged in we return an error
		return jsonify(error='true',
		title='query failed',
		message='You need to be logged in')
	
@app.route('/api/deletegebruiker', methods=['DELETE'])
def deletegebruiker():
	try:
		session.delete(current_user)
		session.commit()
		return jsonify(error='false',
			title='delete succesful',
			message='account is now deleted')
	except:
		return jsonify(error='true',
			title='delete failed',
			message='please try agine')
			
# accountmanagement Login, Logout
	
@app.route('/api/login', methods=['GET', 'POST'])
def login():
	if request.method == 'POST':
            content = request.get_json()
            postEmail = content['email']
            postPassword = content['wachtwoord']
            uservar = session.query(user).filter(user.user_email==postEmail).filter(user.user_password==postPassword).first()
            if uservar == None:
                return jsonify(error='True',
                title='Login failed',
                message='Invalid Email or Password.')
            else:		
                print('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
                print(uservar)
                print('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
                login_user(uservar, remember=True)
                print(current_user.user_name)
                

                return jsonify(error='False',
                title='Login succesful',
                message='You are now logged in',
                username= current_user.user_name,
                userid= current_user.user_id)
			
@app.route('/api/logout')
@login_required
def logout():
    logout_user()
    return jsonify(error='False',
			title='Logout succesful',
			message='You are now logged out')

# Film Details 

@app.route('/api/filminfo', methods=['GET'])
def filmInfo():
	if(request.args.get('movie_id')): 
		if(current_user.is_authenticated):
			return film_info(current_user.user_id, request.args.get('movie_id'))
		else:
			return film_info_niet_persoonlijk(request.args.get('movie_id'))
	else: 
		return jsonify(error='true',
			title='no movie_id provided',
			message='please provide a movie id')
	
def film_info_niet_persoonlijk(movie_id):
	#film informatie zonder persoonlijke eigenschappen
	try:
		m = session.query(movie).filter(movie.movie_id==movie_id).first()
		return jsonify(movie_id = m.movie_id, 
						movie_name = m.movie_name, 
						movie_runtime = m.movie_runtime, 
						movie_description = m.movie_description, 
						movie_category = m.movie_category, 
						movie_thumbnail = m.movie_thumbnail, 
						movie_trailer = m.movie_trailer, 
						movie_trailer_runtime = m.movie_trailer_runtime, 
						movie_release_date = m.movie_release_date, 
						movie_added_date = m.movie_added_date)
	except:
		return jsonify(error='true',
				title='query failed',
				message='no movie found with this id')
		
def film_info(gebruiker_id, movie_id):
	#film informatie met persoonlijke eigenschappen
	try:
		# de informatie van de film
		query = "SELECT * FROM movie WHERE movie_id = {};".format(movie_id)
		moviedetails = session.execute(query).fetchall() 
		all_movies = [{'movie_id':m.movie_id, 'movie_name':m.movie_name, 'movie_runtime':m.movie_runtime, 'movie_description':m.movie_description, 'movie_category':m.movie_category, 'movie_thumbnail':m.movie_thumbnail, 'movie_trailer':m.movie_trailer, 'movie_trailer_runtime':m.movie_trailer_runtime,'movie_release_date':m.movie_release_date, 'movie_added_date':m.movie_added_date} for m in moviedetails]
	
		# informatie van vrienden die geintreseerd zijn in deze film
		query = "SELECT user.user_id, user.user_name, view_status.movie_id, view_status.status FROM user LEFT JOIN view_status ON (user.user_id = view_status.user_id) WHERE view_status.user_id IN (SELECT friend_two_id FROM friends WHERE friend_one_id={}) AND view_status.movie_id = {} AND view_status.status LIKE 'interested'".format(gebruiker_id, movie_id)
		fi = session.execute(query).fetchall()
		all_fi = [{'user_id':iu.user_id, 'user_name':iu.user_name, 'movie_id':iu.movie_id, 'status':iu.status} for iu in fi]
		
		# informatie van vrienden die deze film gezien hebben
		query = "SELECT user.user_id, user.user_name, view_status.movie_id, view_status.status FROM user LEFT JOIN view_status ON (user.user_id = view_status.user_id) WHERE view_status.user_id IN (SELECT friend_two_id FROM friends WHERE friend_one_id={}) AND view_status.movie_id = {} AND view_status.status LIKE 'watched'".format(gebruiker_id, movie_id)
		fw = session.execute(query).fetchall()
		all_fw = [{'user_id':wu.user_id, 'user_name':wu.user_name, 'movie_id':wu.movie_id, 'status':wu.status} for wu in fw]
	
		m = session.query(movie).filter(movie.movie_id==movie_id).first()
		return jsonify(all_movies, all_fi, all_fw)

	except:
		return jsonify(error='true',
				title='query failed',
				message='no movie found with this id')
			
#film aanbevelingen		

@app.route('/api/aanbevelingen', methods=['GET'])
def aanbevelingen():
	if(current_user.is_authenticated):
		#film aanbevelingen gebaseerd op ratings van vrienden
		query = "SELECT movie.*, COUNT(CASE WHEN `rating` LIKE '%1%' THEN 1 END) AS sum_ratings, COUNT(rating.rating) AS total_ratings FROM movie LEFT JOIN rating ON (movie.movie_id = rating.movie_id) WHERE rating.user_id IN (SELECT friend_two_id FROM friends WHERE friend_one_id={}) GROUP BY movie.movie_id ORDER BY sum_ratings DESC LIMIT 10".format(current_user.user_id)
		r = session.execute(query).fetchall()
		all_r = [{'movie_id':q.movie_id, 'movie_name':q.movie_name, 'movie_runtime':q.movie_runtime, 'movie_description':q.movie_description, 'movie_category':q.movie_category, 'movie_thumbnail':q.movie_thumbnail, 'movie_trailer':q.movie_trailer, 'movie_trailer_runtime':q.movie_trailer_runtime,'movie_release_date':q.movie_release_date, 'movie_added_date':q.movie_added_date, 'sum_ratings':q.sum_ratings , 'count_ratings':q.total_ratings} for q in r]
		return jsonify(all_r)
	
	else:
		# film aanbevelingen gebaseerd op alle ratings
		r = session.execute("SELECT movie.*, COUNT(CASE WHEN `rating` LIKE '%1%' THEN 1 END) AS sum_ratings, COUNT(rating.rating) AS total_ratings FROM movie LEFT JOIN rating ON (movie.movie_id = rating.movie_id) GROUP BY movie.movie_id ORDER BY sum_ratings DESC LIMIT 10").fetchall()
		all_r = [{'movie_id':q.movie_id, 'movie_name':q.movie_name, 'movie_runtime':q.movie_runtime, 'movie_description':q.movie_description, 'movie_category':q.movie_category, 'movie_thumbnail':q.movie_thumbnail, 'movie_trailer':q.movie_trailer, 'movie_trailer_runtime':q.movie_trailer_runtime,'movie_release_date':q.movie_release_date, 'movie_added_date':q.movie_added_date, 'sum_ratings':q.sum_ratings , 'count_ratings':q.total_ratings} for q in r]
		return jsonify(all_r)
		
		# https://stackoverflow.com/questions/45523027/flask-json-how-do-i-return-mutiple-rows-as-json-objects
		#st = user.query.all()
		#all_users = [{'name':user.name,'id':user.id} for user in st]
		#return jsonify(all_users)


# view_status
		
@app.route('/api/registreerstatus', methods=['POST'])
def registreerstatus(): # create
	content = request.get_json()
	statusvar = view_status(user_id = current_user.user_id, movie_id = content['movie_id'], status = content['status'] )
	useractivety = user_activety(user_id = current_user.user_id, movie_id = content['movie_id'], activety = content['status'])
	try:
		session.add(statusvar)
		session.add(useractivety)
		session.commit()
		return jsonify(error='false',
			title='status registration succesful',
			message='status registered')
	except IntegrityError:
		session.rollback()
		return jsonify(error='True',
			title='status registration failed',
			message='you already have a status for this movie. try updating that instead')

@app.route('/api/status')
def status(): # 
	# eigen filmstatus van specifieke movie
	if(current_user.is_authenticated):
		try:
			content = request.get_json()
			statusvar = session.query(view_status).filter(view_status.user_id==current_user.user_id).filter(view_status.movie_id==1).first()
			return jsonify(movie_id = statusvar.movie_id,
						status = statusvar.status,
						timestamp = statusvar.status_timestamp)
		except:
			return jsonify(error='true',
				title='no movie_id provided',
				message='please provide a movie_id')
	else:
		return jsonify(error='true',
				title='you need to be logged in',
				message='please log in')
	
#send the request like this: http://localhost:5000/api/status/bekeken?user_id=1	
@app.route('/api/status/bekeken')
def statusbekeken(): # 
	if(request.args.get('user_id')): # if a user_id is provided by the get request we return details, if no matching user is found for user id we return error
		statusvar = session.query(view_status).filter(view_status.user_id==request.args.get('user_id')).filter(view_status.status=='watched')
		all_s = [{'user_id':s.user_id, 'movie_id':s.movie_id, 'status':s.status, 'status_timestamp':s.status_timestamp} for s in statusvar]
		return jsonify(all_s)
	else:
		if(current_user.is_authenticated):
			# persoonlijke lijst van films die ik bekeken heb
			statusvar = session.query(view_status).filter(view_status.user_id==current_user.user_id).filter(view_status.status=='watched')
			all_s = [{'user_id':s.user_id, 'movie_id':s.movie_id, 'status':s.status, 'status_timestamp':s.status_timestamp} for s in statusvar]
			return jsonify(all_s)
		else:
			return jsonify(error='true',
							title='you need to be logged in or provide a user_id',
							message='please log in or provide a user_id ')

#send the request like this: http://localhost:5000/api/status/mijnlijst?user_id=1							
@app.route('/api/status/mijnlijst')
def statusgeintreseerd(): # 
	if(request.args.get('user_id')): # if a user_id is provided by the get request we return details, if no matching user is found for user id we return error
		statusvar = session.query(view_status).filter(view_status.user_id==request.args.get('user_id')).filter(view_status.status=='interested')
		all_s = [{'user_id':s.user_id, 'movie_id':s.movie_id, 'status':s.status, 'status_timestamp':s.status_timestamp} for s in statusvar]
		return jsonify(all_s)
	else:
		if(current_user.is_authenticated):
			# persoonlijke lijst van films die ik wil bekijken
			statusvar = session.query(view_status).filter(view_status.user_id==current_user.user_id).filter(view_status.status=='interested')
			all_s = [{'user_id':s.user_id, 'movie_id':s.movie_id, 'status':s.status, 'status_timestamp':s.status_timestamp} for s in statusvar]
			return jsonify(all_s)
		else:
			return jsonify(error='true',
							title='you need to be logged in or provide a user_id',
							message='please log in or provide a user_id ')

@app.route('/api/updatestatus', methods=['PUT'])
def updatestatus(): #update 
	content = request.get_json()
	try:
		v = session.query(view_status).filter(view_status.user_id=="1").filter(view_status.movie_id==content['movie_id']).first() 
		v.status=content['movie_id']
		session.commit();
	except:
		return jsonify(error='true',
		title='query failed',
		message='You need to be logged in')	
	return jsonify(error='false',
	title='update succesful',
	message='your status information has been updated')
		

@app.route('/api/deletestatus', methods=['DELETE'])
def deletestatus(): #delete
	content = request.get_json
	statusvar = session.query(view_status).filter(view_status.user_id==current_user.user_id).filrer(view_status.movie_id==request.args.get('movieid')).first()
	try:
	
		session.delete(statusvar)
		session.commit()
		return jsonify(error='false',
			title='delete succesful',
			message='account is now deleted')
	except:
		return jsonify(error='true',
			title='delete failed',
			message='please try agine')

# rating	@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
#user id, film_id

@app.route('/api/registreerrating', methods=['POST'])
def registreerrating():
	content = request.get_json()
	if(rating):
		ratingvar = rating(user_id = current_user.user_id, movie_id = content['movie_id'], rating = content['rating'])
		useractivety = user_activety(user_id = current_user.user_id, movie_id = content['movie_id'], activety = 'rated')
		try:
			session.add(ratingvar)
			session.add(useractivety)
			session.commit()
			return jsonify(error='false',
					title='rating registration succesful',
					message='rating registered')
		except IntegrityError:
			session.rollback()
			return jsonify(error='True',
				title='rating registration failed',
				message='you already have a rating for this movie. try updating that instead')
	else:
		return jsonify (error= 'true',
						title='no rating provided',
						message='please provided a rating')
	
@app.route('/api/updaterating', methods=['PUT'])
def rate():
	pass
	
# comment	@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
#user id, film_id

@app.route('/api/registreercomment', methods=['POST'])
def registreercomment(): # create
	content = request.get_json()
	if(comment):
		opmerkingvar = opmerking(user_id = current_user.user_id, movie_id = content['movie_id'], opmerking = content['barry'])
		useractivety = user_activety(user_id = current_user.user_id, movie_id = content['movie_id'], activety = 'comment')
		try:
			session.add(opmerkingvar)
			session.add(useractivety)
			session.commit()
			return jsonify(error='false',
					title='comment registration succesful',
					message='comment registered')
		except IntegrityError:
			session.rollback()
			return jsonify(error='true',
				title='comment registration failed',
				message='you already have a comment for this movie. try updating that instead')
	else:
		return jsonify (error= 'true',
						title='no comment provided',
						message='please provided a comment')

	
@app.route('/api/comment')
def comment(): #read
	pass
	
@app.route('/api/updatecomment', methods=['PUT'])
def updatecomment(): #update 
	pass
	
@app.route('/api/deltecomment', methods=['DELETE'])
def deletecomment(): #delete
	pass

# search functionality

#send the request like this: http://localhost:5000/api/searchuser?query=<username>
@app.route('/api/searchuser')
def searchuser():
	if(current_user.is_authenticated):
		if(request.args.get('query')):
			request.args.get('query')
			query = str('%') + str(request.args.get('query')) + str('%')
			users = session.query(user).filter(user.user_name.like(query))
			all_u = [{'user_id':u.user_id, 'user_name':u.user_name, 'user_bio':u.user_bio} for u in users]
			return jsonify(all_u)
		else: 
			return jsonify(error='true',
							title='no query parameter provided',
							message='you need to provide a query parameter')
			
	else:
		return jsonify(error='true',
			title='query failed',
			message='You need to be logged in')
	
	
@app.route('/api/searchmovie')
def searchmovie():
	if(current_user.is_authenticated):
		if(request.args.get('query')):
			request.args.get('query')
			query = str('%') + str(request.args.get('query')) + str('%')
			movies = session.query(movie).filter(movie.movie_name.like(query))
			all_m = [{'movie_id':m.movie_id, 'movie_name':m.movie_name, 'movie_runtime':m.movie_runtime, 'movie_description':m.movie_description, 'movie_category':m.movie_category, 'movie_thumbnail':m.movie_thumbnail, 'movie_trailer':m.movie_trailer, 'movie_trailer_runtime':m.movie_trailer_runtime, 'movie_release_date':m.movie_release_date, 'movie_added_date':m.movie_added_date,} for m in movies]
			return jsonify(all_m)
		else: 
			return jsonify(error='true',
							title='no query parameter provided',
							message='you need to provide a query parameter')
			
	else:
		return jsonify(error='true',
			title='query failed',
			message='You need to be logged in')
	
@app.route('/api/searchuserandmovie')
def searchuserandmovie(): 
#	if(current_user.is_authenticated):
		if(request.args.get('query')):
			request.args.get('query')
			query = str('%') + str(request.args.get('query')) + str('%')
			movies = session.query(movie).filter(movie.movie_name.like(query))
			all_m = [{'movie_id':m.movie_id, 'movie_name':m.movie_name, 'movie_runtime':m.movie_runtime, 'movie_description':m.movie_description, 'movie_category':m.movie_category, 'movie_thumbnail':m.movie_thumbnail, 'movie_trailer':m.movie_trailer, 'movie_trailer_runtime':m.movie_trailer_runtime, 'movie_release_date':m.movie_release_date, 'movie_added_date':m.movie_added_date,} for m in movies]
			users = session.query(user).filter(user.user_name.like(query))
			all_u = [{'user_id':u.user_id, 'user_name':u.user_name, 'user_bio':u.user_bio} for u in users]
			return jsonify(all_m, all_u)
		else: 
			return jsonify(error='true',
							title='no query parameter provided',
							message='you need to provide a query parameter')
#	else:
#		return jsonify(error='true',
#			title='query failed',
#			message='You need to be logged in')
#	
# vrienden interactie
'''
add vriends

remove friends

list of vriends

list of specific friend activety

list of all friend activety

'''

#random stuff below

@app.route('/api/filldbwithmovies')
def filldbwithmovies():
	import requests
	
	base_url = "https://www.vuecinemas.nl/movies.json?movie_id="
	movieids = [17911, 18421, 18441, 18741, 20001, 20711, 20761, 21001, 20461, 19721, 19311, 19341, 18881, 19211]
	#movieids = [18441]
	for id in movieids:
		fullurl = base_url + str(id)
		#print(fullurl)
		responce = requests.get(fullurl)    # request the URL and parse the JSON
		responce.raise_for_status()
		r = responce.json()
		
		print(r['title'])
		print(r['playingtime'])
		print(r['description'])
		print(r['genres'])
		print(r['image'])
		print(r['trailer_youtube_id'])
		print(r['release_date'])
		vuemovie = movie(movie_name = r['title'], movie_runtime = r['playingtime'], movie_description = 'description', movie_category = r['genres'], movie_thumbnail = r['image'], movie_trailer = 'https://www.youtube.com/watch?v=' + r['trailer_youtube_id'], movie_release_date = r['release_date'])
		session.add(vuemovie)
		session.commit()
		session.flush()
		print('shit happend')
						
	return jsonify(didstuff="true")
    	
@app.route('/api/getmovieid', methods=['GET'])
def getID():
	m = session.query(movie).all()
	all_movies = [{'movie_id':movie.movie_id} for movie in m]
	return jsonify(all_movies)

if __name__ == "__main__":
    app.run(debug=False)