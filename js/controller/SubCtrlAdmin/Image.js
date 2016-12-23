//Verlo (ok)
angular.module("LaMaceta")
	.controller("SubCtrlAdmin_Image", function($window, $scope, AdminService, $modal, Upload){

	$scope.products = [];

	$scope.myFiles = [];

	AdminService.getAllProducts()
		.then(function(res){
			$scope.products = res;  
		});


	$scope.imagesVerification = function(images,invalidImages){
		$scope.goodFiles = [];
		$scope.goodFiles = images;
		$scope.badFiles = invalidImages;
	}

	$scope.uploadImages = function(formImage){
		formImage.upload = Upload.upload({
				        url: '../bd/uploadFiles.php',
				        data: {files: formImage.myFiles,
				        		type: formImage.type,
				        		product: formImage.product,
				        		sliderLink: formImage.sliderLink}
				      }).then(function(response){
				      	if (response.status == 200){
				      		$scope.errorMsg = response.data;
				      	}else{
				      		$scope.errorMsg = response.status + ': ' + response.data;
				      	}
				      	$scope.goodFiles = [];
				      	$scope.badFiles = [];
				      	$scope.images.myFiles = [];
				      });
	}

	$scope.openImagesModal = function () {
	    var modalInstance = $modal.open({
	      animation: true,
	      templateUrl: '../theme/images-modal.html',
	      controller: 'ImagesModalCtrl',
	      scope: $scope,
	      resolve: {
	      }
	    });
	    modalInstance.result.then(function(res) {
			$scope.users = res;
	    });
    }
});

angular.module('LaMaceta').controller('ImagesModalCtrl', function ($scope, $modalInstance, AdminService) {

	$scope.checklistToDelete = [];
	$scope.theImages = [];

	$scope.search = function (images) {
		if(images.type == "producto"){
			AdminService.getProductImages(images.product)
			.then(function(res){
				$scope.theImages = res;
			});
		}else{
			AdminService.getSliderImages(images.type)
			.then(function(res){
				$scope.theImages = res;
			});
		}
	}

	$scope.borrar = function (images) {
	    AdminService.deleteImages(images)
			.then(function(res){
				$scope.theImages = [];
				$scope.checklistToDelete = [];
			});
	};

	$scope.cancel = function () {
	    $modalInstance.dismiss('cancel');
	};

});

