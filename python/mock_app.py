import xlrd
import pandas as pd
from flask import Flask
from flask_restful import Resource, Api
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)
api = Api(app)

class HelloWorld(Resource):
    def get(self):
        excel_file = 'SHOP_SCHEDULE.xls'
        movies = pd.read_excel(excel_file, sheet_name="MILLS", parse_cols ="A:U")
        print(movies)
        movies = movies.to_json(orient="records", date_format='iso')
        r = requests.post('http://localhost:3001/manufacturing', data = {'schedule': movies, 'secret': 'cschmidtbcf' })
        return movies

api.add_resource(HelloWorld, '/')

if __name__ == '__main__':
    app.run(debug=True)
