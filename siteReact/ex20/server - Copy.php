<?php

session_start(); // to use $_SESSION['variable']
$db = null; // GLOBAL
if( isset($_SESSION['db_ex11'])  ) {
	$db = $_SESSION['db_ex11'];
}
else {
	$db = array();
	//default values (simulate some DB data)
	push($db, array("category" => "Sporting Goods", "price" => "$49.99", "stocked" => "true", "name" => "Football"));
	push($db, array("category" => "Sporting Goods", "price" => "$9.99", "stocked" => "true", "name" => "Baseball"));
	push($db, array("category" => "Sporting Goods", "price" => "$29.99", "stocked" => "false", "name" => "Basketball"));
	push($db, array("category" => "Electronics", "price" => "$99.99", "stocked" => "true", "name" => "iPod Touch"));
	push($db, array("category" => "Electronics", "price" => "$399.99", "stocked" => "false", "name" => "iPhone 5"));
	push($db, array("category" => "Electronics", "price" => "$199.99", "stocked" => "true", "name" => "Nexus 7"));
	$_SESSION['db_ex11'] = $db; // save to session (to be avaliable on the next request)
}
/* CONVERT JSON to PHP
var a = [];
var result = "";
a.forEach(function(Object){
   result += 'push($db, array(';
   var isFirstProp = true;
   for(var propertyName in Object) {
      if( !isFirstProp )
         result += ', ';
      // propertyName is what you want
      // you can get the value like this: Object[propertyName]
      result += '"' +propertyName + '" => "' + Object[propertyName] + '"'
      isFirstProp = false;
   }
   result += '));\n';
}); console.log(result);*/

if ( isAnAjaxRequest() ) {
  response_to_POST();
}

//Function to check if the request is an AJAX request
function isAnAjaxRequest() {
  return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
}

function response_to_POST(){
	if( $_POST ) { // if data was sent
		push($GLOBALS['db_ex11'], $_POST);
		$_SESSION['db_ex11'] = $GLOBALS['db_ex11']; // save to session (to be avaliable on the next request)
	}
  	echo '{"data": ' . json_encode($GLOBALS['db_ex11']) . '}';
}


function push(&$array, $object){
    $array[] = $object;
}
?>
