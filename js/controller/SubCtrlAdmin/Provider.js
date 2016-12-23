//Ver si se deja

angular.module("LaMaceta")
	.controller("SubCtrlAdmin_Provider", function($window, $scope, AdminService, $modal, factoryData, NgTableParams){

	$scope.providers = [];

	AdminService.getAllProviders()
		.then(function(res){
			$scope.providers = res;  
		});

	$scope.openProviderModal = function () {
		    var modalInstance = $modal.open({
		      animation: true,
		      templateUrl: '../theme/provider-modal.html',
		      controller: 'ProviderModalCtrl',
		      resolve: {
		      }

		    }).result.then(function(res) {
		    	console.log(res);
		    	$scope.providers = res
		    });
	    }  

     $scope.editProviderModal = function (provider) {
	    var modalInstance = $modal.open({
	      	animation: true,
	      	templateUrl: '../theme/provider-modal.html',
	      	controller: 'EditProviderModalCtrl',
	      	scope: $scope,
	      	resolve: {
		        provider: function () {		        
		        	factoryData.data.id = provider.id;
		        	factoryData.data.name = provider.name;
		        	factoryData.data.email = provider.email;
		        	factoryData.data.address = provider.address;
		        }
		      }
	    	}); 
    	modalInstance.result.then(function(res) {
			$scope.providers = res;
    	});
	}

	$scope.removeProvider = function (provider) {
		AdminService.removeProvider(provider)
			.then(function(res){
				console.log(res);
				$scope.providers = res;			
		});
	};
});

angular.module('LaMaceta').controller('ProviderModalCtrl', function ($scope, $modalInstance, AdminService) {
	
	$scope.save = function (provider) {
		//console.log(provider);
		AdminService.saveProvider(provider)
			.then(function(res){
				$modalInstance.close(res);
			}, function(error){
				 $modalInstance.close();////////
			})		    
	  	};

	$scope.cancel = function () {
	    $modalInstance.dismiss('cancel');
	};

});

angular.module('LaMaceta').controller('EditProviderModalCtrl', function ($scope, $modalInstance, AdminService, factoryData) {

	console.log(factoryData);

	$scope.provider={id: factoryData.data.id, 
				name: factoryData.data.name,
				email: factoryData.data.email,
				address: factoryData.data.address};

				//console.log($scope.address);

  	$scope.save = function (provider) {
		AdminService.saveProvider(provider)
			.then(function(res){	
				$modalInstance.close(res);
			}, function(error){
				 $modalInstance.close();////////
			})		    
	  	};

  $scope.cancel = function () {
	    $modalInstance.dismiss('cancel');
  }; 
});