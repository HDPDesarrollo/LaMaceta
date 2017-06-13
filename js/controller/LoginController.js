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
		register.password = md5.createHash(register.password);
		LoginSerivice.verifyEmail(register.email)
			.then(function(res){
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
									$window.location.href = "shop-index.html"
							  }else{
									 console.log("datos_auth_en_menu", $auth.isAuthenticated(),$auth.getPayload());
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