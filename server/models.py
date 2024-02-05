from datetime import datetime
from sqlalchemy import MetaData
from sqlalchemy_serializer import SerializerMixin
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)

class User(db.Model,SerializerMixin):
  __tablename__="Users"
  
  id= db.Column(db.Integer,primary_key=True)
  Username=db.Column(db.Integer)
  password=db.Column(db.Integer)
  Email=db.Column(db.Integer)
  
  
class Guest(db.Model,SerializerMixin):
  __tablename__="guests"
  
  id = db.Column(db.Integer,primary_key=True)
  Name=db.Column(db.Integer)
  Email=db.Column(db.Integer)
  Status=db.Column(db.Integer)

class Event(db.Model,SerializerMixin):
  __tablename__="Events"
  
  id=db.Column(db.Integer,primary_key=True)
  Title=db.Column(db.Integer)
  Date=db.Column(db.Date)
  Time=db.Column(db.Time)
  guest_id=db.Column(db.Integer)
  user_id=db.Column(db.Integer)
  