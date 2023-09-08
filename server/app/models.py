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


class Orders(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user = db.Column(db.Integer, db.ForeignKey(Users.id), nullable=False)
    name = db.Column(db.String, nullable=False)
    phone = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    address = db.Column(db.String, nullable=False)
    compound = db.Column(db.String, nullable=False)
    summ = db.Column(db.Numeric, nullable=False)
    processed = db.Column(db.Boolean, nullable=False, default=False)


class Comments(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    product = db.Column(db.Integer, db.ForeignKey(Products.id), nullable=False)
    user = db.Column(db.Integer, db.ForeignKey(Users.id), nullable=False)
    text = db.Column(db.String, nullable=False)
    date_add = db.Column(db.DateTime, nullable=False, default=db.func.now())


def create_tables():
    with app.app_context():
        db.create_all()