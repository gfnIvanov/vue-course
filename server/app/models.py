from app import app
from app import db


class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)
    admin = db.Column(db.Boolean)


class Products(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    price = db.Column(db.Numeric, nullable=False)
    category = db.Column(db.String, nullable=False)
    description = db.Column(db.String)
    image = db.Column(db.String)


def create_tables():
    with app.app_context():
        db.create_all()