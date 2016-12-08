angular.module("LaMaceta")
	.controller("SubCtrlAdmin_EditProfile", function($window, $scope, AdminService, $modal, factoryData, NgTableParams, $cookies, Upload){

	$scope.user = $cookies.getObject("loginCredentials");
	$scope.user.birthDate = new Date($scope.user.birthDate.date);

	$scope.today = new Date();

	var dia = new Date();
    dia.setFullYear(1998);

    $scope.hace18 = dia;
   // console.log($scope.hace18);

    $scope.updateProfile = function (user) {
		AdminService.updateProfile(user)
			.then(function(res){
				//console.log(res);
				$cookies.putObject("loginCredentials", res);
				$scope.user = res;
				$scope.user.birthDate = new Date($scope.user.birthDate.date);
				alert("Usuario actualizado correctamente!");
				$scope.user.passwordConfirm = $scope.user.password;
		})
	};
});

