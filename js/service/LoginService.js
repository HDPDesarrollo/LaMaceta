angular.module("LaMaceta")
  .service("LoginService", function($http){

    this.getAllUsers = function(){
      return $http.post('../bd/LoginBd.php', {data: {action:'getAllUsers'}})
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
      return $http.post('../bd/LoginBd.php', {data: {user: user, action:'createUser'}})
            .then(function(response) {      
                return response.data;    
            },function errorCallback(response) {        
                console.log(response);           
            });
    };

    var updateUser = function(user){
      return $http.post('../bd/LoginBd.php', {data: {user: user, action:'updateUser'}})
            .then(function(response) {    
                 return response.data;    
            },function errorCallback(response) {        
                console.log(response);           
            });
    };

    this.removeUser = function(user){
      return $http.post('../bd/LoginBd.php', {data: {user: user, action:'removeUser'}})
            .then(function(response) { 
              //console.log(response);   
                 return response.data;    
            },function errorCallback(response) {        
                console.log(response);           
            });
    };

    this.updateUserType = function(user){
      return $http.post('../bd/LoginBd.php', {data: {user: user, action:'updateUserType'}})
            .then(function(response) { 
              //console.log(response);   
                 return response.data;    
            },function errorCallback(response) {        
                console.log(response);           
            });
    };

    this.resetPassword = function(user){
      return $http.post('../bd/LoginBd.php', {data: {user: user, action:'resetPassword'}})
                    .then(function(response) {
                    //console.log( response.data);   
                    return response.data;          
                      },function errorCallback(response) {        
                          console.log( response);           
                      });
    };

    this.verifyToken = function(token){
      return $http.post('../bd/LoginBd.php', {data: {token: token, action:'verifyToken'}})
                    .then(function(response) {
                    //console.log( response.data);   
                    return response.data;          
                      },function errorCallback(response) {        
                          console.log( response);           
                      });
    }

    this.doTheReset = function(password, token){
      return $http.post('../bd/LoginBd.php', {data: {password: password, token: token, action:'doTheReset'}})
                    .then(function(response) {
                    //console.log( response.data);   
                    return response.data;          
                      },function errorCallback(response) {        
                          console.log( response);           
                      });
    };

    this.doLogin = function(userLogin){
      return $http.post('../bd/LoginBd.php',{data:{email: userLogin.email, password: userLogin.password, action:'doLogin'}})
                  .then(function(response){
                    return response.data;
                  },function errorCallback(response){
                    console.log( response);
                  });
    };

    this.verifyEmail = function(email){
      console.log(email);
      return $http.post('../bd/LoginBd.php',{data:{email: email, action:'verifyEmail'}})
                  .then(function(response){
                    //console.log(response);
                    return response.data;
                  },function errorCallback(response){
                    console.log( response);
                  });
    };


});		