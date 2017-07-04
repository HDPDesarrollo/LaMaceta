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

// angular.module("LaMaceta")
	app.controller("LoginController", function($window, $scope, LoginService, $cookies, $auth,$location,md5){

	var dia = new Date();
    dia.setFullYear(1998);

    $scope.hace18 = dia;

	$scope.selectedTab = "login";

	var loc = window.location.href;
	var dir = loc.substring(0, loc.lastIndexOf('/'));

	$scope.errorLogin = false;
	$scope.errorEmail = false;

	$scope.selectTab = function (tab) {
		$scope.selectedTab=tab;
	}
	$scope.reset = [];
	


	$scope.tryRegister = function(register){
		register.password = md5.createHash(register.password);
		LoginService.verifyEmail(register.email)
			.then(function(res){
				console.log(res);
				if(res){
					$scope.selectedTab = "tryLoginInstead";
					$scope.tryLoginInsteadLegend = "Error Email ya existe!";
			}else{
				LoginService.saveUser(register)
				.then(function(res){
					//console.log(res);
					$scope.selectedTab = "tryLoginInstead";
					$scope.tryLoginInsteadLegend = "Bienvenido, ¿desea logearse?";
					
				}, function(error){
					//console.log(error);
				})
			}
			});	
		
	}



	$scope.tryLogin = function(user){
		user.password = md5.createHash(user.password);
		console.log(md5.createHash(user.password));
		   $auth.login({data:{email: user.email, password: user.password, action:'doLogin'}})
			  .then(function(respuestaAuth){				   
							  if ($auth.isAuthenticated()) {
									//   $state.go('menu');
									$window.location.href = "shop-index.html";
									errorLogin = false;
							  }else{
									$scope.errorLogin = true;
									console.log($scope.errorLogin);
									//   $state.go('login');
									}
					//        console.info("datos_auth_en_menu", $auth.isAuthenticated(),$auth.getPayload());
							$scope.DatoTest="**Menu**";
			  })
			  .catch(function(parametro){
				console.info("error",JSON.stringify(parametro));
			  }); // fin catch


		// if(LoginService.doLogin(user)){
		// 	$cookies.putObject("loginCredentials", user);
		// 		$window.location.href = dir+"/shop-index.html";
		// 		return true;		
		// }else{
		// 	$scope.selectedTab="tryLoginInstead";
		// 	$scope.tryLoginInsteadLegend = "No existe ningún usuario con esa combinación de mail y contraseña";
		// }
	}

	$scope.resetPassword = function(email){

			LoginService.resetPassword(email)
				.then(function(res){
					console.log(res);
					if(res == true){
					alert("revise su mail");
					$scope.errorEmail = false;
					}else{
						$scope.errorEmail = true;
					}
				}, function(error){
					//console.log(error);
				})	
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

		LoginService.verifyToken(theToken)
		.then(function(res){
			if(res == true){
				return true;
			}else{
				return false;
			} 
		});
	}

	$scope.doTheReset = function(password){
		var theToken = $scope.getParametersFromLink("token");
		passwordcrypt = md5.createHash(password);
		LoginService.doTheReset(passwordcrypt,theToken)
			.then(function(res){
				if(res == true){
					alert("Contraseña cambiada satisfactoriamente");
					$window.location.href = dir+"/page-login.html";

					}else{
						alert("Token invalido.");
						$window.location.href = "shop-index.html";
					}
					}, function(error){
						//console.log(error);
					});
	}
});





// // angular.module('LaMaceta')
// 	app.controller("PreheaderController", function($window, $scope, $cookies,$auth){
		
// 	console.info($auth.getPayload());
// 		$scope.loginVar = $auth.getPayload();
// 		console.log($scope.loginVar);

	
// 	// var loc = window.location.href;
// 	// var dir = loc.substring(0, loc.lastIndexOf('/'));
// 	$scope.logOut = function(){
// 		$cookies.remove("cookieCart");
// 		$cookies.remove("loginCredentials");
// 		$window.location.href = dir+"/shop-index.html";
// 	}

// });