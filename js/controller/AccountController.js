angular.module("LaMaceta").factory("factoryData", function() {
  return {
    data: {}
  };
});

angular.module('LaMaceta').filter('dateFilter', function($filter){
    return function(input)
    {
        if(input == null)
        	return "";
        return $filter('date')(new Date(input), 'MM/yy');
    };
});

angular.module("LaMaceta")
	.controller("AccountController", function($scope, $window, AccountService,CartService,MailService, $modal, factoryData, $cookies){

	var loc = window.location.href;
	var dir = loc.substring(0, loc.lastIndexOf('/'));

	if($cookies.getObject("loginCredentials") == undefined){
		$window.location.href = dir+"/page-login.html";
	}

	
	$scope.user = $cookies.getObject("loginCredentials");
	$scope.user.birthDate = new Date($scope.user.birthDate.date);
	
	
	var dia = new Date();
	dia.setFullYear(1998);	
	$scope.hace18 = dia;                      
 

	/*Menu
	addressesBook
	changeProfile
	myPurchases
	logout	
	*/
	
	$scope.addToCart = function (artId) {
		CartService.addToCart(artId);
	}

	/*$scope.pruebaMandarMail = function (artId) {
		MailService.mailMinStock(artId)
			.then(function(res){
				console.log(res);		
		})
	}

	$scope.pruebaMailDetalleCompra = function (saleId) {
		MailService.mailDetailCheckout(saleId)
			.then(function(res){
				console.log(res);		
		})
	}*/

	$scope.addresses = [];
	$scope.provinces = [];
	//$scope.user = [];
	$scope.myPurchases = [];
	$scope.selectedTab = "myPurchases";
	$scope.myCreditCards = [];
	$scope.blacklistSales = [];

	$scope.selectTab = function (tab) {
		$scope.selectedTab=tab;
	}

	//Address
	AccountService.getAllAddresses($scope.user)
		.then(function(res){
			$scope.addresses = res;
			//console.log(res);
		});

	AccountService.getAllProvinces()
		.then(function(res){
			$scope.provinces = res;
		});

	AccountService.getCreditCards($scope.user)
		.then(function(res){
			//console.log(res);
			$scope.myCreditCards = res;
		});
	$scope.shippingCostTotal = 0;
	$scope.impuestosTotal = 0;
	
	AccountService.getRejectedSales($scope.user)
		.then(function(res){
			console.log(res);
			$scope.blacklistSales = res;
			angular.forEach(res, function(value, key) {
				$scope.shippingCostTotal += value.idSale.shippingCost;
				$scope.impuestosTotal += value.idSale.price;
			});
			$scope.impuestosTotal = $scope.impuestosTotal*5/100;
			$scope.deudaTotal = $scope.shippingCostTotal+$scope.impuestosTotal;
		});

	$scope.pagarBlacklist = function (creditCard) {
		AccountService.pagarBlacklist($scope.user)
			.then(function(res){
				console.log(res);
				alert("Usted ha pagado correctamente $"+$scope.deudaTotal+" con la tarjeta "+creditCard.number);
				$cookies.putObject("loginCredentials",res); //se actualiza la cookie porque se le saca el blacklist=1 al user y se lo pone en 0
				$window.location.href = dir+"/my-account.html";
		})
	};

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

	AccountService.getAllPurchases($scope.user)
		.then(function(res){
		$scope.buildPurchase(res);
	});

	$scope.buildPurchase = function (res) {
		console.log(res);
		$scope.myPurchases = [];
		for (i = 0; i < res.length; i++) { 	
			if(i>0 && res[i].id == res[i-1].id){
				$obj = res[i];
				$scope.myPurchases[$lastObj].description.push(
				{name: $obj.name, color: $obj.color, size: $obj.size, quantity: $obj.quantity, unitPrice: $obj.unit_Price});
				$scope.myPurchases[$lastObj].totalAmount +=($obj.quantity*$obj.unit_Price);
			}else{				
				$obj = res[i];
				$lastObj = $scope.myPurchases.length;
				$scope.myPurchases[$lastObj] = {id:$obj.id, saleNumber: $obj.sale_Number, state: $obj.description, date: $obj.date, 
					totalAmount: ($obj.quantity*$obj.unit_Price),
					description:[{name: $obj.name, color: $obj.color, size: $obj.size, quantity: $obj.quantity, unitPrice: $obj.unit_Price}]};
			}
		}	
		//console.log($scope.myPurchases);
	};

	$scope.cancelPurchase = function (purchase) {
		AccountService.cancelPurchase(purchase)
			.then(function(res){
				AccountService.getAllPurchases($scope.user)
					.then(function(res){
					$scope.buildPurchase(res);
				});	
		})
	};

	$scope.sendAgain = function (purchase) {
		AccountService.sendAgain(purchase)
			.then(function(res){
				AccountService.getAllPurchases($scope.user)
					.then(function(res){
					$scope.buildPurchase(res);
				});
		})
	};

	$scope.allowNewSend = function(purchase){
		if(purchase.state === "RECHAZADO" && !$scope.user.blacklist){
			return true;
		}
		return false;
	}

	$scope.allowCancelPurchase = function (purchase) {
		if(purchase.state !== "SOLICITADO"){
			return true;
		}		
		return false;
	};

	$scope.openCreditCardModal = function () {
	    var modalInstance = $modal.open({
	      animation: true,
	      templateUrl: '../theme/credit-card-modal.html',
	      controller: 'CreditCardModal',
	      scope: $scope,
	      resolve: {
	        creditCard: function () {	       	
	        }
	      }
	    });
	    modalInstance.result.then(function(res) {
			$scope.myCreditCards = res;
	    });
    }
	
	$scope.editCreditCardModal = function (creditCard) {
	    var modalInstance = $modal.open({
	      	animation: true,
	      	templateUrl: '../theme/credit-card-modal.html',
	      	controller: 'EditModalCreditCardCtrl',
	      	scope: $scope,
	      	resolve: {
		        creditCard: function () {

		        	factoryData.data.id = creditCard.id;
		        	factoryData.data.number = creditCard.number;
		        	factoryData.data.bank = creditCard.bank;
		        	factoryData.data.card = creditCard.card;
		        	factoryData.data.name = creditCard.name;
		        	factoryData.data.cvv = creditCard.cvv;
		        	factoryData.data.expirationDate = creditCard.expirationDate;
		        }
		      }
	    	}); 
    	modalInstance.result.then(function(res) {
			$scope.myCreditCards = res;
	    });
	    }

	$scope.removeCreditCard = function (creditCard) {
			AccountService.removeCreditCard(creditCard, $scope.user)
				.then(function(res){
					console.log(res);
					$scope.myCreditCards = res;			
			})
		};

});

