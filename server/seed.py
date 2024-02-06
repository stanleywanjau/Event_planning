from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import scoped_session, sessionmaker
from models import db, User, Guest, Event
from app import app

def create_seed_data():
    db.session.query(User).delete()
    db.session.query(Guest).delete()
    db.session.query(Event).delete()
    db.session.commit()
    # Create sample data
    user1 = User(username='Stanley', password='password1', email='stanley@example.com')
    user2 = User(username='mueni', password='password2', email='mueni@example.com')

    guest1 = Guest(name='dennis', email='dennis@example.com', status='invited')
    guest2 = Guest(name='grace', email='grace@example.com', status='confirmed')

    event1 = Event(title='malomalo', date=datetime.now().date(),location="Nairobi", time=datetime.now().time(), user=user1, guest=guest1)
    event1 = Event(title='malomalo', date=datetime.now().date(), location="Nairobi",time=datetime.now().time(), user=user1, guest=guest2)
    event2 = Event(title='soulfes', date=datetime.now().date(),location="Kisimu" ,time=datetime.now().time(), user=user2, guest=guest2)

    db.session.add_all([user1, user2, guest1, guest2,event1,event2])
    db.session.commit()

if __name__ == "__main__":
    with app.app_context():
        create_seed_data()
