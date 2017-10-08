<?php
    include 'server.php';
    $value = isset($_GET['value'])?$_GET['value'] : '';
    $sql = "select * from goods where name regexp '$value'";
    $result = $conn->query($sql);
    $row = $result->fetch_all(MYSQLI_ASSOC);
    $result->close();
    echo json_encode($row,JSON_UNESCAPED_UNICODE);
    $conn->close();
?>