angular.module('LaMaceta').controller('AddressModalCtrl', function ($scope, $modalInstance, AccountService) {

	  $scope.save = function (address) {
		AccountService.saveAddress(address, $scope.user)
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
		AccountService.saveAddress(address, $scope.user)
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

angular.module('LaMaceta').controller('CreditCardModal', function ($scope, $modalInstance, AccountService, AdminService) {

	$scope.cards = [];
	$scope.banks = [];
	$scope.associatedCards = [];

	AdminService.getAllCards()
		.then(function(res){
		$scope.cards = res;
		//console.log(res);
		});

	AdminService.getAllBanks()
		.then(function(res){
		$scope.banks = res;
		//console.log(res);
		});

	$scope.getAssociatedCards = function(bank){
		AdminService.getAllAssociatedCards(bank)
		.then(function(res){
			//console.log(res);
			$scope.associatedCards = res;
		});
	}

	$scope.save = function (creditCard) {
		//console.log(creditCard);
		AccountService.saveCreditCard(creditCard, $scope.user)
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


angular.module('LaMaceta').controller('EditModalCreditCardCtrl', function ($scope, $modalInstance, AccountService, AdminService, factoryData) {


	var vencimiento = factoryData.data.expirationDate.date;
	var expDateYear = vencimiento.substring(2,4);
	var expDateMonth = vencimiento.substring(5,7);

	AdminService.getAllCards()
		.then(function(res){
		$scope.cards = res;
		//console.log(res);
		});

	AdminService.getAllBanks()
		.then(function(res){
		$scope.banks = res;
		//console.log(res);
		});

	$scope.getAssociatedCards = function(bank){
		AdminService.getAllAssociatedCards(bank)
		.then(function(res){
			//console.log(res);
			$scope.associatedCards = res;
		});
	}

	$scope.creditCard={id: factoryData.data.id, 
				number: factoryData.data.number,
				name: factoryData.data.name,
				cvv: factoryData.data.cvv,
				expirationDateYear: expDateYear,
				expirationDateMonth: expDateMonth};

  	$scope.save = function (creditCard) {
  		//console.log(creditCard);
		AccountService.saveCreditCard(creditCard, $scope.user)
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

//FILTRO PARA QUE SE VEA BIEN EL VENCIMIENTO DE LA TARJETA
angular.module('LaMaceta').filter('dateFilter', function($filter){
    return function(input)
    {
        if(input == null)
        	return "";
        return $filter('date')(new Date(input), 'MM/yy');
    };
});

//FILTRO PARA QUE SE VEA BIEN LA FECHA EN LA QUE SE REALIZO LA COMPRA
angular.module('LaMaceta').filter('dateFilter2', function($filter){
    return function(input)
    {
        if(input == null)
        	return "";
        return $filter('date')(new Date(input), 'dd/MM/yyyy');
    };
});