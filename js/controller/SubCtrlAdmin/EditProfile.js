//ver que se pueda editar todo

angular.module("LaMaceta")
	.controller("SubCtrlAdmin_EditProfile", function($window, $scope, AdminService, $cookies,$auth){

	if(!$auth.isAuthenticated()){
		$window.location.href = dir+"/page-login.html";
	}
	$scope.user = $auth.getPayload();
	$scope.user.birthDate = new Date($scope.user.birthDate.date);

	$scope.today = new Date();

	var dia = new Date();
    dia.setFullYear(1998);

    $scope.hace18 = dia;

    $scope.updateProfile = function (user) {
		AdminService.updateProfile(user)
			.then(function(res){
				$cookies.putObject("loginCredentials", res);
				$scope.user = res;
				$scope.user.birthDate = new Date($scope.user.birthDate.date);
				alert("Usuario actualizado correctamente!");
				$scope.user.passwordConfirm = $scope.user.password;
		})
	};
});

