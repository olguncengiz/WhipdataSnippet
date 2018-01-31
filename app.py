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
    if request.method == "POST":
        # Get Gallery Id that the user has entered
        try:
            galleryId = request.form['galleryId']
            application.logger.info('Gallery ID: %s' % galleryId)
        except:
            errors.append(
                "Unable to get gallery id. Please try again."
            )
    return render_template('index.html', errors=errors, results=results)

@application.route('/getImageList', methods=['GET'])
def getImageList():
    application.logger.info('Inside getImageList')
    try:
        gallery_id = request.args.get('galleryId')
        application.logger.info('Gallery ID: %s' % gallery_id)

        url = 'https://api.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=7085acc211b37cf566b6abf9e5efd5a3&format=json&nojsoncallback=1&extras=description%2C+license%2C+date_upload%2C+date_taken%2C+owner_name%2C+icon_server%2C+original_format%2C+last_update%2C+geo%2C+tags%2C+machine_tags%2C+o_dims%2C+views%2C+media%2C+path_alias%2C+url_sq%2C+url_t%2C+url_s%2C+url_q%2C+url_m%2C+url_n%2C+url_z%2C+url_c%2C+url_l%2C+url_o&gallery_id='
        url = url + gallery_id
        response = requests.get(url, verify=False)
        #resp_dict = response.json()
        #application.logger.info('Response.Text: %s' % response.text)
        application.logger.info('Response: %s' % response.json())
        #return jsonify(resp_dict)
        return jsonify(response.json())

    except Exception,e:
        return jsonify(status='ERROR',message=str(e))

@application.route('/getImage',methods=['GET'])
def getImage():
    try:
        image_id = request.json['imageId']
        application.logger.info('Image ID: %s' % image_id)

        return jsonify(status='OK',message='Fetched Flickr Image Successfully.')

    except Exception,e:
        return jsonify(status='ERROR',message=str(e))

if __name__ == "__main__":
    application.run(host='0.0.0.0') 