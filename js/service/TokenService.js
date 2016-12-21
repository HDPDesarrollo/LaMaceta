angular.module('LaMaceta')
  .service('TokenService', function ($http) {

      this.getIfUserExists = function () {
          return $http.post('../bd/TokenBD.php', { data: { action: 'getIfUserExists' } })
                        .then(function (response) {
                            //console.log(response.data); 
                            return response.data;
                        }, function errorCallback(response) {
                            console.log(response);
                        });
      };

  });