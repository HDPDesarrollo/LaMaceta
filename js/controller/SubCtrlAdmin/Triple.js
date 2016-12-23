//Ver si se queda lo de prmotions lo otro se va

angular.module("LaMaceta")
	.controller("SubCtrlAdmin_Triple", function($window, $scope, AdminService, $modal, factoryData, NgTableParams, $cookies, Upload){

	$scope.promotions = [];
	$scope.cards = [];
	$scope.banks = [];
	$scope.associatedCards = [];
	
	$scope.checkErr = function(startDate,endDate) {
        if(new Date(startDate) > new Date(endDate))
		    return true;
	    return false;
    };

	AdminService.getAllPromotions()
		.then(function(res){
			$scope.promotions = res;
			//console.log($scope.promotions);
		});

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

    $scope.openPromotionModal = function () {
	    var modalInstance = $modal.open({
	      animation: true,
	      templateUrl: '../theme/promotion-modal.html',
	      controller: 'PromotionModalCtrl',
	      scope: $scope,
	      resolve: {
	      	promotion: function(){}
	      }

	    }).result.then(function(res) {
	    	$scope.promotions = res;
	    });
    }

    $scope.editPromotionModal = function (promotion) {
	    var modalInstance = $modal.open({
	      	animation: true,
	      	templateUrl: '../theme/promotion-modal.html',
	      	controller: 'EditPromotionModalCtrl',
	      	scope: $scope,
	      	resolve: {
		        promotion: function () {
		        	//ver si se pueden usar los getters
		        	
		        	factoryData.data.id = promotion.id;
		        	factoryData.data.bank = promotion.idBankCard.idBank;
		        	factoryData.data.card = promotion.idBankCard.idCard;
		        	factoryData.data.dateFrom = promotion.dateFrom;
		        	factoryData.data.dateTo = promotion.dateTo;
		        	factoryData.data.sunday = promotion.sunday; 
		        	factoryData.data.monday = promotion.monday; 
		        	factoryData.data.tuesday = promotion.tuesday; 
		        	factoryData.data.wednesday = promotion.wednesday; 
		        	factoryData.data.thursday = promotion.thursday; 
		        	factoryData.data.friday = promotion.friday; 
		        	factoryData.data.saturday = promotion.saturday;
		        	factoryData.data.percentage = promotion.percentage;
		        }
		      }
	    	}); 
    	modalInstance.result.then(function(res) {
    		console.log(res);
			$scope.promotions = res;
	    	});
	    }

	$scope.removePromotion = function (promotion) {
		AdminService.removePromotion(promotion)
			.then(function(res){
				$scope.promotions = res;			
		});
	};

    $scope.openCardModal = function () {
	    var modalInstance = $modal.open({
	      animation: true,
	      templateUrl: '../theme/card-modal.html',
	      controller: 'CardModalCtrl',
	      //scope: $scope,
	      resolve: {}

	    }).result.then(function(res) {
	    	$scope.cards = res;
	    });
    }

    $scope.editCardModal = function (card) {
	    var modalInstance = $modal.open({
	      	animation: true,
	      	templateUrl: '../theme/card-modal.html',
	      	controller: 'EditCardModalCtrl',
	      	scope: $scope,
	      	resolve: {
		        card: function () {
		        	//ver si se pueden usar los getters
		        	
		        	factoryData.data.id = card.id;
		        	factoryData.data.name = card.name;
		        }
		      }
	    	}); 
    	modalInstance.result.then(function(res) {
			$scope.cards = res;
	    	});
	    }
	    
	$scope.removeCard = function (card) {
		AdminService.removeCard(card)
			.then(function(res){
				$scope.cards = res;			
		});
	};

    $scope.openBankModal = function () {
	    var modalInstance = $modal.open({
	      animation: true,
	      templateUrl: '../theme/bank-modal.html',
	      controller: 'BankModalCtrl',
	      //scope: $scope,
	      resolve: {}

	    }).result.then(function(res) {
	    	$scope.banks = res;
	    });
    }

    $scope.editBankModal = function (bank) {
	    var modalInstance = $modal.open({
	      	animation: true,
	      	templateUrl: '../theme/bank-modal.html',
	      	controller: 'EditBankModalCtrl',
	      	scope: $scope,
	      	resolve: {
	      		bank: function () {
		        	//ver si se pueden usar los getters
		        	factoryData.data.id = bank.id;
		        	factoryData.data.name = bank.name;
		        	}
	      		}
	    	}); 
    	modalInstance.result.then(function(res) {
			$scope.banks = res;
	    	});
	    }
	    
	$scope.removeBank = function (bank) {
		AdminService.removeBank(bank)
			.then(function(res){
				$scope.banks = res;			
		});
	};
    
});

