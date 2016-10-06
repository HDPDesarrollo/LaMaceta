angular.module("LaMaceta", ["ui.bootstrap"])
	.controller("AccountController", function($scope, AccountService, $modal){

	$scope.addresses = [];
	/*Menu
	addressesBook
	changeProfile
	myPurchases
	logout	
	*/
	$scope.selectedTab = "changeProfile";

	$scope.selectTab = function (tab) {
		$scope.selectedTab=tab;
		//console.log($scope.selectedTab);
	}

	AccountService.getAllAddresses()
		.then(function(res){
			$scope.addresses = res;
			console.log(res);  
		});

	$scope.openAddressModal = function (user) {
	    var modalInstance = $modal.open({
	      animation: true,
	      templateUrl: '../theme1/address-modal.html',
	      controller: 'AddressModalCtrl',
	      resolve: {
	        addresses: function () {
	        	//factoryData.data.provinces = $scope.provinces;
	        }
	      }

	    }).result.then(function() {
    		$scope.addresses = [];
	        UserService.getAllAddresses()
				.then(function(res){
						$scope.addresses = res;
				})
	    });
    }
});

angular.module('LaMaceta').controller('AddressModalCtrl', function () {

});