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
	.controller("LoginController", function($window, $scope, LoginService, $cookies){

	var dia = new Date();
    dia.setFullYear(1998);

    $scope.hace18 = dia;

	$scope.selectedTab = "login";

	var loc = window.location.href;
	var dir = loc.substring(0, loc.lastIndexOf('/'));


	$scope.selectTab = function (tab) {
		$scope.selectedTab=tab;
	}

	var users = [];
	var resets = [];

	LoginService.getAllUsers()
		.then(function(res){
			users = res;
			//console.log(res);  
		});

	LoginService.getAllResets()
		.then(function(res){
			resets = res;
			//console.log(res);  
		});


	$scope.tryRegister = function(register){
		console.log(register);
		var flag = 0;
		for(i = 0; i < users.length; i++) {
			if(users[i].email==register.email){
				$scope.selectedTab="tryLoginInstead";
				$scope.tryLoginInsteadLegend = "Ya hay un usuario registrado con ese e-mail.";
				$scope.register = "";
				flag = 1;
				break;
			}
		}

		if(flag==0){
			LoginService.saveUser(register)
				.then(function(res){
					//console.log(res);
					$scope.selectedTab = "tryLoginInstead";
					$scope.tryLoginInsteadLegend = "Bienvenido, ¿desea logearse?";
					users = res;
				}, function(error){
					//console.log(error);
				})	
		}
	}

	/*$scope.tryLogin = function(login){
		for(i = 0; i < users.length; i++) {
			if(users[i].email==login.email && users[i].password==login.password){
				$cookies.putObject("loginCredentials", users[i]);
				$window.location.href = dir+"/shop-index.html";
				return "";
			}
		}

		$scope.selectedTab="tryLoginInstead";
		$scope.tryLoginInsteadLegend = "No existe ningún usuario con esa combinación de mail y contraseña";
	}*/

	$scope.tryLogin = function(user){
		//user.password = md5.createHash(user.password);
		
		if(LoginService.doLogin(user)){
			$cookies.putObject("loginCredentials", user);
				$window.location.href = dir+"/shop-index.html";
				return true;
		}else{
			$scope.selectedTab="tryLoginInstead";
			$scope.tryLoginInsteadLegend = "No existe ningún usuario con esa combinación de mail y contraseña";
		}
	}

	$scope.resetPassword = function(email){
		var flag = 0;

		for(i = 0; i < users.length; i++) {
			if(users[i].email==email){
				console.log("si existe");
				LoginService.resetPassword(users[i])
					.then(function(res){
						console.log(res);
						alert("revise su mail");
					}, function(error){
						//console.log(error);
					})	
				flag = 1;
				break;
			}
		}

		if(flag==0){
			alert("Ese email no está registrado en nuestra base de datos");
		}
		console.log(email);
	}

	$scope.getParametersFromLink = function(variable) {
	   var query = window.location.search.substring(1);
	   var vars = query.split("&");
	   for (var i=0; i < vars.length; i++) {
	       var pair = vars[i].split("=");
	       if(pair[0] == variable) {
	           return pair[1];
	       }
	   }
	   return false;
	}

	$scope.verifyToken = function(){
		var theToken = $scope.getParametersFromLink("token");

		for(i = 0; i < resets.length; i++) {
			if(resets[i].token==theToken){
				return true;
			}
		}
		return false;
	}

	$scope.doTheReset = function(password){
		var theToken = $scope.getParametersFromLink("token");

		LoginService.doTheReset(password,theToken)
			.then(function(res){
						//console.log(res);
						alert("Contraseña cambiada satisfactoriamente");
						$window.location.href = dir+"/page-login.html";
					}, function(error){
						//console.log(error);
					});
	}
});