angular.module("LaMaceta", ["ui.bootstrap"]).factory("factoryData", function() {
  return {
    data: {}
  };
});

angular.module("LaMaceta")
	.controller("AccountController", function($scope, AccountService, $modal, factoryData){


	/*Menu
	addressesBook
	changeProfile
	myPurchases
	logout	
	*/

	$scope.addresses = [];
	$scope.provinces = [];
	$scope.user = [];
	$scope.myPurchases = [];
	$scope.selectedTab = "myPurchases";

	$scope.selectTab = function (tab) {
		$scope.selectedTab=tab;
	}

	//Address
	AccountService.getAllAddresses()
		.then(function(res){
			$scope.addresses = res;
		});

	AccountService.getAllProvinces()
		.then(function(res){
			$scope.provinces = res;
		});

	$scope.openAddressModal = function (user) {
	    var modalInstance = $modal.open({
	      animation: true,
	      templateUrl: '../theme/address-modal.html',
	      controller: 'AddressModalCtrl',
	      scope: $scope,
	      resolve: {
	        addresses: function () {	       	
	        }
	      }
	    });
	    modalInstance.result.then(function(res) {
			$scope.addresses = res;
	    });
    }

    $scope.editAddressModal = function (address) {
	    var modalInstance = $modal.open({
	      	animation: true,
	      	templateUrl: '../theme/address-modal.html',
	      	controller: 'EditModalAddressCtrl',
	      	scope: $scope,
	      	resolve: {
		        addresses: function () {
		        	
		        	factoryData.data.id = address.id;
		        	factoryData.data.street = address.street;
		        	factoryData.data.number = address.number;
		        	factoryData.data.phone = address.phone;
		        	factoryData.data.mobilePhone = address.mobilePhone;
		        	factoryData.data.zipCode = address.zipCode;
		        	factoryData.data.apartment = address.apartment;
		        	factoryData.data.city = address.city;
		        	factoryData.data.province = address.idProvince;
		        }
		      }
	    	}); 
    	modalInstance.result.then(function(res) {
			$scope.addresses = res;
	    });
	    }

	$scope.removeAddress = function (address) {
			AccountService.removeAddress(address)
				.then(function(res){
					$scope.addresses = res;			
			})
		};

	//User

	AccountService.getUser()
	.then(function(res){
		//console.log(res);

		/* $scope.data = res; // get row data
    	 $scope.data.mydatefield = new Date($scope.data.birthDate); 
		console.log($scope.data.mydatefield);
		/*console.log(new Date(res.birthDate));
		res.birthDate = new Date(res.birthDate);*/
		//console.log(res);
		$scope.user = res;
	});

	$scope.updateProfile = function (user) {
		AccountService.updateProfile(user)
			.then(function(res){
				$scope.user = res;	
				alert("Usuario actualizado correctamente!");
		})
	};

	$scope.cancelUpdateProfile = function () {
		alert("Usuario no modificado!");
	};

	//Purchases

	AccountService.getAllPurchases()
		.then(function(res){
		$scope.buildPurchase(res);
	});

	$scope.buildPurchase = function (res) {
		$scope.myPurchases = [];
		for (i = 0; i < res.length; i++) { 	
			if(i>0 && res[i].saleNumber == res[i-1].saleNumber){
				$obj = res[i];
				$scope.myPurchases[$lastObj].description.push(
				{name: $obj.name, color: $obj.color, size: $obj.size, quantity: $obj.quantity, unitPrice: $obj.unitPrice});
				$scope.myPurchases[$lastObj].totalAmount +=($obj.quantity*$obj.unitPrice);
			}else{				
				$obj = res[i];
				$lastObj = $scope.myPurchases.length;
				$scope.myPurchases[$lastObj] = {id:$obj.id, saleNumber: $obj.saleNumber, state: $obj.description, date: $obj.date.date, 
					totalAmount: ($obj.quantity*$obj.unitPrice),
					description:[{name: $obj.name, color: $obj.color, size: $obj.size, quantity: $obj.quantity, unitPrice: $obj.unitPrice}]};
			}
		}	
		//console.log($scope.myPurchases);
	};

	$scope.cancelPurchase = function (purchase) {
		AccountService.cancelPurchase(purchase)
			.then(function(res){
				$scope.buildPurchase(res);	
		})
	};

	$scope.allowedCancelPurchase = function (purchase) {
		if(purchase.state === "CANCELADO" || purchase.state ==="FINALIZADO"){
			return true;
		}		
		return false;
	};


	
	

});

angular.module('LaMaceta').controller('AddressModalCtrl', function ($scope, $modalInstance, AccountService) {

	  $scope.save = function (address) {
		AccountService.saveAddress(address)
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

angular.module('LaMaceta').controller('EditModalAddressCtrl', function ($scope, $modalInstance, AccountService, factoryData) {

	$scope.address={id: factoryData.data.id, 
				street: factoryData.data.street,
				number: factoryData.data.number,
				phone: factoryData.data.phone,
				mobilePhone: factoryData.data.mobilePhone,
				zipCode: factoryData.data.zipCode,
				apartment: factoryData.data.apartment,
				city: factoryData.data.city,
				province: factoryData.data.province};

  	$scope.save = function (address) {
		AccountService.saveAddress(address)
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


