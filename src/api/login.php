<?php
	include 'server.php';
	$username = isset($_GET['username'])?$_GET['username'] : '';
	$sql = "select * from user where username=$username";
	$result = $conn->query($sql);
	$row = $result->fetch_all(MYSQLI_ASSOC);
	$result->close();
	echo json_encode($row,JSON_UNESCAPED_UNICODE);
    $conn->close();
?>