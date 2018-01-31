(function () {
  'use strict';

  angular.module('FlickrSnippet', [])
  .controller('FlickrController', ['$scope', '$log', '$http',
	function($scope, $log, $http) {
		$scope.photos = [];
		$scope.status = "";
		
		$scope.getPhotos = function() {
			$scope.photos = [];
			$scope.selection = -1;
			$scope.metadata = "";
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
				url: '/api/images/' + galleryId + '/list',
				dataType: 'json',
				method: 'GET',
				//params: {"galleryId": galleryId},
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
		
		$scope.toggle = function(rowId) {
			if($scope.selection == rowId){
				$scope.selection = -1;
				$scope.metadata = "";
			}
			else{
				$scope.selection = rowId;
				$scope.metadata = $scope.photos[rowId].description._content + $scope.photos[rowId].owner_name;
			}
		};
		$scope.selection = -1;
		$scope.metadata = "";
	}
	]);
}());