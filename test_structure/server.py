
from flask import Flask, jsonify, render_template, request, Response

app = Flask(__name__)

CONTENT_TYPES = {
    'css': 'text/css',
    'html': 'text/html',
    'js': 'application/javascript'
}


@app.route('/<string:page>', methods=['GET'])
def route(page=None):
    respone = render_template(page)
    return Response(respone, mimetype=CONTENT_TYPES[page.split('.')[1]])


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8888)