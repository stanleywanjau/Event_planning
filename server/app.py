from flask import Flask, jsonify, request, make_response
from flask_migrate import Migrate
from flask_restful import Api, Resource

from models import db,User,Event

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI']='sqlite:///Eventplanner.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False

migrate=Migrate(app,db)
db.init_app(app)
api = Api(app)

class Events(Resource):
    def get(self):
        event=[{'id':event.id,"title":event.title,"location":event.location} for event in Event.query.all()]
        
        return make_response(jsonify(event),200)
        
api.add_resource(Events,'/events')




if __name__ == "__main__":
    app.run(port=5555,debug=True)