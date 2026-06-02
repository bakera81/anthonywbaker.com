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

with open(src, newline='', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    entries = [row for row in reader]

missing = []
for row in entries:
    artist = row['Artist'].strip()
    album = row['Album'].strip()
    if not artist or not album:
        continue
    name = f"{artist} - {album}"
    safe_name = re.sub(r'[^0-9A-Za-z \-_.]', '', name).strip().replace(' ', '_')
    safe_name = re.sub(r'_+', '_', safe_name)
    safe_name = safe_name.strip('_')
    dst_path = os.path.join(dst_dir, f"{safe_name}.jpg")
    if not os.path.exists(dst_path):
        missing.append((artist, album, dst_path))

print('Missing covers to fetch:', len(missing))

for artist, album, dst_path in missing:
    print('MB SEARCH', artist, '-', album)
    query_val = f'artist:"{artist}" AND release:"{album}"'
    url = f'https://musicbrainz.org/ws/2/release/?query={quote(query_val)}&fmt=json&limit=5'
    try:
        req = Request(url, headers={'User-Agent': 'album-art-fetcher/1.0 (anthonywbaker.com)'})
        with urlopen(req, timeout=30) as res:
            data = json.loads(res.read().decode('utf-8', errors='ignore'))
    except (URLError, HTTPError, ValueError) as exc:
        print('MB REQ ERR', exc)
        time.sleep(5)
        continue

    if not data.get('releases'):
        print('NO MB RELEASES', artist, album)
        time.sleep(5)
        continue

    best = None
    for release in data['releases']:
        title = release.get('title', '').lower()
        artist_credit = ' '.join([ac['name'] for ac in release.get('artist-credit', []) if 'name' in ac]).lower()
        if title == album.lower() or album.lower() in title:
            best = release
            break
    if best is None:
        best = data['releases'][0]

    mbid = best.get('id')
    if not mbid:
        print('NO MBID', artist, album)
        time.sleep(5)
        continue

    cover_url = f'https://coverartarchive.org/release/{mbid}/front-500'
    try:
        req = Request(cover_url, headers={'User-Agent': 'album-art-fetcher/1.0 (anthonywbaker.com)'})
        with urlopen(req, timeout=30) as imgres:
            image_data = imgres.read()
        with open(dst_path, 'wb') as out:
            out.write(image_data)
        print('SAVED MB', dst_path)
    except HTTPError as exc:
        if exc.code == 404:
            print('NO COVERART', artist, album, mbid)
        else:
            print('COVERART ERR', artist, album, exc)
    except URLError as exc:
        print('COVERART ERR', artist, album, exc)
    time.sleep(5)

print('MB RETRY COMPLETE')
