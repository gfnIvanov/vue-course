import sqlalchemy
from app import db
from app import models


def add_user(user_data):
    try:
        db.session.add(models.Users(username=user_data['login'], 
                                    password=user_data['password'],
                                    admin=user_data['admin']))
        db.session.commit()
    except sqlalchemy.exc.IntegrityError:
        return None


def get_user(user_name):
    try:
        return db.session.execute(db.select(models.Users).filter_by(username=user_name)).scalar_one()
    except sqlalchemy.exc.NoResultFound as e:
        return None