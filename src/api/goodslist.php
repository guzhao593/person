<?php
    $page = isset($_GET['page'])?$_GET['page'] : '';
    $totalNum = isset($_GET['totalnum'])?$_GET['totalnum'] : '';
    $severname = 'localhost';
    $username = 'root';
    $password = '';
    $dbname = 'ugoshop';
    $conn = new mysqli($severname,$username,$password,$dbname);
    if($conn->connect_error){
        die('连接失败：' . $conn->connect_error);
    }
    $conn->set_charset('utf8');
    $pageShowNum = 30;
    $pageNumFirst = ($page-1)*$pageShowNum;
    $sql = "select * from goods order by $totalNum desc limit $pageNumFirst,$pageShowNum";
    $result = $conn->query($sql);
    $row = $result->fetch_all(MYSQLI_ASSOC);
    if($totalNum != ''){
        $sql_total = "select count($totalNum) from goods";
        $total = $conn->query($sql_total);
        $total_1 = $total->fetch_all(MYSQLI_NUM);
        $total->close();
        echo json_encode($total_1,JSON_UNESCAPED_UNICODE) .'&'. json_encode($row,JSON_UNESCAPED_UNICODE);
    }else{
        echo json_encode($row,JSON_UNESCAPED_UNICODE);
    }
    $result->close();
    $conn->close();
?>