angular.module("LaMaceta", ["ui.bootstrap", "ngTable"]).factory("factoryData", function() {
  return {
    data: {}
  };
});

angular.module("LaMaceta")
	.controller("AdminController", function($scope, AdminService, $modal, factoryData, NgTableParams){

	$scope.users = [];
	$scope.userTypes = [];
	$scope.articles = [];
	$scope.colors = [];
	$scope.sizes = [];
	/*Menu
	users
	products
	sales
	confDiscounts
	editProfile
	reports
	size-colors
	images
	shippingCost
	logout
	*/
	$scope.selectedTab = "products";

	$scope.selectTab = function (tab) {
		$scope.selectedTab=tab;
	}

	AdminService.getAllUsers()
		.then(function(res){
			$scope.users = res;
			//console.log(res);  
		});

	AdminService.getAllUserTypes()
		.then(function(res){
			$scope.userTypes = res;
			//console.log(res);  
		});

	AdminService.getAllArticles()
		.then(function(res){
			//$scope.articles = res;
			$scope.buildArticles(res);
			$scope.defaultConfigTableParams = new NgTableParams({}, { dataset: $scope.articles});
		});

		$scope.productStatus = [{id: "true", title: "ACTIVO"},
								{id: "false", title: "INACTIVO"}];

	AdminService.getAllColors()
		.then(function(res){
			$scope.colors = res;
			console.log(res);  
		});

	AdminService.getAllSizes()
		.then(function(res){
			$scope.sizes = res;
			//console.log(res);  
		});


	$scope.openUserModal = function (user) {
	    var modalInstance = $modal.open({
	      animation: true,
	      templateUrl: '../theme/user-modal.html',
	      controller: 'UserModalCtrl',
	      scope: $scope,
	      resolve: {
	        users: function () {	       	
	        }
	      }
	    });
	    modalInstance.result.then(function(res) {
			$scope.users = res;
	    });
    }

	$scope.openEditUser = function (user) {
	    var modalInstance = $modal.open({
	      animation: true,
	      templateUrl: '../theme/user-modal.html',
	      controller: 'EditUserModalCtrl',
	      scope: $scope,
	      resolve: {
	        users: function () {	 

		        	factoryData.data.id = user.id;
		        	factoryData.data.name = user.name;
		        	factoryData.data.surname = user.surname;
		        	factoryData.data.email = user.email;
		        	factoryData.data.password = user.password;
		        	factoryData.data.birthdate = user.birthdate;
		        	factoryData.data.gender = user.gender;
		        	factoryData.data.idUserType = user.idUserType;     	
	        }
	      }
	    });
	    modalInstance.result.then(function(res) {	    	
			$scope.users = res;
	    });
    }

	$scope.removeUser = function (user) {
		AdminService.removeUser(user)
			.then(function(res){
				$scope.users = res;
				//console.log(res);  
			});
    }
    
	$scope.openEditUserTypeModal = function (user) {
	    var modalInstance = $modal.open({
	      animation: true,
	      templateUrl: '../theme/edit-usertype-modal.html',
	      controller: 'EditUserTypeModalCtrl',
	      scope: $scope,
	      resolve: {
	        users: function () {	 

	        	factoryData.data.id = user.id;
	        	factoryData.data.idUserType = user.idUserType;   
	        }
	      }

	    });
    	modalInstance.result.then(function(res) {	    	
			$scope.users = res;
	    });
    }

	$scope.openArticleModal = function (user) {
	    var modalInstance = $modal.open({
	      animation: true,
	      templateUrl: '../theme/product-modal.html',
	      controller: 'ProductModalCtrl',
	      scope: $scope,
	      resolve: {
	      }

	    });

		modalInstance.result.then(function(res) {	    	
			$scope.articles = res;
	    });
    }

    $scope.buildArticles = function (res) {
		$scope.articles = [];

		for (i = 0; i < res.length; i++) { 	
			if(i>0 && res[i].id == res[i-1].id){
				$obj = res[i];
				$scope.articles[$lastObj].products.push(
					{sku: $obj.sku, active: $obj.active, color: {color: $obj.color, id: $obj.idColor}, 
					size: $obj.size, stock: $obj.stock, minStock: $obj.minStock, price: $obj.price});
			}else{				
				$obj = res[i];
				$lastObj = $scope.articles.length;
				$scope.articles[$lastObj] = {id:$obj.id, description: $obj.description, prodActive: $obj.prodActive,
					products:[{sku: $obj.sku, active: $obj.active, color: {color: $obj.color, id: $obj.idColor}, 
					size: $obj.size, stock: $obj.stock, 
						minStock: $obj.minStock, price: $obj.price}]};
			}
		}	
		console.log($scope.articles);
	};

	$scope.openDetailProductModal = function (detail) {
	    var modalInstance = $modal.open({
	      animation: true,
	      templateUrl: '../theme/detail-product.html',
	      controller: 'DetailProductModalCtrl',
	      scope: $scope,
	      resolve: {
	        detail: function () {	 

	        	factoryData.data.detail = detail;  

	        }
	      }

	    });
    }




	$scope.openDiscountModal = function (user) {
	    var modalInstance = $modal.open({
	      animation: true,
	      templateUrl: '../theme/discount-modal.html',
	      controller: 'DiscountModalCtrl',
	      size: 'lg',
	      resolve: {
	      }

	    }).result.then(function() {
	    	/*$scope.addresses = [];
	        AdminService.getAllUsers()
				.then(function(res){
						$scope.users = res;
				})*/
	    });
    }    

	$scope.openColorModal = function (user) {
	    var modalInstance = $modal.open({
	      animation: true,
	      templateUrl: '../theme/color-modal.html',
	      controller: 'ColorModalCtrl',
	      resolve: {
	      }

	    }).result.then(function() {
	    	/*$scope.addresses = [];
	        AdminService.getAllUsers()
				.then(function(res){
						$scope.users = res;
				})*/
	    });
    }  

	$scope.openSizeModal = function (user) {
	    var modalInstance = $modal.open({
	      animation: true,
	      templateUrl: '../theme/size-modal.html',
	      controller: 'SizeModalCtrl',
	      resolve: {
	      }

	    }).result.then(function() {
	    	/*$scope.addresses = [];
	        AdminService.getAllUsers()
				.then(function(res){
						$scope.users = res;
				})*/
	    });
    }  

	$scope.openShippingCostModal = function (user) {
	    var modalInstance = $modal.open({
	      animation: true,
	      templateUrl: '../theme/shipping-cost-modal.html',
	      controller: 'ShippingCostModalCtrl',
	      resolve: {
	      }

	    }).result.then(function() {
	    	/*$scope.addresses = [];
	        AdminService.getAllUsers()
				.then(function(res){
						$scope.users = res;
				})*/
	    });
    }
    
});

