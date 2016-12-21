<?php

include __DIR__ ."../../doctrine_config/doctrine-cfg.php";
include __DIR__ . '../../entities/User.php';
include __DIR__ . '../../entities/UserType.php';
include __DIR__ . '../../entities/Article.php';
include __DIR__ . '../../entities/Color.php';
include __DIR__ . '../../entities/Product.php';
include __DIR__ . '../../entities/Picture.php';


include __DIR__ . '../../entities/BlacklistDetail.php';
include __DIR__ . '../../entities/Provider.php';

include __DIR__ . '../../entities/Promotion.php';
include __DIR__ . '../../entities/Province.php';
include __DIR__ . '../../entities/Sale.php';

include __DIR__ . '../../entities/Season.php';
include __DIR__ . '../../entities/SaleState.php';
include __DIR__ . '../../entities/State.php';
include __DIR__ . '../../entities/Size.php';
include __DIR__ . '../../entities/CreditCard.php';
include __DIR__ . '../../entities/Bank.php';
include __DIR__ . '../../entities/Card.php';
include __DIR__ . '../../entities/BankCard.php';
include __DIR__ . '../../entities/Address.php';

include __DIR__ . '../../entities/ProductDiscount.php';
include __DIR__ . '../../entities/Discount.php';

$dataPost = file_get_contents("php://input");
$request = json_decode($dataPost);


