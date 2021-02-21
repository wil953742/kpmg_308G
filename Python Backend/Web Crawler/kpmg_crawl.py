from flask import Flask
from flask_restful import Resource, Api, reqparse
from requests import crawler

app = Flask(__name__)
api = Api(app)

class crawl_api(Resource):
    def __init__(self):
        self.crawl_tool = crawler()

    def get(self):
        return {'hello': 'world'}

    def post(self):
        try:
            req_parser = reqparse.RequestParser()
            req_parser.add_argument('url', type=str)
            req_parser.add_argument('target', type=str)
            args = req_parser.parse_args()

            _url = args['url']
            _target = args['target']

            # Shopping Mall Option to be added in the future
            result, err = self.crawl_tool.crawl(_url)

            if err is None:
                return result
            else:
                return {'error': str(err)}
        except Exception as err:
            return {'error': str(err)}


api.add_resource(crawl_api, '/')

app.run(debug=True, host = '127.0.0.1', port = 5000)
