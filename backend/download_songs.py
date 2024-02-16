import json
import yt_dlp
import os

input_file = 'artists_songs.json'

def download_song(artist: str, song: str):
    query = f"{artist} {song}"
    
    outtmpl = 'downloads/%(id)s.%(ext)s'
    
    ydl_opts = {
        'format': 'bestaudio/best',
        'outtmpl': outtmpl,
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',
            'preferredquality': '192',
        }],
        'postprocessor_args': [
            '-to', '30',
        ],
        'noplaylist': True,
        'quiet': True,
        'no_warnings': True,
        'default_search': 'ytsearch1:',
        'limit': 1,
    }
    
    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            result = ydl.extract_info(f"ytsearch:{artist} {song}", download=True)
            if 'entries' in result and result['entries']:
                download_id = result['entries'][0]['id']
                temp_filename = f"downloads/{download_id}.mp3"
                desired_filename = f"downloads/{artist} - {song}.mp3"
                
                if os.path.exists(temp_filename):
                    os.rename(temp_filename, desired_filename)
                    print(f"Downloaded and renamed to: {desired_filename}")
                else:
                    print(f"File not found after download: {temp_filename}")
            else:
                print(f"No results found for: {artist} {song}")
    except Exception as e:
        print(f"Error downloading {artist} - {song}: {e}")

def download_top_songs():
    artists_to_skip = ['Taylor Swift', 'Kanye West', 'Lana Del Rey', 'Kendrick Lamar', 'The Weeknd', 'Drake', 'Ariana Grande']
    with open(input_file, 'r', encoding='utf-8') as file:
        artist_songs = json.load(file)
    
    for artist, songs in artist_songs.items():
        if artist in artists_to_skip:
            continue
        print(f"Downloading top songs for {artist}...")
        for song in songs[:10]:
            download_song(artist, song)

if __name__ == "__main__":
    download_top_songs()
