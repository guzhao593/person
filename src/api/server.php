<?php
	$severname = 'localhost';
	$username = 'root';
	$password = '';
	$dbname = 'ugoshop';
	$conn = new mysqli($severname,$username,$password,$dbname);
	if($conn->connect_error){
	    die('连接失败：' . $conn->connect_error);
	}
	$conn->set_charset('utf8');
?>