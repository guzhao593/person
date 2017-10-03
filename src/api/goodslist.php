<?php
    include 'server.php';
    $page = isset($_GET['page'])?$_GET['page'] : '';
    $totalNum = isset($_GET['totalnum'])?$_GET['totalnum'] : '';
    $condition = isset($_GET['condition'])?$_GET['condition'] : '';
    $pageShowNum = 30;
    $pageNumFirst = ($page-1)*$pageShowNum;
    if($condition == 'descend'){
        $sql = "select * from goods order by $totalNum*1 desc limit $pageNumFirst,$pageShowNum";
    }else if($condition == 'ascend'){
        $sql = "select * from goods order by $totalNum*1 asc limit $pageNumFirst,$pageShowNum";
    }else{
        $sql = "select * from goods order by $totalNum asc limit $pageNumFirst,$pageShowNum";
    }
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