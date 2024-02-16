from flask import Flask, jsonify, send_file
import requests
import json
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)

CLIENT_ID = os.getenv('CLIENT_ID')
CLIENT_SECRET = os.getenv('CLIENT_SECRET')
LASTFM_KEY = os.getenv('LASTFM_KEY')

if __name__ == '__main__':
    app.run(debug=True)
