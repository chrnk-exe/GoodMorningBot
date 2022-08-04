import requests

r = requests.post('http://127.0.0.1:5000/save_video')
print(r.status_code)
print(r.text)