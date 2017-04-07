angular.module('LaMaceta')
	.controller("PreheaderController", function($window, $scope, $cookies){

	$scope.loginVar = $cookies.getObject("loginCredentials");
	
	var loc = window.location.href;
	var dir = loc.substring(0, loc.lastIndexOf('/'));
	$scope.logOut = function(){
		$cookies.remove("cookieCart");
		$cookies.remove("loginCredentials");
		$window.location.href = dir+"/shop-index.html";
	}

});