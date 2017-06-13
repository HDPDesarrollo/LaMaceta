// angular.module('LaMaceta')
	app.controller("PreheaderController", function($window, $scope, $cookies,$auth){
		
		if($auth.isAuthenticated()){
		$scope.loginVar = $auth.getPayload();
		}
	

	
	// var loc = window.location.href;
	// var dir = loc.substring(0, loc.lastIndexOf('/'));
	$scope.logOut = function(){
		$auth.logout();
		$window.location.href = "./shop-index.html";
	}

});