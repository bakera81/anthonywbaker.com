import csv
import json
import os
import re
import time
from urllib.error import HTTPError, URLError
from urllib.parse import quote, urlencode
from urllib.request import Request, urlopen

src = 'data/projects/what-record-should-i-buy/album_wishlist.csv'
dst_dir = 'public/images/projects/what-record-should-i-buy'
os.makedirs(dst_dir, exist_ok=True)


def normalize_name(artist, album):
    name = f"{artist.strip()} - {album.strip()}"
    safe = re.sub(r'[^0-9A-Za-z _-]+', '', name)
    safe = safe.replace(' ', '_')
    safe = re.sub(r'_+', '_', safe)
    safe = safe.strip('_')
    return f"{safe}.jpg"


def normalize_basename(name):
    base = os.path.splitext(name)[0]
    safe = re.sub(r'[^0-9A-Za-z _-]+', '', base)
    safe = safe.replace(' ', '_')
    safe = re.sub(r'_+', '_', safe)
    return safe.strip('_')


def find_existing_image(target_name):
    target_norm = normalize_basename(target_name)
    for existing_name in os.listdir(dst_dir):
        if normalize_basename(existing_name) == target_norm:
            return os.path.join(dst_dir, existing_name)
    return None


def download_image(url, path):
    req = Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urlopen(req, timeout=30) as imgres:
        image_data = imgres.read()
    with open(path, 'wb') as out:
        out.write(image_data)


def download_itunes_art(artist, album):
    queries = [f"{artist} {album}", album, f"{album} {artist}"]
    for q in queries:
        params = {'term': q, 'entity': 'album', 'limit': 5}
        url = 'https://itunes.apple.com/search?' + urlencode(params)
        try:
            req = Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urlopen(req, timeout=30) as res:
                data = json.loads(res.read().decode('utf-8', errors='ignore'))
        except (URLError, HTTPError, ValueError) as exc:
            print('ITUNES REQ ERR', q, exc)
            time.sleep(5)
            continue

        if data.get('resultCount', 0) == 0:
            print('ITUNES NO RESULT', q)
            time.sleep(5)
            continue

        best = None
        for result in data['results']:
            track_name = result.get('collectionName', '')
            artist_name = result.get('artistName', '')
            if track_name.lower() == album.lower() and artist_name.lower() == artist.lower():
                best = result
                break
        if best is None:
            best = data['results'][0]

        artwork_url = best.get('artworkUrl100') or best.get('artworkUrl60')
        if artwork_url:
            return artwork_url.replace('100x100bb', '600x600bb').replace('60x60bb', '600x600bb')

        time.sleep(5)
    return None


def download_mb_art(artist, album):
    query_val = f'artist:"{artist}" AND release:"{album}"'
    url = f'https://musicbrainz.org/ws/2/release/?query={quote(query_val)}&fmt=json&limit=5'
    try:
        req = Request(url, headers={'User-Agent': 'album-art-fetcher/1.0 (anthonywbaker.com)'})
        with urlopen(req, timeout=30) as res:
            data = json.loads(res.read().decode('utf-8', errors='ignore'))
    except (URLError, HTTPError, ValueError) as exc:
        print('MB REQ ERR', artist, album, exc)
        return None

    releases = data.get('releases') or []
    if not releases:
        print('MB NO RELEASES', artist, album)
        return None

    best = None
    for release in releases:
        title = release.get('title', '').lower()
        if title == album.lower() or album.lower() in title:
            best = release
            break
    if best is None:
        best = releases[0]

    mbid = best.get('id')
    if not mbid:
        print('MB NO MBID', artist, album)
        return None

    cover_url = f'https://coverartarchive.org/release/{mbid}/front-500'
    try:
        req = Request(cover_url, headers={'User-Agent': 'album-art-fetcher/1.0 (anthonywbaker.com)'})
        with urlopen(req, timeout=30) as imgres:
            image_data = imgres.read()
        return cover_url
    except HTTPError as exc:
        print('COVERART HTTP ERR', artist, album, exc)
    except URLError as exc:
        print('COVERART URL ERR', artist, album, exc)
    return None


with open(src, newline='', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    entries = [row for row in reader]

failed = []

for row in entries:
    artist = row['Artist'].strip()
    album = row['Album'].strip()
    if not artist or not album:
        continue

    target_name = normalize_name(artist, album)
    target_path = os.path.join(dst_dir, target_name)
    existing_path = find_existing_image(target_name)

    if existing_path and existing_path != target_path:
        print('RENAME', os.path.basename(existing_path), '->', target_name)
        os.replace(existing_path, target_path)
        existing_path = target_path

    if os.path.exists(target_path):
        continue

    print('DOWNLOAD', artist, '-', album)
    artwork_url = download_itunes_art(artist, album)
    if not artwork_url:
        artwork_url = download_mb_art(artist, album)
    if not artwork_url:
        failed.append((artist, album, 'no artwork found'))
        print('FAIL', artist, album)
        time.sleep(5)
        continue

    try:
        download_image(artwork_url, target_path)
        print('SAVED', target_path)
    except (URLError, HTTPError) as exc:
        failed.append((artist, album, f'download failed: {exc}'))
        print('DOWNLOAD ERR', artist, album, exc)
    time.sleep(5)

print('DONE')
if failed:
    for item in failed:
        print('FAILED:', item)
