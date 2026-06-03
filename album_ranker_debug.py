import random

def random_int(min_, max_):
    return random.randint(min_, max_)

def shuffle(items):
    items = items[:]
    random.shuffle(items)
    return items

def build_initial_pairs(albums):
    shuffled = shuffle(albums)
    pairs = []
    for i in range(0, len(shuffled) - 1, 2):
        pairs.append((shuffled[i], shuffled[i + 1]))
    if len(shuffled) % 2 == 1 and len(shuffled) > 1:
        last = shuffled[-1]
        partner = shuffled[random_int(0, len(shuffled) - 2)]
        if partner['id'] != last['id']:
            pairs.append((last, partner))
    return pairs

def build_live_ranked(albums, scores, order, seen):
    return sorted(
        [a for a in albums if seen.get(a['id'])],
        key=lambda a: (-scores.get(a['id'], 0), order[a['id']]),
    )

albums = [{'id': f'a{i}'} for i in range(7)]
for trial in range(1000):
    initial_pairs = build_initial_pairs(albums)
    scores = {}
    seen = {}
    for pair in initial_pairs:
        scores[pair[0]['id']] = 1
        scores[pair[1]['id']] = 0
        seen[pair[0]['id']] = True
        seen[pair[1]['id']] = True
    order = {a['id']: i for i, a in enumerate(albums)}
    initial_ranking = build_live_ranked(albums, scores, order, seen)
    sorted_list = [initial_ranking[0]] if initial_ranking else []
    queue = initial_ranking[1:]
    candidate = queue.pop(0) if queue else None
    low = 0
    high = len(sorted_list) - 1 if sorted_list else -1
    mid = 0
    seen_self = False
    while candidate:
        if mid < 0 or mid >= len(sorted_list):
            print('bad mid', mid, [x['id'] for x in sorted_list], candidate['id'])
            break
        if sorted_list[mid]['id'] == candidate['id']:
            print('self compare', candidate['id'], mid, [x['id'] for x in sorted_list])
            seen_self = True
            break
        winner = candidate if random.random() < 0.5 else sorted_list[mid]
        if winner['id'] == candidate['id']:
            high = mid - 1
        else:
            low = mid + 1
        if low > high:
            sorted_list.insert(low, candidate)
            candidate = queue.pop(0) if queue else None
            if candidate:
                low = 0
                high = len(sorted_list) - 1
                mid = (low + high) // 2
            else:
                mid = -1
                break
        else:
            mid = (low + high) // 2
    if seen_self:
        print('Found self compare in trial', trial)
        break
else:
    print('No self compare found in 1000 trials')
