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
		        	factoryData.data.code = provider.code;		        	
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

angular.module('LaMaceta').controller('ProviderModalCtrl', function ($scope, $modalInstance, AdminService, factoryData, $modal) {
	
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

	$scope.openSizeModal = function () {
	    var modalInstance = $modal.open({
	      animation: true,
	      templateUrl: '../theme/size-modal.html',
	      controller: 'SizeModalCtrl',
	      size: 'lg',
	      resolve: {
		        size: function () {		        
		        	factoryData.data.idProvider = null;    	
		        }
	      }

	    }).result.then(function(res) {
	    	$scope.sizes = res
	    });
    }  

});

angular.module('LaMaceta').controller('EditProviderModalCtrl', function ($scope, $modalInstance, AdminService, factoryData, $modal) {

	$scope.provider={id: factoryData.data.id, 
				name: factoryData.data.name,
				code: factoryData.data.code};

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

  	$scope.openSizeModal = function () {
	    var modalInstance = $modal.open({
	      animation: true,
	      templateUrl: '../theme/size-modal.html',
	      controller: 'SizeModalCtrl',
	      size: 'lg',
	      resolve: {
		        size: function () {		        
		        	factoryData.data.idProvider = $scope.provider.id;    	
		        }
	      }

	    }).result.then(function(res) {
	    });
    }  

});


//TODO asociar el provider al size
angular.module('LaMaceta').controller('SizeModalCtrl', function ($scope, $modalInstance, NgTableParams, AdminService, factoryData) {

	$scope.sizes = [];

	$scope.sizeStatus = [{id: "true", title: "ACTIVO"},
							{id: "false", title: "INACTIVO"}];

	$scope.provider={id: factoryData.data.idProvider};

	AdminService.getSizesByProvider($scope.provider.id)
		.then(function(res){
			$scope.buildSizes(res);

			$scope.sizeTableParams = new NgTableParams({}, { dataset: $scope.sizes});			
		});


    $scope.buildSizes = function (res) {
		$scope.sizes = [];
		for (i = 0; i < res.length; i++) { 		
			$obj = res[i];
			if($obj.id != null){
				$scope.sizes.push({id: $obj.id, size: $obj.size ,large:$obj.large, width: $obj.width, wedge: $obj.wedge, active: {id: $obj.active}});	
			}	
		}	
	};


	$scope.addRow = function () {
	    $scope.sizes.push({});
		$scope.sizeTableParams.reload();
  	};

	$scope.deleteRow = function () {
		for (i = 0; i < $scope.sizes.length; i++) { 				
			$obj = $scope.sizes[i];
			if($obj.id == null){
				$scope.sizes.splice(i,10);
			}
		}	
		$scope.sizeTableParams.reload();	
  	};

  
  	$scope.save = function () {
  		console.log($scope.sizes);
		AdminService.saveSizes($scope.sizes)
			.then(function(res){	
				$modalInstance.close(res);
			}, function(error){
				 $modalInstance.close();
			})		    
  	};

    $scope.cancel = function () {
		$modalInstance.close();
  	};
});