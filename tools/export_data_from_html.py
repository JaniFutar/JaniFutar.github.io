

with open('index.html', encoding='utf8') as f:
    text = f.read()

raw_categories = text.split('id="flip')[1:]

final_results = {}

for raw_category in raw_categories:
    category = raw_category.split('">')[1].split('</div>')[0]
    if not category in final_results:
        final_results[category] = []
    
    raw_items = raw_category.split('<div class="products-box">')[1:]
    for raw_item in raw_items:
        img = raw_item.split('<img class="products-img" src="')[1].split('"')[0]
        name = raw_item.split('<p>')[1].split('<br>')[0]
        print(name)
        try:
            price, unit = raw_item.split('<p>')[1].split('<br>')[1].split('</p>')[0].split('/')
        except:
            price, *unit = raw_item.split('<p>')[1].split('</p>')[0].split('<br>')[1:][::-1]
        price = price.lower().replace('ft', '')
        unit = ''.join(unit)
    

        final_results[category].append({
            'name': name.strip(),
            'img': img.strip(),
            'price': price.strip(),
            'unit': unit.lower().strip()
        })


for key, value in final_results.items():
    with open('result_' + key.lower().replace(' ', '') + '.txt', 'w') as f:
        pass

    with open('result_' + key.lower().replace(' ', '') + '.txt', 'a', encoding='utf8') as f:
        for item in final_results[key]:
            line = [
                item['name'],
                item['unit'],
                item['price'],
                '',
                '',
                item['img']
            ]
            f.write('\t'.join(line) + '\n')

