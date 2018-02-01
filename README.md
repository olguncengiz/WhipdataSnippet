# WhipdataSnippet
Test application for Whipdata combining Flickr API, Python and AngularJS

The demo of the application can be found at: https://intense-inlet-65761.herokuapp.com/

# REST API Usage
There are 2 endpoints for this tool:

- GET /api/images/{galleryId}/list: Fetches images in the gallery
Example:
https://intense-inlet-65761.herokuapp.com/api/images/72157644837968661/list

- GET /api/images/{id}: Fetches image details
Example:
https://intense-inlet-65761.herokuapp.com/api/images/10666317415

# Webpage Usage
On the web page, there is a form, which consists an input field and submit button. After entering the Flickr gallery id, press "Submit" button to get the list of the photos in the gallery (Gallery id is a required field).

If the gallery id is not valid, there will be an error message.

If the gallery id is valid, the list of the photos in the gallery will be listed in a photo carousel format under the submit form. On the carousel, if you click on any photo, the metadata of the photo will be listed under the carousel.

The metadata includes these fields:
- ID
- Title
- Description
- Owner Name	
- Tags
- Views
- URL to Original Photo

Please contact olgun.cengiz@gmail.com for further assistance.

Olgun Cengiz
