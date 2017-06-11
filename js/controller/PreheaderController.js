// angular.module('LaMaceta')
	app.controller("PreheaderController", function($window, $scope, $cookies,$auth){
		
	console.info($auth.getToken());
		$scope.loginVar = $auth.getPayload();
		console.log($scope.loginVar);

	
	// var loc = window.location.href;
	// var dir = loc.substring(0, loc.lastIndexOf('/'));
	$scope.logOut = function(){
		$cookies.remove("cookieCart");
		$cookies.remove("loginCredentials");
		$window.location.href = dir+"/shop-index.html";
	}

});