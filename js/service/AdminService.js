angular.module("LaMaceta")
  .service("AdminService", function($http){

    this.getAllProviders = function(){
      return $http.post('../bd/AdminBd.php', {data: {action:'getAllProviders'}})
                    .then(function(response) {  
                      //console.log(response.data); 
                      return response.data;          
                      },function errorCallback(response) {        
                          console.log( response);           
                      });
    };

    this.saveProvider = function(provider){
      return provider.id ? updateProvider(provider) : createProvider(provider);
    };

    var createProvider = function(provider){  
      return $http.post('../bd/AdminBd.php', {data: {provider: provider, action:'createProvider'}})
            .then(function(response) {      
                return response.data;    
            },function errorCallback(response) {        
                console.log(response);           
            });
    };

    var updateProvider = function(provider){
      return $http.post('../bd/AdminBd.php', {data: {provider: provider, action:'updateProvider'}})
            .then(function(response) {    
                 return response.data;    
            },function errorCallback(response) {        
                console.log(response);           
            });
    };

    this.removeProvider = function(provider){
      return $http.post('../bd/AdminBd.php', {data: {provider: provider, action:'deleteProvider'}})
            .then(function(response) { 
              //console.log(response);   
                 return response.data;    
            },function errorCallback(response) {        
                console.log(response);           
            });
    };

    this.getAllSeasons = function(){
      return $http.post('../bd/AdminBd.php', {data: {action:'getAllSeasons'}})
                    .then(function(response) {  
                      //console.log(response.data); 
                      return response.data;          
                      },function errorCallback(response) {        
                          console.log( response);           
                      });
    };

    this.getProductById = function(productId){
      return $http.post('../bd/AdminBd.php', {data: {productId:productId, action:'getProductById'}})
                    .then(function(response) {  
                      //console.log(response.data); 
                      return response.data;          
                      },function errorCallback(response) {        
                          console.log( response);           
                      });
    };
    this.getAllProducts = function(){
      return $http.post('../bd/AdminBd.php', {data: {action:'getAllProducts'}})
                    .then(function(response) {  
                      //console.log(response.data); 
                      return response.data;          
                      },function errorCallback(response) {        
                          console.log( response);           
                      });
    };

    this.generateReport = function(report){
      return $http.post('../bd/generateReport.php', {data: {report: report}})
                    .then(function(response) {  
                      //console.log(response.data); 
                      return response.data;          
                      },function errorCallback(response) {        
                          console.log( response);           
                      });
    };

    this.updateProfile = function(user){
      return $http.post('../bd/AdminBd.php', {data: {user: user, action:'updateProfile'}})
                    .then(function(response) {  
                      //console.log(response); 
                    return response.data;          
                      },function errorCallback(response) {        
                          console.log( response);           
                      });
    };

     this.getProductImages = function(product){
      return $http.post('../bd/AdminBd.php', {data: {product: product, action:'getProductImages'}})
                    .then(function(response) {
                    //console.log( response.data);   
                    return response.data;          
                      },function errorCallback(response) {        
                          console.log( response);           
                      });
    };

    this.getSliderImages = function(slider){
      return $http.post('../bd/AdminBd.php', {data: {slider: slider, action:'getSliderImages'}})
                    .then(function(response) {
                    //console.log( response.data);   
                    return response.data;          
                      },function errorCallback(response) {        
                          console.log( response);           
                      });
    };

    this.deleteImages = function(images){
      return $http.post('../bd/AdminBd.php', {data: {images: images, action:'deleteImages'}})
                    .then(function(response) {
                    //console.log( response.data);   
                    return response.data;          
                      },function errorCallback(response) {        
                          console.log( response);           
                      });
    };

    this.deleteImagesForProducts = function(images, idProd){
      return $http.post('../bd/AdminBd.php', {data: {images: images, idProd: idProd, action:'deleteImagesForProducts'}})
                    .then(function(response) {
                    //console.log( response.data);   
                    return response.data;          
                      },function errorCallback(response) {        
                          console.log( response);           
                      });
    };

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

    this.getAllSales = function(){
      return $http.post('../bd/AdminBd.php', {data: {action:'getAllSales'}})
                    .then(function(response) {
                    //console.log(response.data);   
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

    this.removeBlacklist = function(user){
      return $http.post('../bd/AdminBd.php', {data: {user: user, action:'removeBlacklist'}})
            .then(function(response) {    
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
                   //console.log( response);   
                    return response.data;          
                      },function errorCallback(response) {        
                          console.log(response);           
                      });
    };

    this.getArticlesById = function(ids){
      return $http.post('../bd/AdminBd.php', {data: {ids: ids, action:'getArticlesById'}})
                    .then(function(response) {
                   //console.log( response);   
                    return response.data;          
                      },function errorCallback(response) {        
                          console.log( response);           
                      });
    };

   this.saveProduct = function(product){
      return product.id ? updateProduct(product) : createProduct(product);
    };

    var createProduct = function(product){  
      return $http.post('../bd/AdminBd.php', {data: {product: product, action:'createProduct'}})
            .then(function(response) { 
                      console.log(response.data);   
                     return $http.post('../bd/AdminBd.php', {data: {action:'getAllArticles'}})
                    .then(function(response) {
                        //console.log(response);
                        return response.data;          
                      },function errorCallback(response) {        
                          console.log( response);           
                      });           
            },function errorCallback(response) {        
                console.log(response);           
            });
    };

    this.saveArticles = function(articles, idProd){  
      return $http.post('../bd/AdminBd.php', {data: {articles: articles, idProd: idProd, action:'saveArticles'}})
            .then(function(response) { 
            console.log(response.data);   
                  return $http.post('../bd/AdminBd.php', {data: {action:'getAllArticles'}})
                    .then(function(response) {                        
                        return response.data;          
                      },function errorCallback(response) {        
                          console.log( response);           
                      });          
            },function errorCallback(response) {        
                console.log(response);           
            });
    }; 

    var updateProduct = function(product){
      return $http.post('../bd/AdminBd.php', {data: {product: product, action:'updateProduct'}})
            .then(function(response) {    
                  return $http.post('../bd/AdminBd.php', {data: {action:'getAllArticles'}})
                      .then(function(response) {                        
                          return response.data;          
                        },function errorCallback(response) {        
                            console.log( response);           
                        }); 
            },function errorCallback(response) {        
                console.log(response);           
            });
    };

    this.removeProduct = function(product){
      return $http.post('../bd/AdminBd.php', {data: {product: product, action:'removeProduct'}})
            .then(function(response) { 
                // console.log(product);
                // console.log(response);
                  return $http.post('../bd/AdminBd.php', {data: {action:'getAllArticles'}})
                      .then(function(response) {                        
                          return response.data;          
                        },function errorCallback(response) {        
                            console.log( response);           
                        });             
            },function errorCallback(response) {        
                console.log(response);           
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

    this.saveColor = function(color){
      return color.id ? updateColor(color) : createColor(color);
    };

    var createColor = function(color){  
      return $http.post('../bd/AdminBd.php', {data: {color: color, action:'createColor'}})
            .then(function(response) {
                console.log(response.data);    
                return response.data;
            },function errorCallback(response) {        
                console.log(response);           
            });
    };

    var updateColor = function(color){
      return $http.post('../bd/AdminBd.php', {data: {color: color, action:'updateColor'}})
            .then(function(response) {
                //console.log(response.data);
                return response.data;    
            },function errorCallback(response) {        
                console.log(response);           
            });
    };

    this.removeColor = function(color){
      return $http.post('../bd/AdminBd.php', {data: {color: color, action:'deleteColor'}})
                    .then(function(response) {  ;
                    return response.data;          
                      },function errorCallback(response) {        
                          console.log( response);           
                      });
    };

    this.getSizesByProvider = function(idProvider){
      return $http.post('../bd/AdminBd.php', {data: {idProvider: idProvider, action:'getSizesByProvider'}})
                    .then(function(response) {  
                    return response.data;          
                      },function errorCallback(response) {        
                          console.log( response);           
                      });
    };

    this.saveSizes = function(sizes){  
      return $http.post('../bd/AdminBd.php', {data: {sizes: sizes, action:'saveSizes'}})
            .then(function(response) {
                console.log(response.data);    
                return response.data;
            },function errorCallback(response) {        
                console.log(response);           
            });
    }; 

    this.getAllProvinces = function(){
      return $http.post('../bd/AdminBd.php', {data: {action:'getAllProvinces'}})
                    .then(function(response) { 
                    return response.data;          
                      },function errorCallback(response) {        
                          console.log( response);           
                      });
    };

    this.saveProvince = function(province){
      return province.id ? updateProvince(province) : createProvince(province);
    };

    var createProvince = function(province){  
      return $http.post('../bd/AdminBd.php', {data: {province: province, action:'createProvince'}})
            .then(function(response) {
                //console.log(response.data);    
                return response.data;    
            },function errorCallback(response) {        
                console.log(response);           
            });
    };

    var updateProvince = function(province){
      return $http.post('../bd/AdminBd.php', {data: {province: province, action:'updateProvince'}})
            .then(function(response) {
                //console.log(response.data);
                return response.data;    
            },function errorCallback(response) {        
                console.log(response);           
            });
    };

    this.removeProvince = function(province){
      return $http.post('../bd/AdminBd.php', {data: {province: province, action:'deleteProvince'}})
                    .then(function(response) {  ;
                    return response.data;          
                      },function errorCallback(response) {        
                          console.log( response);           
                      });
    };
    
    this.getAllPromotions = function(){
      return $http.post('../bd/AdminBd.php', {data: {action:'getAllPromotions'}})
                    .then(function(response) { 
                    return response.data;          
                      },function errorCallback(response) {        
                          console.log( response);           
                      });
    };

    this.savePromotion = function(promotion){
      return promotion.id ? updatePromotion(promotion) : createPromotion(promotion);
    };

    var createPromotion = function(promotion){  
      return $http.post('../bd/AdminBd.php', {data: {promotion: promotion, action:'createPromotion'}})
            .then(function(response) {
                //console.log(response.data);    
                return response.data;    
            },function errorCallback(response) {        
                console.log(response);           
            });
    };

    var updatePromotion = function(promotion){
      return $http.post('../bd/AdminBd.php', {data: {promotion: promotion, action:'updatePromotion'}})
            .then(function(response) {
                //console.log(response.data);
                return response.data;    
            },function errorCallback(response) {        
                console.log(response);           
            });
    };

    this.removePromotion = function(promotion){
      return $http.post('../bd/AdminBd.php', {data: {promotion: promotion, action:'deletePromotion'}})
                    .then(function(response) {  ;
                    return response.data;          
                      },function errorCallback(response) {        
                          console.log( response);           
                      });
    };

    this.getAllCards = function(){
      return $http.post('../bd/AdminBd.php', {data: {action:'getAllCards'}})
                    .then(function(response) {
                    //console.log( response.data);   
                    return response.data;          
                      },function errorCallback(response) {        
                          console.log( response);           
                      });
    };

    this.saveCard = function(card){
      return card.id ? updateCard(card) : createCard(card);
    };

    var createCard = function(card){  
      return $http.post('../bd/AdminBd.php', {data: {card: card, action:'createCard'}})
            .then(function(response) {
                //console.log(response.data);    
                return response.data;    
            },function errorCallback(response) {        
                console.log(response);           
            });
    };

    var updateCard = function(card){
      return $http.post('../bd/AdminBd.php', {data: {card: card, action:'updateCard'}})
            .then(function(response) {
                //console.log(response.data);
                return response.data;    
            },function errorCallback(response) {        
                console.log(response);           
            });
    };

    this.removeCard = function(card){
      return $http.post('../bd/AdminBd.php', {data: {card: card, action:'deleteCard'}})
            .then(function(response) {  ;
            return response.data;          
              },function errorCallback(response) {        
                  console.log( response);           
              });
    };

    this.getAllBanks = function(){
      return $http.post('../bd/AdminBd.php', {data: {action:'getAllBanks'}})
                    .then(function(response) {
                    //console.log( response.data);   
                    return response.data;          
                      },function errorCallback(response) {        
                          console.log( response);           
                      });
    };

    this.saveBank = function(bank){
      return bank.id ? updateBank(bank) : createBank(bank);
    };

    var createBank = function(bank){  
      return $http.post('../bd/AdminBd.php', {data: {bank: bank, action:'createBank'}})
            .then(function(response) {
                //console.log(response.data);    
                return response.data;    
            },function errorCallback(response) {        
                console.log(response);           
            });
    };

    var updateBank = function(bank){
      return $http.post('../bd/AdminBd.php', {data: {bank: bank, action:'updateBank'}})
            .then(function(response) {
                //console.log(response.data);
                return response.data;    
            },function errorCallback(response) {        
                console.log(response);           
            });
    };

    this.removeBank = function(bank){
      return $http.post('../bd/AdminBd.php', {data: {bank: bank, action:'deleteBank'}})
            .then(function(response) {  ;
            return response.data;          
              },function errorCallback(response) {        
                  console.log( response);           
              });
    };

    this.getAllAssociatedCards = function(bank){
      return $http.post('../bd/AdminBd.php', {data: {bank: bank, action:'getAllAssociatedCards'}})
              .then(function(response) {
              //console.log( response.data);   
              return response.data;          
                },function errorCallback(response) {        
                    console.log( response);           
                });
    };

    this.manageBankCards = function(bank,associatedCards){
      return $http.post('../bd/AdminBd.php', {data: {bank: bank, associatedCards: associatedCards, action:'manageBankCards'}})
            .then(function(response) {
                console.log(response.data);    
                return response.data;    
            },function errorCallback(response) {        
                console.log(response);           
            });
    };

    this.getDetailSaleBySaleNumber = function(saleNumber){
      return $http.post('../bd/AdminBd.php', {data: {saleNumber: saleNumber, action:'getDetailSaleBySaleNumber'}})
            .then(function(response) {
                //console.log(response.data);    
                return response.data;    
            },function errorCallback(response) {        
                console.log(response);           
            });
    };

    this.getAllSaleStates = function(saleNumber){
      return $http.post('../bd/AdminBd.php', {data: {action:'getAllSaleStates'}})
            .then(function(response) {
                //console.log(response.data);    
                return response.data;    
            },function errorCallback(response) {        
                console.log(response);           
            });
    };

    this.changeState = function(saleNumber, state){
      return $http.post('../bd/AdminBd.php', {data: {saleNumber: saleNumber, state: state, action:'changeState'}})
            .then(function(response) {
                //console.log(response.data);    
                return response.data;    
            },function errorCallback(response) {        
                console.log(response);           
            });
    };

    this.getAllProductDiscounts = function(){  
      return $http.post('../bd/AdminBd.php', {data: {action:'getAllProductDiscounts'}})
            .then(function(response) {      
              //console.log(response);
                return response.data;    
            },function errorCallback(response) {        
                console.log(response);           
            });
    };

    this.getAllDiscounts = function(){  
      return $http.post('../bd/AdminBd.php', {data: {action:'getAllDiscounts'}})
            .then(function(response) {      
              //console.log(response);
                return response.data;    
            },function errorCallback(response) {        
                console.log(response);           
            });
    };


    this.saveDiscount = function(discount){  
      return $http.post('../bd/AdminBd.php', {data: {discount: discount, action:'saveDiscount'}})
            .then(function(response) {      
             // console.log(response);
                return response.data;    
            },function errorCallback(response) {        
                console.log(response);           
            });
    };

    this.changeStatusPercentage = function(discount, status){  
      console.log(discount);
      return $http.post('../bd/AdminBd.php', {data: {discount: discount, status: status, action:'changeStatusPercentage'}})
            .then(function(response) {      
              console.log(response);
                return response.data;    
            },function errorCallback(response) {        
                console.log(response);           
            });
    };   

    this.changeStatusProductDiscount = function(prodId, status){  
      return $http.post('../bd/AdminBd.php', {data: {prodId: prodId, status: status, action:'changeStatusProductDiscount'}})
            .then(function(response) {      
              console.log(response.data);
                return response.data;    
            },function errorCallback(response) {        
                console.log(response);           
            });
    };     

    this.changePercentageProductDiscount = function(prodId, percentage){  
      return $http.post('../bd/AdminBd.php', {data: {prodId: prodId, percentage: percentage, action:'changePercentageProductDiscount'}})
            .then(function(response) {      
              console.log(response.data);
                return response.data;    
            },function errorCallback(response) {        
                console.log(response);           
            });
    };  

});		