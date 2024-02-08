from datetime import datetime
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.ext.hybrid import hybrid_property
from Config import  bcrypt,db






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
    
    
    @hybrid_property
    def password_hash(self):
        return self._password_hash


    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

    

class Guest(db.Model, SerializerMixin):
    __tablename__ = "guest"
  
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    email = db.Column(db.String)
    status = db.Column(db.String)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)
  
    events = db.relationship("Event", secondary=guest_event_association, backref="guests")
    
    

class Event(db.Model, SerializerMixin):
    __tablename__ = "event"
  
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    location=db.Column(db.String)
    date = db.Column(db.String)
    time = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)
    
    

