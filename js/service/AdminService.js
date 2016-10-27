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

    this.getAllUserTypes = function(){
      return $http.post('../bd/AdminBd.php', {data: {action:'getAllUserTypes'}})
                    .then(function(response) {
                    //console.log( response.data);   
                    return response.data;          
                      },function errorCallback(response) {        
                          console.log( response);           
                      });
    };

   this.saveUser = function(user){
      return user.id ? updateUser(user) : createUser(user);
    };

    var createUser = function(user){  
      return $http.post('../bd/AdminBd.php', {data: {user: user, action:'createUser'}})
            .then(function(response) {      
                return response.data;    
            },function errorCallback(response) {        
                console.log(response);           
            });
    };

    var updateUser = function(user){
      return $http.post('../bd/AdminBd.php', {data: {user: user, action:'updateUser'}})
            .then(function(response) {    
                 return response.data;    
            },function errorCallback(response) {        
                console.log(response);           
            });
    };

    this.removeUser = function(user){
      return $http.post('../bd/AdminBd.php', {data: {user: user, action:'removeUser'}})
            .then(function(response) { 
              //console.log(response);   
                 return response.data;    
            },function errorCallback(response) {        
                console.log(response);           
            });
    };

    this.updateUserType = function(user){
      return $http.post('../bd/AdminBd.php', {data: {user: user, action:'updateUserType'}})
            .then(function(response) { 
              //console.log(response);   
                 return response.data;    
            },function errorCallback(response) {        
                console.log(response);           
            });
    };

    this.getAllArticles = function(){
      return $http.post('../bd/AdminBd.php', {data: {action:'getAllArticles'}})
                    .then(function(response) {
                    //console.log( response.data);   
                    return response.data;          
                      },function errorCallback(response) {        
                          console.log( response);           
                      });
    };

    this.getAllColors = function(){
      return $http.post('../bd/AdminBd.php', {data: {action:'getAllColors'}})
                    .then(function(response) {
                    //console.log( response.data);   
                    return response.data;          
                      },function errorCallback(response) {        
                          console.log( response);           
                      });
    };

    this.getAllSizes = function(){
      return $http.post('../bd/AdminBd.php', {data: {action:'getAllSizes'}})
                    .then(function(response) {
                    //console.log( response.data);   
                    return response.data;          
                      },function errorCallback(response) {        
                          console.log( response);           
                      });
    };
  
  /*dsaaaaaaa*/
});		