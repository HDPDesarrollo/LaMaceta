//Ver q no sirve

angular.module("LaMaceta")
.factory("factoryData", function() {
  return {
    data: {}
  };
});

angular.module("LaMaceta")
	.controller("SubCtrlAdmin_User", function($window, $scope, AdminService, $modal, factoryData, $cookies){

	$scope.users = [];
	$scope.userTypes = [];

	$scope.user = $cookies.getObject("loginCredentials");
	$scope.user.birthDate = new Date($scope.user.birthDate.date);
	$scope.selectedTab = "sales";

	$scope.selectTab = function (tab) {
		$scope.selectedTab=tab;
	}

    $scope.updateProfile = function (user) {
		AdminService.updateProfile(user)
			.then(function(res){
				console.log(res);
				$cookies.putObject("loginCredentials", res);
				$scope.user = res;
				$scope.user.birthDate = $scope.user.birthDate.date;
				alert("Usuario actualizado correctamente!");
		})
	};

	$scope.checkErr = function(startDate,endDate) {
        if(new Date(startDate) > new Date(endDate))
		    return true;
	    return false;
    };

	AdminService.getAllUsers()
		.then(function(res){
			$scope.users = res; 
		});

	AdminService.getAllUserTypes()
		.then(function(res){
			$scope.userTypes = res;
		});

	$scope.openUserModal = function (user) {
	    var modalInstance = $modal.open({
	      animation: true,
	      templateUrl: '../theme/user-modal.html',
	      controller: 'UserModalCtrl',
	      scope: $scope,
	      resolve: {
	        users: function () {	       	
	        }
	      }
	    });
	    modalInstance.result.then(function(res) {
			$scope.users = res;
	    });
    }

	$scope.openEditUser = function (user) {
	    var modalInstance = $modal.open({
	      animation: true,
	      templateUrl: '../theme/user-modal.html',
	      controller: 'EditUserModalCtrl',
	      scope: $scope,
	      resolve: {
	        users: function () {	 

		        	factoryData.data.id = user.id;
		        	factoryData.data.name = user.name;
		        	factoryData.data.surname = user.surname;
		        	factoryData.data.email = user.email;
		        	factoryData.data.password = user.password;
		        	factoryData.data.birthDate = user.birthDate;
		        	factoryData.data.gender = user.gender;
		        	factoryData.data.idUserType = user.idUserType;     	
	        }
	      }
	    });
	    modalInstance.result.then(function(res) {	    	
			$scope.users = res;
	    });
    }

	$scope.removeUser = function (user) {
		AdminService.removeUser(user)
			.then(function(res){
				$scope.users = res;
			});
    }

    $scope.removeBlacklist = function (user) {
		AdminService.removeBlacklist(user)
			.then(function(res){
				$scope.users = res;
			});
    }
    
	$scope.openEditUserTypeModal = function (user) {
	    var modalInstance = $modal.open({
	      animation: true,
	      templateUrl: '../theme/edit-usertype-modal.html',
	      controller: 'EditUserTypeModalCtrl',
	      scope: $scope,
	      resolve: {
	        users: function () {	 

	        	factoryData.data.id = user.id;
	        	factoryData.data.idUserType = user.idUserType;   
	        }
	      }

	    });
    	modalInstance.result.then(function(res) {	    	
			$scope.users = res;
	    });
    }
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


angular.module('LaMaceta').controller('UserModalCtrl', function ($scope, $modalInstance, AdminService) {

	var dia = new Date();
	dia.setFullYear(1998);

	$scope.hace18 = dia;
	console.log($scope.hace18);

	$scope.user={id: "", 
				name: "",
				surname: "",
				email: "",
				password: "",
				birthdate: "",
				gender: "",
				idUserType: ""};

	  $scope.save = function (user) {

		AdminService.saveUser(user)
			.then(function(res){	
				console.log(res);
				$modalInstance.close(res);
			}, function(error){
				 $modalInstance.close();
			})		    
	  	};

	$scope.cancel = function () {
	    $modalInstance.dismiss('cancel');
	};
});

angular.module('LaMaceta').controller('EditUserModalCtrl', function ($scope, $modalInstance, factoryData, AdminService) {

	$scope.user={id: factoryData.data.id, 
				name: factoryData.data.name,
				surname: factoryData.data.surname,
				email: factoryData.data.email,
				password: factoryData.data.password,
				birthDate: factoryData.data.birthDate,
				gender: factoryData.data.gender,
				idUserType: factoryData.data.idUserType};

	$scope.user.birthDate = new Date($scope.user.birthDate.date);

  	$scope.save = function (user) {
		AdminService.saveUser(user)
			.then(function(res){	
				$modalInstance.close(res);
			}, function(error){
				 $modalInstance.close();
			})		    
	  	};

  $scope.cancel = function () {
	    $modalInstance.dismiss('cancel');
  };

});

angular.module('LaMaceta').controller('EditUserTypeModalCtrl', function ($scope, $modalInstance, factoryData, AdminService) {

	$scope.user={id: factoryData.data.id, 
				idUserType: factoryData.data.idUserType};

  	$scope.save = function (user) {
	AdminService.updateUserType(user)
		.then(function(res){	
			$modalInstance.close(res);
		}, function(error){
			 $modalInstance.close();
		})		    
  	};

	  $scope.cancel = function () {
	    $modalInstance.dismiss('cancel');
  	};

});