import sqlalchemy
from app import db
from app import models


def db_add_user(user_data):
    db.session.add(models.Users(username=user_data['login'],
                                password=user_data['password'],
                                admin=user_data['admin']))
    db.session.commit()


def db_get_user(value, field_name):
    try:
        if field_name == 'id':
            return db.session.execute(db.select(models.Users).filter_by(id=value)).scalar_one()
        elif field_name == 'username':
            return db.session.execute(db.select(models.Users).filter_by(username=value)).scalar_one()
    except sqlalchemy.exc.NoResultFound:
        return None


def db_get_users():
    return db.session.execute(db.select(models.Users)).scalars()


def db_get_products(id = None):
    if id:
        return db.session.execute(db.select(models.Products).filter_by(id=id)).scalar_one()
    return db.session.execute(db.select(models.Products)).scalars()


def db_add_product(product_data):
    db.session.add(models.Products(title=product_data['title'],
                                   price=product_data['price'],
                                   category=product_data['category'],
                                   description=product_data['description'],
                                   image=product_data['image']))
    db.session.commit()


def db_add_order(order_data):
    db.session.add(models.Orders(user = order_data['user'],
                                 name = order_data['name'],
                                 phone = order_data['phone'],
                                 email = order_data['email'],
                                 address = order_data['address'],
                                 compound = order_data['compound'],
                                 summ = order_data['summ']))
    db.session.commit()


def db_add_comment(comment_data):
    db.session.add(models.Comments(product = comment_data['product'],
                                   user = comment_data['user'],
                                   text = comment_data['text']))
    db.session.commit()


def db_get_comments(product_id):
    return db.session.execute(db.select(models.Comments).filter_by(product=product_id)).scalars()
