(function () {
  'use strict';

  angular.module('FlickrSnippet', [])
  .controller('FlickrController', ['$scope', '$log', '$http',
	function($scope, $log, $http) {
		$scope.photos = [];
		$scope.status = "";
		
		$scope.getPhotos = function() {
			$scope.photos = [];
			$scope.status = "Retrieving Photos From Flickr Gallery...";
			
			$log.log("Inside Angular Function");

			// get the gallery id from the input
			var galleryId = $scope.galleryId;
			$log.log("Gallery ID:" + galleryId);

			/*// fire the API request
			$http.get('/getImageList', {params: {"galleryId": galleryId}}).
				success(function(results) {
					$scope.photos = results.data;
					$log.log(results);
				}).
				error(function(error) {
					$log.log(error);
			});*/
			$http({
				url: '/getImageList',
				dataType: 'json',
				method: 'GET',
				params: {"galleryId": galleryId},
				headers: {
					"Content-Type": "application/json"
				}

			}).success(function(response){
				if(response.photos)
				{
					$log.log(response);
					$scope.photos = response.photos.photo;
					$scope.status = "";
				}
				else
				{
					$scope.status = response.message;
				}
			}).error(function(error){
				$log.log(error);
				$scope.status = "Error Retrieving Gallery, Please Try Again...";
			});
		};
	}
	]);
}());