(function () {
  'use strict';

  angular.module('FlickrSnippet', [])
  .config(['$interpolateProvider', function($interpolateProvider) {
	  $interpolateProvider.startSymbol('{a');
	  $interpolateProvider.endSymbol('a}');
	}])
  .controller('FlickrController', ['$scope', '$log', '$http',
	function($scope, $log, $http) {
		$scope.photos = [];
		$scope.status = "";
		
		// Metadata Variables
		$scope.photoId = "";
		$scope.photoTitle = "";
		$scope.photoDescription = "";
		$scope.photoOwnername = "";
		$scope.photoTags = "";
		$scope.photoViews = "";
		$scope.photoURL = "";

		$scope.setMetadata = function(rowId) {
			$scope.photoId = $scope.photos[rowId].id;
			$scope.photoTitle = $scope.photos[rowId].title;
			$scope.photoDescription = $scope.photos[rowId].description._content;
			$scope.photoOwnername = $scope.photos[rowId].owner_name;
			$scope.photoTags = $scope.photos[rowId].tags;
			$scope.photoViews = $scope.photos[rowId].views;
			$scope.photoURL = $scope.photos[rowId].url_l;
		};

		$scope.resetMetadata = function() {
			$scope.photoId = "";
			$scope.photoTitle = "";
			$scope.photoDescription = "";
			$scope.photoOwnername = "";
			$scope.photoTags = "";
			$scope.photoViews = "";
			$scope.photoURL = "";
		};

		
		$scope.getPhotos = function() {
			$scope.photos = [];
			$scope.selection = -1;
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
				var elem = document.getElementById(rowId);
		 		elem.style.backgroundColor = 'white';
			}
			else{
				if($scope.selection != -1){
					var elem = document.getElementById($scope.selection);
		 			elem.style.backgroundColor = 'white';
				}
				$scope.selection = rowId;
				var elem = document.getElementById(rowId);
		 		elem.style.backgroundColor = 'red';
		 		$scope.setMetadata(rowId);
			}
		};
		$scope.selection = -1;
	}
	]);
}());