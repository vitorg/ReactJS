<?php

session_start(); // to use $_SESSION['variable']
$db = null; // GLOBAL
if( isset($_SESSION['db'])  ) {
	$db = $_SESSION['db'];
}
else {
	$db = array();
	//default values (simulate some DB data)
	push($db, array('author' => "Pete Hunt", 'text' => "This is one comment"));
	push($db, array('author' => "Jordan Walke", 'text' => "This is *another* comment"));
	$_SESSION['db'] = $db; // save to session (to be avaliable on the next request)
}


if ( isAnAjaxRequest() ) {
  response_to_POST();
}

//Function to check if the request is an AJAX request
function isAnAjaxRequest() {
  return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
}

function response_to_POST(){
	if( $_POST ) { // if data was sent
		push($GLOBALS['db'], $_POST);
		$_SESSION['db'] = $GLOBALS['db']; // save to session (to be avaliable on the next request)
	}
  	echo '{"comments": ' . json_encode($GLOBALS['db']) . '}';
}


function push(&$array, $object){
    $array[] = $object;
}
?>
