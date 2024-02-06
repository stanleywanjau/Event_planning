from flask import Flask, jsonify, request, make_response
from flask_migrate import Migrate
from flask_restful import Api, Resource
from datetime import datetime

from models import db,User,Event,Guest

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
    def post(self):
        data=request.json
        title = data['title']
        location=data['location']
        date = data['date']
        time =data['time']  
        user_id=data['user_id'] 
        
        
        # Validate required fields
        if not (title and location and date and time and user_id):
            return {"message": "Missing required fields"}, 400

        # Parse date and time strings into datetime objects
        try:
            date = datetime.strptime(date, '%Y-%m-%d').date()
            time = datetime.strptime(time, '%H:%M:%S').time()
        except ValueError:
            return {"message": "Invalid date or time format"}, 400

        # Check if the user exists
        user = User.query.get(user_id)
        if not user:
            return {"message": "User not found"}, 404

        # Create the event object
        event = Event(title=title, location=location, date=date, time=time, user=user)

        # Add the event to the database session and commit
        db.session.add(event)
        db.session.commit()

        return {"message": "Event created successfully", "event_id": event.id}, 201


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
    def delete(self,id):
        event=Event.query.filter_by(id=id).first()
        if not event:
            return {"message": "Event not found"}, 404

        
            # Delete all guests associated with the event
        for guest in event.guests:
            db.session.delete(guest)

            # Delete the event
            db.session.delete(event)

            # Commit the changes to the database
            db.session.commit()

            return {"message": "Event and associated guests deleted successfully"}, 200
    def patch(self,id):
            event=Event.query.filter_by(id=id).first()
            if not event:
                return {"message": "Event not found"}, 404

        
            
            data = request.json

            # Check which fields to update
            if 'location' in data:
                event.location = data['location']
            if 'time' in data:
                event.time = datetime.strptime(data['time'], '%H:%M:%S').time()
            if 'date' in data:
                event.date = datetime.strptime(data['date'], '%Y-%m-%d').date()

            # Commit the changes to the database
            db.session.commit()

            return {"message": "Event updated successfully"}, 200




class Guests(Resource):
    def get(self):
        guests =[ {"id":guest.id,"name":guest.name,"email":guest.email,"status":guest.status}for guest in Guest.query.all()]
        return make_response(jsonify(guests),200)
    def post(self):
        data = request.json
        name = data.get('name')
        email = data.get('email')
        status = data.get('status', 'invited')  # Default status to 'invited' if not provided

        if not (name and email):
            return {"message": "Name and email are required fields"}, 400

        guest = Guest(name=name, email=email, status=status)

        db.session.add(guest)
        db.session.commit()

        return {"message": "Guest created successfully", "guest_id": guest.id}, 201
        
            
            
            
api.add_resource(Events,'/events')
api.add_resource(EventsById,'/event/<int:id>')
api.add_resource(Guests,"/guests")




if __name__ == "__main__":
    app.run(port=5555,debug=True)