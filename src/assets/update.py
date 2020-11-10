# update.py
import requests
import json
import glob
import tarfile
import zipfile


url = "https://ddragon.leagueoflegends.com/api/versions.json"
response = requests.get(url)
obj = response.json()

patch = str(obj[0])

zipUrl = "https://ddragon.leagueoflegends.com/cdn/dragontail-" + patch + ".tgz"
print(zipUrl)
# just a random link of a dummy file
data = requests.get(zipUrl)
# retrieving data from the URL using get method
with open("src/assets/prev-data/dragontail-" + patch + ".tgz", 'wb') as f:
    # giving a name and saving it in any required format
    # opening the file in write mode
    f.write(data.content)
# writes the URL contents from the server

tgzFile = tarfile.open("src/assets/prev-data/dragontail-10.22.1.tgz", 'r')

print('Extracting one file...')
tgzFile.extractall('src/assets/prev-data/data-hold')

print('Extracting Done!')
tgzFile.close()
