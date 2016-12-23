angular.module("LaMaceta")
	.controller("SubCtrlAdmin_Province", function($scope, AdminService, $modal, factoryData){

	$scope.provinces = [];

	AdminService.getAllProvinces()
		.then(function(res){
			$scope.provinces = res;
		});

    $scope.openProvinceModal = function () {
	    var modalInstance = $modal.open({
	      animation: true,
	      templateUrl: '../theme/province-modal.html',
	      controller: 'ProvinceModalCtrl',
	      resolve: { }

	    }).result.then(function(res) {
	    	$scope.provinces = res;
	    });
    }
    
    $scope.editProvinceModal = function (province) {
	    var modalInstance = $modal.open({
	      	animation: true,
	      	templateUrl: '../theme/province-modal.html',
	      	controller: 'EditProvinceModalCtrl',
	      	scope: $scope,
	      	resolve: {
		        province: function () {
		        	factoryData.data.id = province.id;
		        	factoryData.data.name = province.name;
		        	factoryData.data.cost = province.cost;
		        }
		      }
	    	}); 
    	modalInstance.result.then(function(res) {
			$scope.provinces = res;
	    	});
	    }


	$scope.removeProvince = function (province) {
		AdminService.removeProvince(province)
			.then(function(res){
				$scope.provinces = res;			
		});
	};
    
});

angular.module('LaMaceta').controller('ProvinceModalCtrl', function ($scope, $modalInstance, AdminService) {
	$scope.save = function (province) {
		AdminService.saveProvince(province)
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

angular.module('LaMaceta').controller('EditProvinceModalCtrl', function ($scope, $modalInstance, AdminService, factoryData) {

	$scope.province={id: factoryData.data.id, 
				name: factoryData.data.name,
				cost: factoryData.data.cost};

  	$scope.save = function (province) {
		AdminService.saveProvince(province)
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
