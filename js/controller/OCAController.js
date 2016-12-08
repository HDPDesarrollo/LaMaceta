angular.module('LaMaceta')
	.controller('OCAController',function($scope,OCAService){

	$scope.selectedTab = "sales";

	$scope.selectTab = function (tab) {
		$scope.selectedTab=tab;
	}

	$scope.motive = "No existe domicilio";

	$scope.sales = [];

	OCAService.getAllSales()
		.then(function(res){
			$scope.sales = res;
			console.log(res);
	});  
	
	$scope.esperar = 0;

	$scope.editSale = function (sale, newState, motive) {

		$scope.esperar = 1;
		OCAService.editSale(sale, newState, motive)
		.then(function(res){
			$scope.esperar = 0;
			$scope.refresh();
			alert("Información enviada");
		});
	}

	$scope.refresh = function(){
		OCAService.getAllSales()
		.then(function(res){
			$scope.sales = res;
			//console.log(res);
		});  
	}

});