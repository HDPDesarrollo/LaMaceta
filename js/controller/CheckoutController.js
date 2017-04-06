angular.module("LaMaceta").factory("factoryData", function() {
  return {
    data: {}
  };
});

angular.module("LaMaceta")
	.controller("CheckoutController", function($scope, $modal, MailService, AccountService, AdminService, LoginService, factoryData, $cookies, $window, ShopItemService){

	$scope.user = $cookies.getObject("loginCredentials");
	console.log($scope.user);
	var loc = window.location.href;
	var dir = loc.substring(0, loc.lastIndexOf('/'));

	if($scope.user != null && $scope.user.blacklist){
		alert("SALGA DE LA BLACKLIST PRIMERO");
		$window.location.href = dir+"/my-account.html";
	}


    $scope.totalAmount = 0;
    $scope.shippingCost = {};
    $scope.promotion = 0;
    $scope.address = null;
    $scope.card = null;
    $scope.quota = "12";
	$scope.paymentMethod = null;
	$scope.allowCreditCard = false;
	$scope.allowSelectCreditCard = false;
	$scope.creditCardVto = false;
	$scope.emptyDataCreditCard = false;
	$scope.emptyDataAddress = false;
	$scope.oddCreditCard = false;
	$scope.zcode = null;
	$scope.CostPackaging = 0;
	$scope.method = 0;

	var users = [];

	$scope.cart  = $cookies.getObject("cookieCart");

	LoginService.getAllUsers()
		.then(function(res){
			users = res;
		});



	$scope.calcShippingCost = function(){
		$scope.shippingCost = 0;

			for (var k = 0; k < $scope.provinces.length; k++) {
				if($scope.address.idProvince.id == $scope.provinces[k].id){
					$scope.shippingCost = $scope.provinces[k].cost;
					break;
				}		
			}
	}

	$scope.getPromotions = function(idBankCard){
		$scope.promotion = 0
		ShopItemService.getPromotions(idBankCard)
			.then(function(res){
				if(res!=null && res.length>0 && res[0].percentage!='undefined' 
					&& res[0].percentage!=null && $scope.totalAmount!=null){
					$scope.promotion = ($scope.totalAmount*res[0].percentage/100);
				}
			});
	}

	$scope.calcTotalAmount = function(){
		$scope.totalAmount = 0;
		if($scope.articles!=null){
			for (var k = 0; k < $scope.articles.length; k++) {
				$article = $scope.articles[k];
				$scope.totalAmount = $scope.totalAmount+($article.price*$article.quantity);			
			}
		}

		if($scope.provinces!=null && $scope.address!=null && $scope.address.idProvince!=null){
			this.calcShippingCost();
		}

		if($scope.card != null && $scope.card.idBankCard!=null){
			this.getPromotions($scope.card.idBankCard.id);
		}

		$scope.CostPackaging = ( ($scope.totalAmount * 30) / 100);
	}

	$scope.loadPage = function(){

		AccountService.getAllProvinces()
		.then(function(res){
			$scope.provinces = res;
		});

		AccountService.getAllActiveAddresses($scope.user)
			.then(function(res){
				$scope.addresses = res;
				if($scope.addresses.length>0){
					$scope.address = $scope.addresses[0];

					AccountService.getAllProvinces()
					.then(function(res){
						$scope.provinces = res;

						$scope.shippingCost = 0;
						for (var k = 0; k < $scope.provinces.length; k++) {
							if($scope.address.idProvince.id == $scope.provinces[k].id){
								$scope.shippingCost = $scope.provinces[k].cost;
								break;
							}		
						}

					});
				}
			});


		if($scope.cart!=null){

			$scope.ids = [];
			for (var i = 0; i < $scope.cart.length; i++) {
				$obj = $scope.cart[i];
				$scope.ids.push($obj.id);
			}

			AdminService.getArticlesById($scope.ids)
				.then(function(res){
					$scope.articles = res;

					for (var i = 0; i < $scope.articles.length; i++) {
						$article = $scope.articles[i];
						for (var j = 0; j < $scope.articles.length; j++) {					
							$cart = $scope.cart[j];
							if($article.id == $cart.id){
								$article.quantity = $cart.quantity;								
								$scope.totalAmount = $scope.totalAmount+($article.price*$article.quantity);
									ShopItemService.getPicturesByProdId($article.idProd.id)
									.then(function(res){	
										for (var k = 0; k < res.length; k++) {							
											$article.img = res[k].rutaImg;
											break;
										}					
									});
							}
						}	
					}
				});
		}		
	
	}



	function lastValidateCheckout(){
		$scope.errorList = [];
		if($scope.articles!=null){
			for (var i = 0; i < $scope.articles.length; i++) {
				$article = $scope.articles[i];
				$scope.idArticle = null;
				ShopItemService.validateStockByArticle($article.idProd.id, 
						$article.idSize.id, 
						$article.idColor.id, $article.quantity)
					.then(function(res){				
					$scope.idArticle = res[0];//deberia ser solo uno
					if($scope.idArticle!=null && $scope.idArticle.ID==null){
						$scope.errorList.push($article.idProd.name);
					}

				});		
			}
		}		
	};
	
	function validateEmptyDataAddress(){
		console.log($scope.address);

		if( 
			$scope.address == null ||
			$scope.address.street == null ||
			$scope.address.number == null ||
			//$scope.address.apartment == null ||
			$scope.address.city == null ||
			$scope.address.zipCode == null ||
			$scope.address.idProvince == null ||
			//$scope.address.phone == null
			$scope.address.mobilePhone == null
		){
			$scope.emptyDataAddress = true;
		}else{
			$scope.emptyDataAddress = false;
		}
	}


	function Promise(){

	    var self = this;
	    var thenCallback = null;

	    self.then = function(callback){
	    	lastValidateCheckout();
	    	validateEmptyDataAddress();
	        thenCallback = callback;     
	    };

	    self.complete = function(args){
			thenCallback();
	    };
	};

	function myFunction(){		
	    var p = new Promise();
	    setTimeout(p.complete, 1000)	    
	    return p;
	}


	$scope.confirmCheckout = function(){
		var promise = myFunction()
		promise.then(function(res){
			if($scope.emptyDataAddress != true){
				if($scope.errorList.length>0){
				alert("No hay en stock para los productos: "+$scope.errorList);				
					}else{

						if($scope.method === 503045)
						{
							$scope.shipping = {
									"method" : $scope.shippingCost.agency.method_id,
									"cost" : $scope.shippingCost.agency.cost,
									"free_method" : null
								};
						}else if($scope.method === 73328){
							$scope.shipping = {
									"method" : $scope.shippingCost.address.method_id,
									"cost" : $scope.shippingCost.address.cost,
									"free_method" : null
								};
						}
						$checkout = {articles: $scope.articles, address: $scope.address, paymentMethod: $scope.paymentMethod, 
									idUser: $scope.user.id, shipping: $scope.shipping, promotion: $scope.promotion, quota: $scope.quota, 
									totalAmount: ($scope.totalAmount-$scope.promotion+$scope.shippingCost)};
				AccountService.confirmCheckout($checkout)
					.then(function(res){
						window.open(res);
						
						MailService.mailDetailCheckout(res)
							.then(function(res){
									console.log(res);		
									})

						for (var i = 0; i < $scope.articles.length; i++) {
							$scope.idArticleMail = $scope.articles[i].id;
							AccountService.checkMinStock($scope.idArticleMail)
								.then(function(res){
								console.log(res);							
								if(res!=false){
									MailService.mailMinStock(res)
										.then(function(res){
											console.log(res);		
									})
								}
							});			
						}

						$cookies.remove("cookieCart");
						alert("Compra realizada con exito!");
						var loc = window.location.href;
		   				var dir = loc.substring(0, loc.lastIndexOf('/'));
		   				var dir2 = loc.substring(0, dir.lastIndexOf('/'));
		    			$window.location.href = dir2+"/shop-index.html";
					});
				return;

					}
			}else{
				alert("Debe completar todos los campos obligatorios en Domicilio de Envio.");				
				}	
		});

	}


	$scope.cancelCheckout = function(){
		$scope.address = {};
		$cookies.remove("cookieCart");
	}


	$scope.tryLogin = function(login){
		for(i = 0; i < users.length; i++) {
			if(users[i].email==login.email && users[i].password==login.password){
				$cookies.putObject("loginCredentials", users[i]);

				$window.location.reload();//cambiar

				return "";
			}
		}

		alert("No existe ningún usuario con esa combinación de mail y contraseña");
	}


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
			alert("Registro Correcto!");
	    });
    }

	$scope.upQuantity = function(artId){
		for (var i = 0; i < $scope.articles.length; i++) {
			if($scope.articles[i].id == artId){
				$scope.articles[i].quantity = $scope.articles[i].quantity + 1;
			}
		}
		this.calcTotalAmount();
	};

	$scope.downQuantity = function(artId){
		for (var i = 0; i < $scope.articles.length; i++) {
			if($scope.articles[i].id == artId && $scope.articles[i].quantity>1){
				$scope.articles[i].quantity = $scope.articles[i].quantity - 1;
			}
		}
		this.calcTotalAmount();
	};
	


	$scope.checkToConfirm = function(){
		if($scope.address == null || $scope.user == null){
			this.calcTotalAmount();
			return true;
		}
		return false;
	}

	$scope.checkEnabledAddress = function(){
		if($scope.address != null && $scope.address.id != null){
			return true;
		}
		return false;
	}

	
	$scope.newAddress = function(){
		$scope.address = null;
	}


	$scope.getCostShipping = function(){
		$scope.shippingCost.agency = {};
		$scope.shippingCost.address = {};
		$scope.data = {};
		$scope.data.dimensions = "30x30x30,500";
		$scope.data.cp_from = 1835;
		$scope.data.cp_to = $scope.zcode;
		AccountService.GetCostShipping($scope.data)
		.then(function(res){
			if(angular.isDefined(res.destination)){
			$scope.shippingCost.agency.cost = res.options[0].cost;
			$scope.shippingCost.agency.method_id = res.options[0].shipping_method_id;
			$scope.shippingCost.address.cost = res.options[1].cost;
			$scope.shippingCost.address.method_id = res.options[1].shipping_method_id;
			$scope.shippingCost.msg = '<b>Costo del envio</b>'
                                          +'<div class="row">Retiro en Correo Argentino:'
                                          +'<span class="messages"><strong> $'+$scope.shippingCost.agency.cost+'</strong></span></div>'
                                          +'<div class="row">Normal a domicilio:'
                                          +'<span class="messages"><strong> $'+$scope.shippingCost.address.cost+'</strong></span></div>';
			}}, function(error){
				$scope.shippingCost.msg = '<span class="messages"><strong>Error inténtelo de nuevo! ('+error.data.message+')</strong></span';
			});

	};
});

angular.module('LaMaceta').controller('UserModalCtrl', function ($scope, $modalInstance, AdminService) {

  	$scope.save = function (user) {
		AdminService.saveUser(user)
			.then(function(res){	
				$modalInstance.close(res);
			}, function(error){
				 $modalInstance.close();////////
			})		    
	  	};

	$scope.cancel = function () {
	    $modalInstance.dismiss('cancel');
	};
});





