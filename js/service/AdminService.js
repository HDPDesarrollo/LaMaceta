angular.module("LaMaceta")
	.service("AdminService", function($http){

    this.getAllUsers = function(){
      return $http.post('../bd/AdminBd.php', {data: {action:'getAllUsers'}})
                    .then(function(response) {
                    //console.log( response.data);   
                    return response.data;          
                      },function errorCallback(response) {        
                          console.log( response);           
                      });
    };


});		