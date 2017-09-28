<?php
    $id = isset($_GET['id']) ? $_GET['id'] : '' ;
    $severname = 'localhost';
    $username = 'root';
    $password = '';
    $dbname = 'ugoshop';
    $conn = new mysqli($severname,$username,$password,$dbname);
    if($conn->connect_error){
        die('连接失败：' . $conn->connect_error);
    }
    $conn->set_charset('utf8');
    $sql = "select * from goods where id=$id";
    $result = $conn->query($sql);
    $row = $result->fetch_all(MYSQLI_ASSOC);
    $result->close();
    echo json_encode($row,JSON_UNESCAPED_UNICODE);
    $conn->close();
?>