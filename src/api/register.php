<?php
	include 'server.php';
	$usernameTest = isset($_GET['usernametest'])?$_GET['usernametest'] : '';
	$username = isset($_GET['username'])?$_GET['username'] : '';
	$password = isset($_GET['password'])?$_GET['password'] : '';
	if($usernameTest != ''){
		$sql = "select * from user where username=$usernameTest";
		$result = $conn->query($sql);
    	$row = $result->fetch_all(MYSQLI_ASSOC);
    	$result->close();
    	echo json_encode($row,JSON_UNESCAPED_UNICODE);
	}
	if($username != ''){
		$sql_1 = "insert into user (username,password) values ($username,$password)";
		if ($conn->query($sql_1) === TRUE) {
		        echo true;
		    } else {
		        echo false;
		    }
	}
    $conn->close();
?>