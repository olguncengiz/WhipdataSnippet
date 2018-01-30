(function () {
  'use strict';

  angular.module('FlickrSnippet', [])

  .controller('FlickrController', ['$scope', '$log', '$http',
	function($scope, $log, $http) {
		$scope.getPhotos = function() {
			$log.log("test");

			// get the gallery id from the input
			var galleryId = $scope.galleryId;
			$log.log("Gallery ID:" + galleryId);

			// fire the API request
			$http.get('/getImageList', {params: {"galleryId": galleryId}}).
				success(function(results) {
					$log.log(results);
				}).
				error(function(error) {
					$log.log(error);
			});
		};
	}
	]);
}());