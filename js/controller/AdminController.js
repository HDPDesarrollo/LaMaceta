angular.module("LaMaceta")
.factory("factoryData", function() {
  return {
    data: {}
  };
});

angular.module("LaMaceta")
.directive("passwordVerify", function() {
   return {
      require: "ngModel",
      scope: {
        passwordVerify: '='
      },
      link: function(scope, element, attrs, ctrl) {
        scope.$watch(function() {
            var combined;

            if (scope.passwordVerify || ctrl.$viewValue) {
               combined = scope.passwordVerify + '_' + ctrl.$viewValue; 
            }                    
            return combined;
        }, function(value) {
            if (value) {
                ctrl.$parsers.unshift(function(viewValue) {
                    var origin = scope.passwordVerify;
                    if (origin !== viewValue) {
                        ctrl.$setValidity("passwordVerify", false);
                        return undefined;
                    } else {
                        ctrl.$setValidity("passwordVerify", true);
                        return viewValue;
                    }
                });
            }
        });
     }
   };
});


angular.module("LaMaceta")
	.controller("AdminController", function($window, $scope, AdminService, $modal, factoryData, NgTableParams, $cookies, Upload){

    var dia = new Date();
    dia.setFullYear(1998);

    $scope.hace18 = dia;

    $scope.today = new Date();

    var loc = window.location.href;
    var dir = loc.substring(0, loc.lastIndexOf('/'));

    if($cookies.getObject("loginCredentials") == undefined){
        $window.location.href = dir+"/page-login.html";
    }
        
	$scope.user = $cookies.getObject("loginCredentials");
	$scope.user.birthDate = new Date($scope.user.birthDate.date);

    if($scope.user.idUserType.type=="CLIENTE"){
        $window.location.href = dir+"/shop-index.html";
    }

	$scope.selectedTab = "configureDiscounts";

	$scope.selectTab = function (tab) {
		$scope.selectedTab=tab;
	}

	$scope.checkErr = function(startDate,endDate) {
        if(new Date(startDate) > new Date(endDate))
		    return true;
	    return false;
    };
});

angular.module('LaMaceta').filter('dateFilter', function($filter){
    return function(input)
    {
        if(input == null)
        	return "";
        return $filter('date')(new Date(input), 'dd/MM/yyyy');
    };
});

angular.module('LaMaceta').filter('weekDaysFilter', function($filter){
    return function(input)
    {
        var stringDays = "";
        if(input.sunday)
        	stringDays += "Domingo ";
        if(input.monday)
        	stringDays += "Lunes ";
        if(input.tuesday)
        	stringDays += "Martes ";
        if(input.wednesday)
        	stringDays += "Miercoles ";
        if(input.thursday)
        	stringDays += "Jueves ";
        if(input.friday)
        	stringDays += "Viernes ";
        if(input.saturday)
        	stringDays += "Sabado ";
        return stringDays;
    };
});
