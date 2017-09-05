angular.module("LaMaceta")
	.controller("SubCtrlAdmin_Color", function($scope, AdminService, $modal, factoryData){

	$scope.colors = [];

	AdminService.getAllColors()
		.then(function(res){
			$scope.colors = res;  
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

