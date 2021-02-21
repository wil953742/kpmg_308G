from flask import Flask, make_response
from flask_restful import Resource, Api, reqparse
from flask_cors import CORS
from requests import crawler

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
api = Api(app)

class crawl_api(Resource):
    def __init__(self):
        self.crawl_tool = crawler()

    def get(self):
        response = make_response({'hello': 'world'})
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Methods'] = '*'
        return response

    def post(self):
        try:
            req_parser = reqparse.RequestParser()
            req_parser.add_argument('url', type=str)
            req_parser.add_argument('target', type=str)
            args = req_parser.parse_args()

            _url = args['url']
            print(_url)
            _target = args['target']
            print(_target)

            # Shopping Mall Option to be added in the future
            result, err = self.crawl_tool.crawl(_url)

            if err is None:
                response = make_response(result)
                response.headers['Access-Control-Allow-Origin'] = '*'
                return response
            else:
                response = make_response({'error': str(err)})
                response.headers['Access-Control-Allow-Origin'] = '*'
                return response
        except Exception as err:
            response = make_response({'error': str(err)})
            response.headers['Access-Control-Allow-Origin'] = '*'
            return response


api.add_resource(crawl_api, '/')

app.run(debug=True, host='0.0.0.0')