<?php 

/* Owner Info */
$name = "Trirutda Nawattranakul";
$email = "soda_zai@hotmail.com";
$email = "soda_zai@hotmail.com";
$topic = "DekDoi portfolio";

/* Client info */
$clientName = $clientEmail = $clientPhone = $clientMessage = "";

/* Error Message */
$nameError = $emailError = $phoneError = $messageError = "";

/* Validate Client info in case Javascript suppoert is turned off */
$flag = true; // Used to check if email is appropriate
if ($_SERVER["REQUEST_METHOD"] == "POST") {
	$clientName = checkName($_POST["name"]);
	$clientEmail = checkEmail($_POST["email"]);
	$clientPhone = checkPhone($_POST["phone"]);
	$clientMessage = checkMessage($_POST["comment"]);
}

/* Exit if inputs are not appropriate */
if (!$flag) {
	exit();
}

/* Check if name only contains letters and whitespaces */
function checkName($value='')
{
	global $flag;
	$value = init($value);
	$pattern = '/^[A-Za-z\s]*$/';
	if (!preg_match($pattern, $value)){
		$nameError = "Name is not valid.";
		$flag = false;
		echo $nameError;
	}
	return $value;
}

/* Check if the value is a valid email address */
function checkEmail($value='')
{
	global $flag;
	$value = init($value);
	if (!filter_var($value, FILTER_VALIDATE_EMAIL)) {
		$emailError = "Email is not valid";
		$flag = false;
		echo $emailError;
	}
	return $value;
}

/* Check if the value contains only the number and -, ., :, + signs*/
function checkPhone($value='')
{
	global $flag;
	$value = init($value);
	$pattern = '/(\+)?[\d]*\d{3}([\.\-\:])?\d{3}\2\d{4}/';
	if (!preg_match($pattern, $value)) {
		$phoneError = "Phone is not valid.";
		$flag = false;
		echo $phoneError;
	}
	return $value;
}

function checkMessage($value='')
{
	$value = init($value);
	return $value;
}

/* Convert User's input into readable format */
function init($data) {
	$data = stripslashes($data);
	$data = htmlspecialchars($data);
	return $data;
}

/* Send Thank you Email 
Each line should be separated with a CRLF (\r\n). 
Lines should not be larger than 70 characters.
*/
$thankyouEmail = 'Dear ' . $clientName . "\r\n";
$thankyouEmail .= 'Thank you for taking time to contact me.' . "\r\n";
$thankyouEmail .= 'Kind regards,' . "\r\n";
$thankyouEmail .= $name . "\r\n"; 

/* Send Email to Owner */
$emailToOwner = $topic . "\r\n";
$emailToOwner .= $clientName . " would like to contact you about " . $clientMessage . ".\r\n";
$emailToOwner .= "His phone number is " . $clientPhone . " and his email is " . $clientEmail . "\r\n";

/* Send Emails */
$thankyouStatus = mail($clientEmail, $topic, $thankyouEmail);
$ownerStatus = mail($email, $topic, $emailToOwner);
 ?>