angular.module('LaMaceta').controller('UserModalCtrl', function ($scope, $modalInstance, AdminService) {

	//$scope.userType = [];

	  $scope.save = function (user) {
		AdminService.saveUser(user)
			.then(function(res){	
				console.log(res);
				$modalInstance.close(res);
			}, function(error){
				 $modalInstance.close();////////
			})		    
	  	};

	$scope.cancel = function () {
	    $modalInstance.dismiss('cancel');
	};
});

angular.module('LaMaceta').controller('EditUserModalCtrl', function ($scope, $modalInstance, factoryData, AdminService) {

	$scope.user={id: factoryData.data.id, 
				name: factoryData.data.name,
				surname: factoryData.data.surname,
				email: factoryData.data.email,
				password: factoryData.data.password,
				birthdate: factoryData.data.birthdate,
				gender: factoryData.data.gender,
				idUserType: factoryData.data.idUserType};

  	$scope.save = function (user) {
		AdminService.saveUser(user)
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

angular.module('LaMaceta').controller('EditUserTypeModalCtrl', function ($scope, $modalInstance, factoryData, AdminService) {

	$scope.user={id: factoryData.data.id, 
				idUserType: factoryData.data.idUserType};

  	$scope.save = function (user) {
	AdminService.updateUserType(user)
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



angular.module('LaMaceta').controller('DetailProductModalCtrl', function ($scope, factoryData, $modalInstance) {

	$scope.detail = factoryData.data.detail;

    $scope.cancel = function () {
	    $modalInstance.dismiss('cancel');
  	};

});

angular.module('LaMaceta').controller('ProductModalCtrl', function ($scope, NgTableParams, AdminService, $modalInstance) {

	/*AdminService.getAllColors()
		.then(function(res){
			$scope.colors = res;
			//console.log(res);  
		});

	AdminService.getAllSizes()
		.then(function(res){
			$scope.sizes = res;
			//console.log(res);  
		});

	$scope.data1 = [{name: "Moroni", age: 11},
					{name: "Moroni", age: 12},
					{name: "Moroni", age: 13} ];
	$scope.tableParams = new NgTableParams({        
		page: 1,   // show first page
    	count: 100  // count per page
    }, {
    	counts: [],
    	total: 1});//,dataset: data    
	*/

  	$scope.save = function (user) {
	AdminService.updateUserType(user)
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




angular.module('LaMaceta').controller('DiscountModalCtrl', function ($scope, NgTableParams) {

	$scope.data1 = [{name: "Moroni", age: 11},
					{name: "Moroni", age: 12},
					{name: "Moroni", age: 13}];
	$scope.tableParams = new NgTableParams({        
		page: 1,   // show first page
    	count: 100  // count per page
    }, {
    	counts: [],
    	total: 1});//,dataset: data
});

angular.module('LaMaceta').controller('ColorModalCtrl', function () {

});

angular.module('LaMaceta').controller('SizeModalCtrl', function ($scope, NgTableParams) {
	$scope.data1 = [{name: "S", age: 11}];
	$scope.tableParams = new NgTableParams({        
		page: 1,   // show first page
    	count: 100  // count per page
    }, {
    	counts: [],
    	total: 1});//,dataset: data   
});

angular.module('LaMaceta').controller('ShippingCostModalCtrl', function () {

});

