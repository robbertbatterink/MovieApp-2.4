from flask import Flask
from flask import render_template, request, jsonify
from flask_cors import CORS

import Database
from Database import user
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user

import json
import os

from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import IntegrityError

app = Flask(__name__)
app.config['SECRET_KEY'] = 'thisissecret'
#CORS(app)
CORS(app, resources={r"/*": {"origins": "*"}})

Session = sessionmaker(bind=Database.conn)
session = Session()

login_manager = LoginManager()
login_manager.init_app(app)

@login_manager.user_loader
def load_user(user_id):
    return session.query(user).filter(user.user_name=='Wisse').first()


@app.route('/')
def index():
	return jsonify(username='wisse',
                   email='w_voortman@hotmail',
                   id=7)
	
# accountmanagement

@app.route('/api/registreren', methods=['POST']) #, methods=['POST']
def registreren():
	if request.method == 'POST':
		content = request.get_json()
		#print(content['naam'])
		postNaam = content['naam']
		postEmail = content['email']
		postPassword = content['wachtwoord']
		if postNaam and postEmail and postPassword:
			return registreer_gebruiker(postNaam, postEmail, postPassword)
		
		return "Alle verplichte velden invullen svp..."
		
def registreer_gebruiker(postNaam, postEmail, postPassword):
    gebruiker = user(user_name=postNaam, user_email=postEmail, user_password=postPassword)
    
    try:
        session.add(gebruiker)
        session.commit()
    except IntegrityError:
        print ("Dubbele entry not allowed")
        # dit moet nog netjes worden afgehandeld
        session.rollback()
    return 'stuff went OK'
	
@app.route('/api/login', methods=['GET', 'POST'])
def login():
	#if request.methods == 'POST':
		uservar = session.query(user).filter(user.user_id==7).first()
		print('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
		print(uservar)
		print('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
		login_user(uservar)
		return 'You are now logged in!'
	#else:
	#	return show_login()

@app.route('/api/logout')
@login_required
def logout():
    logout_user()
    return 'You are now logged out!'		

@app.route('/api/gebruiker')
@login_required
def ingelogdegebruiker():
	return current_user.user_name
	
@app.route('/api/gebruiker/<int:gebruiker_id>', methods=['GET', 'PUT', 'DELETE'])
def gebruiker():
    if request.method == 'get':
	    return userinfo()
    elif request.method == 'put':
	    return update_gebruiker()
    elif request.method == 'delete':
	    return delete_gebruiker()
    else:
        return error()
		


#film aanbevelingen

@app.route('/api/aanbevelingen', methods=['GET'])
def aanbevelingen():
    return aanbevelingen()
	
def aanbevelingen():
    return 'dikke penis'
	
@app.route('/api/aanbevelingen/<int:gebruiker_id>', methods=['GET'])
def persoonlijkeAanbeveling(gebruiker_id):
    return persoonlijke_aanbevelingen(gebruiker_id)

def persoonlijke_aanbevelingen(gebruiker_id):
    if gebruiker_id == 1:
        user = 1
        return user
    else:
        return 'no match'
# Film Details

@app.route('/api/filminfo/<int:film>', methods=['GET'])
def filmInfo():
    return film_info()
	
@app.route('/api/filminfo/<int:film_id>/<int:gebruiker_id>', methods=['GET'])
def persoonlijkeFilmInfo():
    return persoonlijk_film_info()

#status / beoordeling / opmerking

@app.route('/api/status/<int:film_id>/<int:gebruiker_id>', methods=['POST', 'GET', 'PUT', 'DELETE'])
def status():
    if request.method == 'POST':
	    return registreer_status()
    elif request.method == 'GET':
        return status()
    elif request.method == 'PUT':
        return update_status()
    elif request.method == 'DELETE':
        return delete_status()
    else:
        return error()
		
@app.route('/api/rate/<int:film_id>/<int:gebruiker_id>', methods=['POST', 'GET', 'PUT'])
def rate():
    if request.method == 'POST':
        return registreer_status()
    elif request.method == 'GET':
        return status()
    elif request.method == 'PUT':
        return update_status()
    else:
        return error()

# vrienden interactie

# filmavond planning	
	
@app.route("/data")
@login_required
def data():
	return "hallo data"

if __name__ == "__main__":
    app.run(debug=True)