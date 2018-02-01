import json
import logging
import requests
import os
from flask import Flask, render_template, send_from_directory, request, json, jsonify
from flask.ext.triangle import Triangle
from logging.handlers import RotatingFileHandler

application = Flask(__name__)
Triangle(application)

@application.before_first_request
def setup_logging():
    if not application.debug:
        # In production mode, add log handler to sys.stderr.
        application.logger.addHandler(RotatingFileHandler('app.log', maxBytes=10000, backupCount=1))
        application.logger.setLevel(logging.INFO)

@application.route('/favicon.ico') 
def favicon(): 
    return send_from_directory(os.path.join(application.root_path, 'static'), 'favicon.ico')

@application.route('/', methods=['GET', 'POST']) 
def showIndex():
    application.logger.info('Inside showIndex')
    errors = []
    results = {}
    return render_template('index.html', errors=errors, results=results)

@application.route('/api/images/<galleryId>/list', methods=['GET'])
def getImageList(galleryId):
    application.logger.info('Inside getImageList')
    try:
        application.logger.info('Gallery ID: %s' % galleryId)

        base = 'https://api.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=7085acc211b37cf566b6abf9e5efd5a3&format=json&nojsoncallback=1'
        # All Available Extras Can Be Found At: https://www.flickr.com/services/api/flickr.galleries.getPhotos.html
        extras = '&extras=description%2C+owner_name%2C+tags%2C+views%2C+url_q%2C+url_l'        
        gallery = '&gallery_id=' + galleryId
        url = base + extras + gallery

        response = requests.get(url, verify=False)
        application.logger.info('Response: %s' % response.json())
        return jsonify(response.json())
    except Exception,e:
        return jsonify(status='ERROR',message=str(e))

@application.route('/api/images/<photoId>', methods=['GET'])
def getImage(photoId):
    application.logger.info('Inside getImage')
    try:
        application.logger.info('Image ID: %s' % photoId)

        base = 'https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=7085acc211b37cf566b6abf9e5efd5a3&format=json&nojsoncallback=1'
        photo = '&photo_id=' + photoId
        url = base + photo

        response = requests.get(url, verify=False)
        application.logger.info('Response: %s' % response.json())
        return jsonify(response.json())
    except Exception,e:
        return jsonify(status='ERROR',message=str(e))

if __name__ == "__main__":
    application.run(host='0.0.0.0') 