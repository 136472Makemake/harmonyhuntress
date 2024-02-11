from flask import Flask, jsonify
import requests
import random
import base64
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)

CLIENT_ID = os.getenv('CLIENT_ID')
CLIENT_SECRET = os.getenv('CLIENT_SECRET')

def get_spotify_token():
    url = "https://accounts.spotify.com/api/token"
    payload = {'grant_type': 'client_credentials'}
    headers = {'Authorization': f'Basic {base64.b64encode(f"{CLIENT_ID}:{CLIENT_SECRET}".encode()).decode()}'}
    
    response = requests.post(url, data=payload, headers=headers)
    token = response.json().get('access_token')
    return token

@app.route('/random_song', methods=['GET'])
def random_song():
    token = get_spotify_token()
    headers = {'Authorization': f'Bearer {token}'}
    
    # Search for a variety of playlists
    search_url = "https://api.spotify.com/v1/search"
    query = "genre:pop"  # Adjust this query to suit your needs
    search_params = {'q': query, 'type': 'playlist', 'limit': 20}  # Increase limit for more variety
    search_resp = requests.get(search_url, headers=headers, params=search_params)
    
    playlists = search_resp.json().get('playlists', {}).get('items', [])
    
    if not playlists:
        return jsonify({'error': 'No playlists found'}), 404
    
    # Randomly select a playlist
    playlist = random.choice(playlists)
    playlist_id = playlist['id']
    playlist_name = playlist['name']
    
    # Fetch tracks from the randomly selected playlist
    tracks_url = f"https://api.spotify.com/v1/playlists/{playlist_id}/tracks"
    tracks_resp = requests.get(tracks_url, headers=headers)
    tracks = tracks_resp.json().get('items', [])
    
    if not tracks:
        return jsonify({'error': 'No tracks found in playlist'}), 404
    
    # Compile all songs from the playlist with popularity scores
    playlist_songs = [{
        'song_title': track['track']['name'],
        'artists': ', '.join(artist['name'] for artist in track['track']['artists']),
        'popularity': track['track']['popularity']
    } for track in tracks if track.get('track')]
    
    # Randomly select a song for highlighting
    random_song = random.choice(playlist_songs)
    
    # Return the randomly selected song, its artist(s), popularity, and the full playlist details
    return jsonify({
        'random_song': random_song,
        'playlist': {
            'name': playlist_name,
            'songs': playlist_songs
        }
    })

if __name__ == '__main__':
    app.run(debug=True)
