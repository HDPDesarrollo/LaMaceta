var app = angular.module('contactApp', []);



app.controller('ContactController', function ($scope, $http) {
    
      $scope.Name = "";
      $scope.Email = "";
      $scope.Subject = "";
      $scope.Message = "";    
      $scope.resultMessage = "aa"; 
      $scope.formData = {};
      $scope.formData.inputName    = "bb";
      $scope.formData.inputEmail   = "a@b";
      $scope.formData.inputSubject = "cc";
      $scope.formData.inputMessage = "dd";

      $scope.enviar = function(){
                    $http.post("php/contact-form.php", { data:{
                                                            name:$scope.formData.inputName,
                                                            email:$scope.formData.inputEmail,
                                                            asunto:$scope.formData.inputSubject,
                                                            mensaje:$scope.formData.inputMessage
                                                             } 
                               })
                          .then(function(respuesta) {       
                               //aca se ejetuca si retorno sin errores        
                               console.log(respuesta.data);
                               alert(respuesta.data.message);
                                // $scope.Name = respuesta.data.data.name;
                                // $scope.Email = respuesta.data.data.email;
                                // $scope.Subject = respuesta.data.data.asunto;
                                // $scope.Message = respuesta.data.data.mensaje;
                               //resultMessage = respuesta.data; 

                          },function errorCallback(respuesta) {        
                              //aca se ejecuta cuando hay errores
                              console.log(respuesta);         
                              //resultMessage = respuesta;  
                          });
      }; // FIN FUNCION "ENVIAR"





});