import sqlalchemy
from app import db
from app import models


def db_add_user(user_data):
    db.session.add(models.Users(username=user_data['login'], 
                                password=user_data['password'],
                                admin=user_data['admin']))
    db.session.commit()


def db_get_user(user_name):
    try:
        return db.session.execute(db.select(models.Users).filter_by(username=user_name)).scalar_one()
    except sqlalchemy.exc.NoResultFound:
        return None


def db_get_users():
    return db.session.execute(db.select(models.Users)).scalars()


def db_get_products():
    return db.session.execute(db.select(models.Products)).scalars()


def db_add_product(product_data):
    db.session.add(models.Products(title=product_data['title'], 
                                   price=product_data['price'],
                                   category=product_data['category'],
                                   description=product_data['description'],
                                   image=product_data['image']))
    db.session.commit()
