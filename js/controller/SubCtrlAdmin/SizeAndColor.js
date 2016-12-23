angular.module("LaMaceta")
	.controller("SubCtrlAdmin_SizeAndColor", function($scope, AdminService, $modal, factoryData){

	$scope.colors = [];
	$scope.sizes = [];

	AdminService.getAllColors()
		.then(function(res){
			$scope.colors = res;  
		});

	AdminService.getAllSizes()
		.then(function(res){
			$scope.sizes = res;
		});

	$scope.openColorModal = function () {
	    var modalInstance = $modal.open({
	      animation: true,
	      templateUrl: '../theme/color-modal.html',
	      controller: 'ColorModalCtrl',
	      resolve: {
	      }

	    }).result.then(function(res) {
	    	$scope.colors = res
	    });
    }  

     $scope.editColorModal = function (color) {
	    var modalInstance = $modal.open({
	      	animation: true,
	      	templateUrl: '../theme/color-modal.html',
	      	controller: 'EditColorModalCtrl',
	      	scope: $scope,
	      	resolve: {
		        color: function () {
		        	factoryData.data.id = color.id;
		        	factoryData.data.color = color.color;
		        	factoryData.data.rgb = color.rgb;
		        }
		      }
	    	}); 
    	modalInstance.result.then(function(res) {
			$scope.colors = res;
    	});
	}

	$scope.removeColor = function (color) {
		AdminService.removeColor(color)
			.then(function(res){
				$scope.colors = res;			
		});
	};

	$scope.openSizeModal = function () {
	    var modalInstance = $modal.open({
	      animation: true,
	      templateUrl: '../theme/size-modal.html',
	      controller: 'SizeModalCtrl',
	      resolve: {
	      }

	    }).result.then(function(res) {
	    	$scope.sizes = res
	    });
    }  

    $scope.editSizeModal = function (size) {
	    var modalInstance = $modal.open({
	      	animation: true,
	      	templateUrl: '../theme/size-modal.html',
	      	controller: 'EditSizeModalCtrl',
	      	scope: $scope,
	      	resolve: {
		        size: function () {
		        	
		        	factoryData.data.id = size.id;
		        	factoryData.data.size = size.size;
		        	factoryData.data.large = size.large;
		        }
		      }
	    	}); 
    	modalInstance.result.then(function(res) {
			$scope.sizes = res;
	    	});
	}

	$scope.removeSize = function (size) {
		AdminService.removeSize(size)
			.then(function(res){
				$scope.sizes = res;			
		});
	};
});

angular.module('LaMaceta').controller('ColorModalCtrl', function ($scope, $modalInstance, AdminService) {
	
	$scope.save = function (color) {
		AdminService.saveColor(color)
			.then(function(res){
				$modalInstance.close(res);
			}, function(error){
				 $modalInstance.close();
			})		    
	  	};

	$scope.cancel = function () {
	    $modalInstance.dismiss('cancel');
	};

});

angular.module('LaMaceta').controller('EditColorModalCtrl', function ($scope, $modalInstance, AdminService, factoryData) {

	console.log(factoryData);

	$scope.color={id: factoryData.data.id, 
				color: factoryData.data.color,
				rgb: factoryData.data.rgb};

  	$scope.save = function (color) {
		AdminService.saveColor(color)
			.then(function(res){	
				$modalInstance.close(res);
			}, function(error){
				 $modalInstance.close();
			})		    
	  	};

  $scope.cancel = function () {
	    $modalInstance.dismiss('cancel');
  }; 
});

angular.module('LaMaceta').controller('SizeModalCtrl', function ($scope, $modalInstance, NgTableParams, AdminService) {
	
	$scope.save = function (size) {
		AdminService.saveSize(size)
			.then(function(res){
				$modalInstance.close(res);
			}, function(error){
				 $modalInstance.close();
			})		    
	  	};

	$scope.cancel = function () {
	    $modalInstance.dismiss('cancel');
	};
});

angular.module('LaMaceta').controller('EditSizeModalCtrl', function ($scope, $modalInstance, AdminService, factoryData) {

	$scope.size={id: factoryData.data.id, 
				size: factoryData.data.size,
				large: factoryData.data.large};

  	$scope.save = function (size) {
		AdminService.saveSize(size)
			.then(function(res){	
				$modalInstance.close(res);
			}, function(error){
				 $modalInstance.close();
			})		    
	  	};

  $scope.cancel = function () {
	    $modalInstance.dismiss('cancel');
  }; 
});
