# update.py
import requests
import json
import tarfile


url = "https://ddragon.leagueoflegends.com/api/versions.json"
response = requests.get(url)
obj = response.json()

patch = str(obj[0])

zipUrl = "https://ddragon.leagueoflegends.com/cdn/dragontail-" + patch + ".tgz"
print(zipUrl)

data = requests.get(zipUrl)

with open("src/assets/prev-data/dragontail-" + patch + ".tgz", 'wb') as f:
    # opening the file in write mode
    f.write(data.content)

tgzFile = tarfile.open("src/assets/prev-data/dragontail-10.22.1.tgz", 'r')

print('Extracting one file...')
tgzFile.extractall('src/assets/prev-data/data-hold')

print('Extracting Done!')
tgzFile.close()
