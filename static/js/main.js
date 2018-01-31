(function () {
  'use strict';

  angular.module('FlickrSnippet', [])

  .controller('FlickrController', ['$scope', '$log', '$http',
	function($scope, $log, $http) {
		$scope.photos = [{"id": "1"}, {"id": "2"}, {"id": "3"}];
		
		$scope.getPhotos = function() {
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
				$scope.photos = response.photos.photo;
				$log.log(response.photos.photo);
			}).error(function(error){
				$log.log(error);
			});
		};
	}
	]);
}());