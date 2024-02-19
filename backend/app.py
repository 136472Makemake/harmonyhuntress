from flask import Flask, send_from_directory
from flask_cors import CORS
import requests
import json
import random
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app, expose_headers=['Content-Disposition'])

CLIENT_ID = os.getenv('CLIENT_ID')
CLIENT_SECRET = os.getenv('CLIENT_SECRET')
LASTFM_KEY = os.getenv('LASTFM_KEY')

SONGS_DIRECTORY = os.path.join(app.root_path, 'songs')

@app.route('/random_song', methods=['GET'])
def random_song():
    try:
        songs = [song for song in os.listdir(SONGS_DIRECTORY) if song.endswith('.mp3')]
        if not songs:
            return "No songs found in the directory", 404
        
        selected_song = random.choice(songs)
        selected_song = "Katy Perry - Teenage Dream.mp3"
        
        return send_from_directory(SONGS_DIRECTORY, selected_song, as_attachment=True)
    except Exception as e:
        return str(e), 500

if __name__ == '__main__':
    app.run(debug=True)
