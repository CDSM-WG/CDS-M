from flask import Flask, request
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

@app.route('/', methods = ['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        data = request.form['data']
        name = request.form['name']
        directory = "../src/assets/uploads/"
        with open(directory + name, '+wb') as f:
            f.write(data.encode())
    return { "name": name }
		
if __name__ == '__main__':
    app.run(debug = True, port=4201)