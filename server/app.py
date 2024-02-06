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


class EventsById(Resource):
    def get(self,id):
        event=Event.query.filter_by(id=id).first()
        
        if not event:
            return make_response(jsonify({"message":"Event not found"}),404)
        event_data={
            "id":event.id,
            "title":event.title,
            "location":event.location,
            "date": str(event.date),  
            "time": str(event.time), 
            "users":event.user.username,
            "guests":[]
        }
        print(event.guests)
        
        for guest in event.guests:
            guest_data={
                "id":guest.id,
                "username":guest.name
            }
            event_data["guests"].append(guest_data)
        
        return make_response(jsonify(event_data),200)
        
api.add_resource(Events,'/events')
api.add_resource(EventsById,'/event/<int:id>')




if __name__ == "__main__":
    app.run(port=5555,debug=True)