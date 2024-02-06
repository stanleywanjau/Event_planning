from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin

db = SQLAlchemy()


guest_event_association = db.Table('guest_event_association',
    db.Column('guest_id', db.Integer, db.ForeignKey('guest.id')),
    db.Column('event_id', db.Integer, db.ForeignKey('event.id'))
)

user_guest_association = db.Table('user_guest_association',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id')),
    db.Column('guest_id', db.Integer, db.ForeignKey('guest.id'))
)
class User(db.Model, SerializerMixin):
    __tablename__ = "user"
  
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    password = db.Column(db.String)
    email = db.Column(db.String)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)
  
    events = db.relationship("Event", backref='user')
    guests = db.relationship("Guest", secondary=user_guest_association, backref="users")

class Guest(db.Model, SerializerMixin):
    __tablename__ = "guest"
  
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    email = db.Column(db.String)
    status = db.Column(db.String)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)
  
    events = db.relationship('Event', secondary=guest_event_association, backref='guests')
    
    

class Event(db.Model, SerializerMixin):
    __tablename__ = "event"
  
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    location=db.Column(db.String)
    date = db.Column(db.Date)
    time = db.Column(db.Time)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)
    
    

