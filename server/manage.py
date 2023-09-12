import os
from app import app
from dotenv import load_dotenv


load_dotenv()

mode = os.getenv('MODE')

def run_server():
    isDev = mode == 'dev'
    app.run(debug=isDev, host='0.0.0.0')