angular.module('LaMaceta').controller('PromotionModalCtrl', function ($scope, $modalInstance, AdminService) {

	$scope.today = new Date();

	$scope.getAssociatedCards = function(bank){
		AdminService.getAllAssociatedCards(bank)
		.then(function(res){
			//console.log(res);
			$scope.associatedCards = res;
		});
	}

	$scope.checkErr = function(startDate,endDate) {
        
        if(new Date(startDate) > new Date(endDate))
		    return true;
	    return false;
    };

    $scope.checkWeekDays =  function() {
        
    	if($scope.promotion.sunday)
   			return true;
   		if($scope.promotion.monday)
   			return true;
   		if($scope.promotion.tuesday)
   			return true;
   		if($scope.promotion.wednesday)
   			return true;
   		if($scope.promotion.thursday)
   			return true;
   		if($scope.promotion.friday)
   			return true;
   		if($scope.promotion.saturday)
   			return true;
   		return false;
    };

	$scope.setStartDate = function(dateFrom) {
		$scope.startDate = dateFrom;
    };

	$scope.save = function (promotion) {
		console.log(promotion);
		AdminService.savePromotion(promotion)
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

angular.module('LaMaceta').controller('EditPromotionModalCtrl', function ($scope, $modalInstance, AdminService, factoryData) {

	$scope.today = new Date();

	$scope.getAssociatedCards = function(bank){
		AdminService.getAllAssociatedCards(bank)
		.then(function(res){
			$scope.associatedCards = res;
		});
	}

	$scope.checkErr = function(startDate,endDate) {
        
        if(new Date(startDate) > new Date(endDate))
		    return true;
	    return false;
    };

	$scope.setStartDate = function(dateFrom) {
		$scope.startDate = dateFrom;
    };

    $scope.checkWeekDays =  function() {
        
    	if($scope.promotion.sunday)
   			return true;
   		if($scope.promotion.monday)
   			return true;
   		if($scope.promotion.tuesday)
   			return true;
   		if($scope.promotion.wednesday)
   			return true;
   		if($scope.promotion.thursday)
   			return true;
   		if($scope.promotion.friday)
   			return true;
   		if($scope.promotion.saturday)
   			return true;
   		return false;
    };

	var stringDateFrom = factoryData.data.dateFrom.date.substr(0,10);
	var dateDateFrom = new Date(stringDateFrom);
	var stringDateTo = factoryData.data.dateTo.date.substr(0,10);
	var dateDateTo = new Date(stringDateTo);

	console.log(factoryData.data.card);

	$scope.promotion = {id: factoryData.data.id,
						dateFrom: dateDateFrom,
						dateTo: dateDateTo,
						sunday: factoryData.data.sunday,
						monday: factoryData.data.monday,
						tuesday: factoryData.data.tuesday,
						wednesday: factoryData.data.wednesday,
						thursday: factoryData.data.thursday,
						friday: factoryData.data.friday,
						saturday: factoryData.data.saturday,
						percentage: factoryData.data.percentage}

  	$scope.save = function (promotion) {
  		console.log(promotion);
		AdminService.savePromotion(promotion)
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

angular.module('LaMaceta').controller('CardModalCtrl', function ($scope, $modalInstance, AdminService) {
	$scope.save = function (card) {
		AdminService.saveCard(card)
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

angular.module('LaMaceta').controller('EditCardModalCtrl', function ($scope, $modalInstance, AdminService, factoryData) {

	$scope.card={id: factoryData.data.id, 
				name: factoryData.data.name};

				//console.log($scope.address);

  	$scope.save = function (card) {
		AdminService.saveCard(card)
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

angular.module('LaMaceta').controller('BankModalCtrl', function ($scope, $modalInstance, AdminService) {
	$scope.showCards = false;

	AdminService.getAllCards()
		.then(function(res){
		$scope.cards = res;
		$scope.associatedCards = [];
		//console.log(res);
		});


	$scope.save = function (bank,associatedCards) {
		AdminService.saveBank(bank)
			.then(function(res){
				$modalInstance.close(res);
			},function(error){
				 $modalInstance.close();////////
			})
	}; 
			

	$scope.cancel = function () {
	    $modalInstance.dismiss('cancel');
	};
});

angular.module('LaMaceta').controller('EditBankModalCtrl', function ($scope, $modalInstance, AdminService, factoryData) {

	$scope.showCards = true;

	$scope.bank={id: factoryData.data.id, 
				name: factoryData.data.name};

	$scope.associatedCards = [];
	
	AdminService.getAllAssociatedCards($scope.bank)
		.then(function(res){
		for (var item in res) {
		    $scope.associatedCards.push(res[item].idCard);
		}
		});

  	$scope.save = function (bank,associatedCards) {
		AdminService.saveBank(bank)
			.then(function(res){
				$modalInstance.close(res);
			},function(error){
				 $modalInstance.close();////////
			})

		AdminService.manageBankCards(bank,associatedCards)
			.then(function(res){
				//$modalInstance.close(res);
			},function(error){
				 $modalInstance.close();////////
			})
	};

  	$scope.cancel = function () {
	    $modalInstance.dismiss('cancel');
  }; 

});