switch($request->data->action){

	case 'removeBlacklist':

		$blacklistSales = $entityManager->getRepository('BlacklistDetail')->findBy(array('idUser' => $request->data->user->id));

		foreach ($blacklistSales as $item) {
			$item->setActive(false);
			$entityManager->merge($item);
		}

		$user = $entityManager->find('User', $request->data->user->id);
		if($user->blacklist){
			$user = $user->setBlacklist(false);
		}else{
			$user = $user->setBlacklist(true);
		}		
		
		$entityManager->merge($user);
		$entityManager->flush();

		$users =  $entityManager->getRepository("User")->findAll();
		echo(json_encode($users));

		break;

	case 'getAllProducts':
		$products =  $entityManager->getRepository("Product")->findAll();
		//var_dump($products);

		echo(json_encode($products));
		break;

	case 'updateProfile':
		$newUser = new User();
		$newUser->setId($request->data->user->id);
		$newUser->setActive(true);
		$newUser->setEmail($request->data->user->email);
		$newUser->setPassword($request->data->user->password);
		$newUser->setBirthDate(new DateTime($request->data->user->birthDate));
		$newUser->setGender($request->data->user->gender);

		$userType= $entityManager->find('UserType', $request->data->user->idUserType->id);
		$newUser->setIdUserType($userType);
		
		$newUser->setName($request->data->user->name);
		$newUser->setSurname($request->data->user->surname);

		$entityManager->merge($newUser);
		$entityManager->flush();

		$user= $entityManager->find('User', $request->data->user->id);
		echo(json_encode($user));
		break;

	case 'getAllUsers':
		$users =  $entityManager->getRepository("User")->findAll();
		//var_dump($addresses);

		echo(json_encode($users));
		break;

	case 'getAllSeasons':
		$seasons =  $entityManager->getRepository("Season")->findAll();
		//var_dump($addresses);

		echo(json_encode($seasons));
		break;
	case 'getAllUserTypes':
		$userTypes =  $entityManager->getRepository("UserType")->findAll();
		//var_dump($addresses);

		echo(json_encode($userTypes));
		break;

	case 'createUser':
		$newUser = new User();
		$newUser->setActive(true);
		$newUser->setBlacklist(false);
		$newUser->setEmail($request->data->user->email);
		$newUser->setPassword($request->data->user->password);
		$newUser->setBirthDate(new DateTime());//$request->data->user->birthDate
		$newUser->setGender($request->data->user->gender);
		$newUser->setName($request->data->user->name);
		$newUser->setSurname($request->data->user->surname);
		
		$userType= $entityManager->find('UserType', 1);
		$newUser->setIdUserType($userType);

		$entityManager->persist($newUser);
		$entityManager->flush();

		$users =  $entityManager->getRepository("User")->findAll();
		echo(json_encode($users));
		break;

	case 'updateUser':
		$newUser = new User();
		$newUser->setId($request->data->user->id);
		$newUser->setActive(true);
		$newUser->setEmail($request->data->user->email);
		$newUser->setPassword($request->data->user->password);
		$newUser->setBirthDate(new DateTime());//$request->data->user->birthDate
		$newUser->setGender($request->data->user->gender);

		$userType= $entityManager->find('UserType', $request->data->user->idUserType->id);
		$newUser->setIdUserType($userType);
		
		$newUser->setName($request->data->user->name);
		$newUser->setSurname($request->data->user->surname);

		$entityManager->merge($newUser);
		$entityManager->flush();

		$users =  $entityManager->getRepository("User")->findAll();
		echo(json_encode($users));
		break;

	case 'removeUser':
		$user= $entityManager->find('User', $request->data->user->id);


		if($user->active){
			$user->setActive(false);
		}else{
			$user->setActive(true);
		}	

		$entityManager->merge($user);
		$entityManager->flush();

		$users =  $entityManager->getRepository("User")->findAll();
		echo(json_encode($users));
		break;

	case 'updateUserType':
		$user= $entityManager->find('User', $request->data->user->id);

		$userType= $entityManager->find('UserType', $request->data->user->idUserType->id);
		$user->setIdUserType($userType);

		$entityManager->merge($user);
		$entityManager->flush();

		$users =  $entityManager->getRepository("User")->findAll();
		echo(json_encode($users));
		break;

	//Articles
	case 'getAllArticles': 
		$connection = $entityManager->getConnection();
		$statement = $connection->prepare('SELECT 
				p.id, 
				p.name, 
				p.description, 
				p.active as prodActive, 
				c.id as idColor, 
				s.id as idSize, 
				a.sku, 
				a.active, 
				(CAST(a.stock AS SIGNED)) as stock,
				(CAST(a.min_Stock AS SIGNED)) as minStock,
				a.price as price,
				c.color, 
				s.size, 
				a.id as idArt
					FROM Product p 
					LEFT JOIN Article a ON a.id_prod = p.id
					LEFT JOIN Color c ON a.id_Color = c.id
					LEFT JOIN Size s ON a.id_Size = s.id');
		$statement->execute();

		$articles = $statement->fetchAll();

		echo(json_encode($articles));
		break;

	case 'getArticlesById': 
		$articles = $entityManager->getRepository('Article')->findBy(array('id' => $request->data->ids));
		echo(json_encode($articles));
		break;

	case 'getProductById': 
		$theProduct= $entityManager->find('Product', $request->data->productId);
		echo(json_encode($theProduct));
		break;

	case 'createProduct'://And Discount percentage = 0 active = false
		$newProduct = new Product();
		$newProduct->setActive(true);
		$newProduct->setName($request->data->product->name);
		$newProduct->setDescription($request->data->product->description);
		
		$newProduct->setProdType($request->data->product->prodType);

		$season= $entityManager->find('Season', $request->data->product->season->id);
		$newProduct->setIdSeason($season);

		$provider= $entityManager->find('Provider', $request->data->product->provider->id);
		$newProduct->setIdProvider($provider);

		$newProduct->setTarget($request->data->product->target);
		$entityManager->persist($newProduct);
		$entityManager->flush();



		$discount = $entityManager->getRepository('Discount')->findOneBy(array('percentage' => 0));
		//echo(var_dump($discount));
		if(!isset($discount)){
			$discount = new Discount();
			$discount->setActive(true);
			$discount->setPercentage(0);

			$entityManager->persist($discount);
			$entityManager->flush();
		}		

			$productDiscount = new ProductDiscount();
			$productDiscount->setActive(false);
			$productDiscount->setIdProduct($newProduct);
			$productDiscount->setIdDiscount($discount);

			$entityManager->persist($productDiscount);
			$entityManager->flush();

		break;

	case 'updateProduct':

		$newProduct= $entityManager->find('Product', $request->data->product->id);
		$newProduct->setActive(true);
		$newProduct->setName($request->data->product->name);
		$newProduct->setDescription($request->data->product->description);

		$newProduct->setProdType($request->data->product->prodType);

		$season= $entityManager->find('Season', $request->data->product->season->id);
		$newProduct->setIdSeason($season);

		$provider= $entityManager->find('Provider', $request->data->product->provider->id);
		$newProduct->setIdProvider($provider);

		$newProduct->setTarget($request->data->product->target);

		$entityManager->merge($newProduct);
		$entityManager->flush();
		break;

	case 'removeProduct':
		$newProduct= $entityManager->find('Product', $request->data->product->id);
		
		if($newProduct->active){
			$newProduct->setActive(false);
		}else{	
			$newProduct->setActive(true);
		}	


		$entityManager->merge($newProduct);
		$entityManager->flush();
		break;


	case 'saveArticles':
	
		foreach($request->data->articles as $article) {
			
			if(isset($article->id)){
				$articleToPersist = $entityManager->find('Article', $article->id);
			}else{
				$articleToPersist = new Article();	
				$articleToPersist->setOldPrice();
				$articleToPersist->setSku($request->data->idProd+rand(1,8000));
			}
		
			$prod = $entityManager->find('Product', $request->data->idProd);
			$articleToPersist->setIdProd($prod);

			$color = $entityManager->find('Color', $article->color->id);
			$articleToPersist->setIdColor($color);

			$size = $entityManager->find('Size', $article->size->id);
			$articleToPersist->setIdSize($size);

			$articleToPersist->setActive($article->active->id);

			$articleToPersist->setStock($article->stock);
			$articleToPersist->setMinStock($article->minStock);
			$articleToPersist->setPrice($article->price);
			
    		$entityManager->persist($articleToPersist);
			$entityManager->flush();
		}
		break;



	case 'getAllColors':
		$colors =  $entityManager->getRepository("Color")->findAll();
		//var_dump($addresses);

		echo(json_encode($colors));
		break;

	case 'createColor':
		$newColor = new Color();
		$newColor->setActive(true);
		$newColor->setColor($request->data->color->color);
		$newColor->setRgb($request->data->color->rgb);

		$entityManager->persist($newColor);
		$entityManager->flush();

		$colors =  $entityManager->getRepository("Color")->findAll();
		echo(json_encode($colors));
		break;

	case 'updateColor':
		$newColor = $entityManager->find('Color', $request->data->color->id);
		$newColor->setActive(true);
		$newColor->setColor($request->data->color->color);
		$newColor->setRgb($request->data->color->rgb);

		$entityManager->merge($newColor);
		$entityManager->flush();

		$colors =  $entityManager->getRepository("Color")->findAll();
		echo(json_encode($colors));
		break;

	case 'deleteColor':
		$colorToDelete = $request->data->color;
		$color= $entityManager->find('Color', $colorToDelete->id);
		$color->setActive(false);
		$entityManager->merge($color);
		$entityManager->flush();

		$colors =  $entityManager->getRepository("Color")->findAll();
		echo(json_encode($colors));
		break;

	case 'getAllProviders':
		$providers =  $entityManager->getRepository("Provider")->findAll();
		//var_dump($addresses);

		echo(json_encode($providers));
		break;

	case 'createProvider':
		$newProvider = new Provider();
		$newProvider->setActive(true);
		$newProvider->setName($request->data->provider->name);
		$newProvider->setEmail($request->data->provider->email);
		$newProvider->setAddress($request->data->provider->address);

		$entityManager->persist($newProvider);
		$entityManager->flush();

		$providers = $entityManager->getRepository("Provider")->findAll();
		echo(json_encode($providers));
		break;

	case 'updateProvider':
		$newProvider = $entityManager->find('Provider', $request->data->provider->id);
		$newProvider->setActive(true);
		$newProvider->setName($request->data->provider->name);
		$newProvider->setEmail($request->data->provider->email);
		$newProvider->setAddress($request->data->provider->address);

		$entityManager->merge($newProvider);
		$entityManager->flush();

		$providers = $entityManager->getRepository("Provider")->findAll();
		echo(json_encode($providers));
		break;

	case 'deleteProvider':
		$providerToDelete = $request->data->provider;
		$provider= $entityManager->find('Provider', $providerToDelete->id);
		$provider->setActive(false);
		$entityManager->merge($provider);
		$entityManager->flush();

		$providers =  $entityManager->getRepository("Provider")->findAll();
		echo(json_encode($providers));
		break;

	case 'getAllSizes':
		$sizes =  $entityManager->getRepository("Size")->findAll();
		//var_dump($addresses);

		echo(json_encode($sizes));
		break;

	case 'createSize':
		$newSize = new Size();
		$newSize->setActive(true);
		$newSize->setSize($request->data->size->size);
		$newSize->setLarge($request->data->size->large);

		$entityManager->persist($newSize);
		$entityManager->flush();

		$sizes =  $entityManager->getRepository("Size")->findAll();
		echo(json_encode($sizes));
		break;

	case 'updateSize':
		$newSize = $entityManager->find('Size', $request->data->size->id);
		$newSize->setActive(true);
		$newSize->setSize($request->data->size->size);
		$newSize->setLarge($request->data->size->large);

		$entityManager->merge($newSize);
		$entityManager->flush();

		$sizes =  $entityManager->getRepository("Size")->findAll();
		echo(json_encode($sizes));
		break;

	case 'deleteSize':
		$sizeToDelete = $request->data->size;
		$size = $entityManager->find('Size', $sizeToDelete->id);
		$size->setActive(false);
		$entityManager->merge($size);
		$entityManager->flush();

		$sizes =  $entityManager->getRepository("Size")->findAll();
		echo(json_encode($sizes));
		break;

	case 'getAllProvinces':
		$provinces =  $entityManager->getRepository("Province")->findAll();
		echo(json_encode($provinces));
		break;

	case 'createProvince':
		$newProvince = new Province();
		$newProvince->setActive(true);
		$newProvince->setName($request->data->province->name);
		$newProvince->setCost($request->data->province->cost);

		$entityManager->persist($newProvince);
		$entityManager->flush();

		$provinces =  $entityManager->getRepository("Province")->findAll();
		echo(json_encode($provinces));
		break;

	case 'updateProvince':
		$newProvince = $entityManager->find('Province', $request->data->province->id);
		$newProvince->setActive(true);
		$newProvince->setName($request->data->province->name);
		$newProvince->setCost($request->data->province->cost);

		$entityManager->merge($newProvince);
		$entityManager->flush();

		$provinces =  $entityManager->getRepository("Province")->findAll();
		echo(json_encode($provinces));
		break;

	case 'deleteProvince':
		$provinceToDelete = $request->data->province;
		$province= $entityManager->find('Province', $provinceToDelete->id);
		$province->setActive(false);
		$entityManager->merge($province);
		$entityManager->flush();

		$provinces =  $entityManager->getRepository("Province")->findAll();
		echo(json_encode($provinces));
		break;

	case 'getAllPromotions':
		$promotions =  $entityManager->getRepository("Promotion")->findAll();
		//var_dump($addresses);

		echo(json_encode($promotions));
		break;

	case 'createPromotion':
		
		$newPromotion = new Promotion();
		$newPromotion->setActive(true);
		$newPromotion->setPercentage($request->data->promotion->percentage);
		
		$auxDateFrom = substr($request->data->promotion->dateFrom,0,10);
		$dateFrom = DateTime::createFromFormat('Y-m-d', $auxDateFrom);
		$newPromotion->setDateFrom($dateFrom);

		$auxDateTo = substr($request->data->promotion->dateTo,0,10);
		$dateTo = DateTime::createFromFormat('Y-m-d', $auxDateTo);
		$newPromotion->setDateTo($dateTo);
		
		$bankCard =  $entityManager->getRepository("BankCard")->findOneBy(array("idBank" => $request->data->promotion->bank->id, "idCard" => $request->data->promotion->card->id));
		$newPromotion->setIdBankCard($bankCard);

		if(isset($request->data->promotion->sunday)){
			$newPromotion->setSunday(true); 
		}else{
			$newPromotion->setSunday(false);
		}
		if(isset($request->data->promotion->monday)){
			$newPromotion->setMonday(true);
		}else{
			$newPromotion->setMonday(false);
		}
		if(isset($request->data->promotion->tuesday)){
			$newPromotion->setTuesday(true);
		}else{
			$newPromotion->setTuesday(false);
		}
		if(isset($request->data->promotion->wednesday)){
			$newPromotion->setWednesday(true);
		}else{
			$newPromotion->setWednesday(false);
		}
		if(isset($request->data->promotion->thursday)){
			$newPromotion->setThursday(true);
		}else{
			$newPromotion->setThursday(false);
		}
		if(isset($request->data->promotion->friday)){
			$newPromotion->setFriday(true);
		}else{
			$newPromotion->setFriday(false);
		}
		if(isset($request->data->promotion->saturday)){
			$newPromotion->setSaturday(true);
		}else{
			$newPromotion->setSaturday(false);
		}
		$entityManager->persist($newPromotion);
		$entityManager->flush();
		
		$promotions =  $entityManager->getRepository("Promotion")->findAll();
		echo(json_encode($promotions));
		break;

	case 'updatePromotion':
		$newPromotion = $entityManager->find('Promotion', $request->data->promotion->id);
		$newPromotion->setActive(true);
		$newPromotion->setPercentage($request->data->promotion->percentage);
		
		$auxDateFrom = substr($request->data->promotion->dateFrom,0,10);
		$dateFrom = DateTime::createFromFormat('Y-m-d', $auxDateFrom);
		$newPromotion->setDateFrom($dateFrom);

		$auxDateTo = substr($request->data->promotion->dateTo,0,10);
		$dateTo = DateTime::createFromFormat('Y-m-d', $auxDateTo);
		$newPromotion->setDateTo($dateTo);

		$bankCard =  $entityManager->getRepository("BankCard")->findOneBy(array("idBank" => $request->data->promotion->bank->id, "idCard" => $request->data->promotion->card->id));
		$newPromotion->setIdBankCard($bankCard);

		$newPromotion->setSunday($request->data->promotion->sunday);
		$newPromotion->setMonday($request->data->promotion->monday);
		$newPromotion->setTuesday($request->data->promotion->tuesday);
		$newPromotion->setWednesday($request->data->promotion->wednesday);
		$newPromotion->setThursday($request->data->promotion->thursday);
		$newPromotion->setFriday($request->data->promotion->friday);
		$newPromotion->setSaturday($request->data->promotion->saturday);

		$entityManager->persist($newPromotion);
		$entityManager->flush();

		$promotions =  $entityManager->getRepository("Promotion")->findAll();
		echo(json_encode($promotions));
		break;

	case 'deletePromotion':
		$promotionToDelete = $request->data->promotion;
		$promotion= $entityManager->find('Promotion', $promotionToDelete->id);
		$promotion->setActive(false);
		$entityManager->merge($promotion);
		$entityManager->flush();

		$promotions =  $entityManager->getRepository("Promotion")->findAll();
		echo(json_encode($promotions));
		break;

	case 'getAllCards':
		$cards =  $entityManager->getRepository("Card")->findAll();
		//var_dump($addresses);

		echo(json_encode($cards));
		break;

	case 'createCard':
		$newCard = new Card();
		$newCard->setActive(true);

		$newCard->setName($request->data->card->name);

		$entityManager->persist($newCard);
		$entityManager->flush();

		$cards =  $entityManager->getRepository("Card")->findAll();
		echo(json_encode($cards));
		break;

	case 'updateCard':
		$newCard = $entityManager->find('Card', $request->data->card->id);
		$newCard->setActive(true);
		$newCard->setName($request->data->card->name);

		$entityManager->merge($newCard);
		$entityManager->flush();

		$cards =  $entityManager->getRepository("Card")->findAll();
		echo(json_encode($cards));
		break;

	case 'deleteCard':
		$cardToDelete = $request->data->card;
		$card= $entityManager->find('card', $cardToDelete->id);
		$card->setActive(false);
		$entityManager->merge($card);
		$entityManager->flush();

		$cards =  $entityManager->getRepository("Card")->findAll();
		echo(json_encode($cards));
		break;

	case 'getAllBanks':
		$banks =  $entityManager->getRepository("Bank")->findAll();
		//var_dump($addresses);

		echo(json_encode($banks));
		break;

	case 'createBank':
		$newBank = new Bank();
		$newBank->setActive(true);
		$newBank->setName($request->data->bank->name);

		$entityManager->persist($newBank);
		$entityManager->flush();

		$banks =  $entityManager->getRepository("Bank")->findAll();
		echo(json_encode($banks));
		break;

	case 'updateBank':
		$newBank = $entityManager->find('Bank', $request->data->bank->id);
		$newBank->setActive(true);
		$newBank->setName($request->data->bank->name);

		$entityManager->merge($newBank);
		$entityManager->flush();

		$banks =  $entityManager->getRepository("Bank")->findAll();
		echo(json_encode($banks));
		break;

	case 'deleteBank':
		$bankToDelete = $request->data->bank;
		$bank = $entityManager->find('Bank', $bankToDelete->id);		
		$bank->setActive(false);
		$entityManager->merge($bank);

		$bankCards = $entityManager->getRepository("BankCard")->findBy(array('idBank' => $bank->id));

		foreach ($bankCards as $itemBankCard) {
			$entityManager->remove($itemBankCard);
		}
		
		$entityManager->flush();

		$banks =  $entityManager->getRepository("Bank")->findAll();
		echo(json_encode($banks));
		break;

	case 'getAllAssociatedCards':
		if(isset($request->data->bank->id)){
			$bank = $entityManager->find('Bank', $request->data->bank->id);
			$bankCards =  $entityManager->getRepository("BankCard")->findBy(array("idBank" => $bank->id));
		}else{
			$bank = $entityManager->find('Bank', $request->data->bank);
			$bankCards =  $entityManager->getRepository("BankCard")->findBy(array("idBank" => $bank));
		}
		
		//var_dump($addresses);

		echo(json_encode($bankCards));
		break;

	case 'manageBankCards':
		$associatedCards = $request->data->associatedCards;
		$bank = $request->data->bank;

		$bankCards = $entityManager->getRepository("BankCard")->findBy(array('idBank' => $bank->id));

		$flag=0;

		foreach ($bankCards as $itemBankCard) {
			$flag=0;
			foreach($associatedCards as $itemCard)
			{
				if($itemBankCard->idCard->id==$itemCard->id){
					$flag=1;
				}
			}
			if($flag==0){
				$entityManager->remove($itemBankCard);
			}
		}

		foreach($associatedCards as $itemCard){
			$newBankCard = new BankCard();
			$aBank = $entityManager->find("Bank",$bank->id);
			$newBankCard->setIdBank($aBank);
			$aCard = $entityManager->find("Card",$itemCard->id);
			$newBankCard->setIdCard($aCard);
			$flag=0;
			foreach ($bankCards as $itemcito) {
				if($newBankCard->idCard->id==$itemcito->idCard->id){
					$flag=1;
				}
			}
			if($flag==0){
				$entityManager->persist($newBankCard);
			}
		}

		$entityManager->flush();
		break;

	case 'getAllSales':
		$connection = $entityManager->getConnection();
		$statement = $connection->prepare('	SELECT 		
				S.SALE_NUMBER as saleNumber, 
				S.DATE as saleDate, 
				STATE.DESCRIPTION as state,
				STATE.ID as idState, 
				S.PRICE as price, 
				CONCAT( USER.SURNAME, ", ",USER.NAME) AS userName 
				FROM SALE S INNER JOIN USER ON S.ID_USER = USER.ID
				INNER JOIN SALE_STATE ST ON ST.ID_SALE = S.ID 
									AND ST.LAST_UPDATE = (SELECT MAX(LAST_UPDATE) FROM SALE_STATE ST WHERE ST.ID_SALE = S.ID)
				INNER JOIN STATE ON ST.ID_STATE = STATE.ID
				ORDER BY S.SALE_NUMBER');
		$statement->execute();

		$sales = $statement->fetchAll();

		echo(json_encode($sales));
		break;

	case 'deleteImages':
		foreach ($request->data->images as $item) {
			//echo(var_dump($image));
			$image= $entityManager->find('Picture', $item);
			$image->setActive(false);
			$entityManager->merge($image);
		}
		$entityManager->flush();
		break;

	case 'getProductImages':
		$images = $entityManager->getRepository("Picture")->findBy(array('idProd' => $request->data->product->id, 'active' => true));
		//var_dump($addresses);

		echo(json_encode($images));
		break;

	case 'getSliderImages':
		$images = $entityManager->getRepository("Picture")->findBy(array('path' => $request->data->slider, 'active' => true));
		//var_dump($addresses);

		echo(json_encode($images));
		break;

	case 'getDetailSaleBySaleNumber':
		$connection = $entityManager->getConnection();
		$statement = $connection->prepare('SELECT P.NAME prodName, 
												  C.COLOR color, 
												  Z.SIZE size, 
												  D.QUANTITY quantity, 
												  D.UNIT_PRICE unitPrice
											FROM DETAIL_SALE D 
											INNER JOIN ARTICLE A ON D.ID_ARTICLE = A.ID
											INNER JOIN SALE S ON D.ID_SALE = S.ID
											INNER JOIN PRODUCT P ON A.ID_PROD = P.ID
											INNER JOIN COLOR C ON C.ID = A.ID_COLOR
											INNER JOIN SIZE Z ON Z.ID = A.ID_SIZE
											WHERE S.SALE_NUMBER = '.$request->data->saleNumber);
		$statement->execute();

		$detailsSale = $statement->fetchAll();

		echo(json_encode($detailsSale));
		break;

	case 'getAllSaleStates':
		$states = $entityManager->getRepository("State")->findAll();

		echo(json_encode($states));
		break;

	case 'changeState':

		$state = $entityManager->getRepository('State')->findOneBy(array('description' => $request->data->state));
		$sale = $entityManager->getRepository("Sale")->findOneBy(array('saleNumber' => $request->data->saleNumber));

		$saleState = new SaleState();
		$saleState->setActive(true);
		$saleState->setLastUpdate(new DateTime());
		$saleState->setMotive("Admin Change State: ".$state->description);
		$saleState->setIdSale($sale);
		$saleState->setIdState($state);

		$entityManager->persist($saleState);
		$entityManager->flush();


		$connection = $entityManager->getConnection();
		$statement = $connection->prepare('	SELECT 		
				S.SALE_NUMBER as saleNumber, 
				S.DATE as saleDate, 
				STATE.DESCRIPTION as state,
				STATE.ID as idState, 
				S.PRICE as price, 
				CONCAT( USER.SURNAME, ", ",USER.NAME) AS userName 
				FROM SALE S INNER JOIN USER ON S.ID_USER = USER.ID
				INNER JOIN SALE_STATE ST ON ST.ID_SALE = S.ID 
									AND ST.LAST_UPDATE = (SELECT MAX(LAST_UPDATE) FROM SALE_STATE ST WHERE ST.ID_SALE = S.ID)
				INNER JOIN STATE ON ST.ID_STATE = STATE.ID
				ORDER BY S.SALE_NUMBER');
		$statement->execute();

		$sales = $statement->fetchAll();

		echo(json_encode($sales));
		break;

	case 'getAllProductDiscounts':
		$discounts =  $entityManager->getRepository("ProductDiscount")->findAll();
		//var_dump($products);

		echo(json_encode($discounts));
		break;

	case 'getAllDiscounts':
		$discounts =  $entityManager->getRepository("Discount")->findAll();
		//var_dump($products);

		echo(json_encode($discounts));
		break;


	case 'saveDiscount':
		$newDiscount = new Discount();
		$newDiscount->setActive(true);
		$newDiscount->setPercentage($request->data->discount->percentage);

		$entityManager->persist($newDiscount);
		$entityManager->flush();

		$discounts =  $entityManager->getRepository("Discount")->findAll();
		echo(json_encode($discounts));
		break;
		
	case 'changeStatusPercentage':

		$discount = $entityManager->find('Discount', $request->data->discount->id);
		$discount->setActive($request->data->status);
		$entityManager->merge($discount);
		$entityManager->flush();


		$productsDiscount = $entityManager->getRepository('ProductDiscount')->findBy(array('idDiscount' => $request->data->discount->id));

		if(!$request->data->status){

			$discount = $entityManager->getRepository('Discount')->findOneBy(array('percentage' => '0'));

			foreach($productsDiscount as $product) {
				$product->setIdDiscount($discount);
				$product->setActive(false);
				$entityManager->merge($product);
				$entityManager->flush();

				$articles = $entityManager->getRepository('Article')->findBy(array('idProd' => $product->idProduct->id));

				foreach($articles as $article) {
					$article->setPrice($article->oldPrice);
					$article->setOldPrice(null);
					$entityManager->merge($article);
					$entityManager->flush();
				}
			}
		}else{

			foreach($productsDiscount as $product) {
				$product->setActive(false);
				$entityManager->merge($product);
				$entityManager->flush();

				$articles = $entityManager->getRepository('Article')->findBy(array('idProd' => $product->idProduct->id));

				foreach($articles as $article) {
					$article->setOldPrice($article->price);
					$newPrice = $article->price-($article->price*$prodDiscount->idDiscount->percentage)/100;
					$article->setPrice($newPrice);
					$entityManager->merge($article);
					$entityManager->flush();
				}
			}
		}



		$discounts =  $entityManager->getRepository("Discount")->findAll();
		echo(json_encode($discounts));
		break;


	case 'changeStatusProductDiscount':

		$prodDiscount = $entityManager->getRepository('ProductDiscount')->findOneBy(array('idProduct' => $request->data->prodId));
		$prodDiscount->setActive($request->data->status);


		$articles = $entityManager->getRepository('Article')->findBy(array('idProd' => $request->data->prodId));

		if(!$request->data->status){
			$discount = $entityManager->getRepository('Discount')->findOneBy(array('percentage' => '0'));
			$prodDiscount->setIdDiscount($discount);

			foreach($articles as $article) {
				$article->setPrice($article->oldPrice);
				$article->setOldPrice(null);
				$entityManager->merge($article);
				$entityManager->flush();
			}

		}else{
			foreach($articles as $article) {
				$article->setOldPrice($article->price);
				$newPrice = $article->price-($article->price*$prodDiscount->idDiscount->percentage)/100;
				$article->setPrice($newPrice);
				$entityManager->merge($article);
				$entityManager->flush();
			}
		}

		$entityManager->merge($prodDiscount);
		$entityManager->flush();

		$discounts =  $entityManager->getRepository("ProductDiscount")->findAll();
		echo(json_encode($discounts));
		break;

	case 'changePercentageProductDiscount': //modificar los old_price

		$prodDiscount = $entityManager->getRepository('ProductDiscount')->findOneBy(array('idProduct' => $request->data->prodId));
		$discount = $entityManager->getRepository('Discount')->findOneBy(array('id' => $request->data->percentage->id));

		$prodDiscount->setActive(true);
		$prodDiscount->setIdDiscount($discount);
		$entityManager->merge($prodDiscount);
		$entityManager->flush();

		$discount->setActive(true);
		$entityManager->merge($discount);
		$entityManager->flush();

		$articles = $entityManager->getRepository('Article')->findBy(array('idProd' => $request->data->prodId));
		foreach($articles as $article) {
			$article->setOldPrice($article->price);
			$newPrice = $article->price-($article->price*$prodDiscount->idDiscount->percentage)/100;
			$article->setPrice($newPrice);			
			$entityManager->merge($article);
			$entityManager->flush();
		}

		$discounts =  $entityManager->getRepository("ProductDiscount")->findAll();
		echo(json_encode($discounts));
		break;
}		

