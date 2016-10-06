angular.module("LaMaceta", ["ui.bootstrap", 'ngTable','ngLoading'])
	.controller("AdminController", function($scope, AdminService, $modal){

	$scope.users = [];
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
	$scope.selectedTab = "configureDiscounts";

	$scope.selectTab = function (tab) {
		$scope.selectedTab=tab;
		//console.log($scope.selectedTab);
	}

	AdminService.getAllUsers()
		.then(function(res){
			$scope.users = res;
			//console.log(res);  
		});

	$scope.openEditUserTypeModal = function (user) {
	    var modalInstance = $modal.open({
	      animation: true,
	      templateUrl: '../theme1/edit-usertype-modal.html',
	      controller: 'EditUserTypeModalCtrl',
	      resolve: {
	      }

	    }).result.then(function() {
	    	$scope.addresses = [];
	        AdminService.getAllUsers()
				.then(function(res){
						$scope.users = res;
				})
	    });
    }

	$scope.openProductModal = function (user) {
	    var modalInstance = $modal.open({
	      animation: true,
	      templateUrl: '../theme1/product-modal.html',
	      controller: 'ProductModalCtrl',
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

	$scope.openUserModal = function (user) {
	    var modalInstance = $modal.open({
	      animation: true,
	      templateUrl: '../theme1/user-modal.html',
	      controller: 'UserModalCtrl',
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

	$scope.openDiscountModal = function (user) {
	    var modalInstance = $modal.open({
	      animation: true,
	      templateUrl: '../theme1/discount-modal.html',
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
	      templateUrl: '../theme1/color-modal.html',
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
	      templateUrl: '../theme1/size-modal.html',
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
	      templateUrl: '../theme1/shipping-cost-modal.html',
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

angular.module('LaMaceta').controller('EditUserTypeModalCtrl', function () {

});

angular.module('LaMaceta').controller('ProductModalCtrl', function ($scope, NgTableParams) {
	$scope.data1 = [{name: "Moroni", age: 11},
					{name: "Moroni", age: 12},
					{name: "Moroni", age: 13} ];
	$scope.tableParams = new NgTableParams({        
		page: 1,   // show first page
    	count: 100  // count per page
    }, {
    	counts: [],
    	total: 1});//,dataset: data    	
});

angular.module('LaMaceta').controller('UserModalCtrl', function () {

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