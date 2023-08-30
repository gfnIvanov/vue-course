from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from pathlib import Path
from yaml import load
from yaml.loader import Loader


root_dir = Path(__file__).resolve().parents[1]

with open(root_dir.joinpath("conf.yaml")) as file:
    logs_conf = load(file, Loader=Loader)

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = logs_conf['database']['uri']

db = SQLAlchemy(app)

CORS(app)

from app import routes, models
