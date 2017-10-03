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
	$username = isset($_GET['username'])?$_GET['username'] : '';
	$sql = "select * from user where username=$username";
	$result = $conn->query($sql);
    $row = $result->fetch_all(MYSQLI_ASSOC);
    $result->close();
    echo json_encode($row,JSON_UNESCAPED_UNICODE);
    $conn->close();
?>