<?php
   include 'server.php';
   $username = isset($_GET['commentUserName'])?$_GET['commentUserName']:'';
   $content = isset($_GET['commentContent'])?$_GET['commentContent']:'';
   $star = isset($_GET['commentStar'])?$_GET['commentStar']:'';
   $comment =isset($_GET['comment'])?$_GET['comment'] : '';
   $page = isset($_GET['page'])? $_GET['page'] : '';
   $shownum = 10;
   $pageNumFirst = ($page -1)*$shownum;
   if(!($username ==''| $content ==''| $star =='')){
        $sql_1 = "insert into comment (username,content,star) values ('$username','$content','$star')";
        if ($conn->query($sql_1) === TRUE) {
            echo true;
        } else {
            echo false;
        }
    }
    if($comment == 'all' || $comment == 'allfirst'){
        $sql_2 = "select * from comment order by id desc limit $pageNumFirst,$shownum";
        $sql_total = "select count(id) from comment";
        if($comment == 'allfirst'){
            $sql_total_good = "select count(star) from comment WHERE star=5 or star=4";
            $sql_total_middle = "select count(star) from comment WHERE star=3 or star=2";
            $sql_total_bad = "select count(star) from comment WHERE star=0 or star=1";
        }
    }else if($comment == 'good'){
        $sql_2 = "select * from comment where star=5 or star=4 order by star desc limit $pageNumFirst,$shownum";
        $sql_total = "select count(star) from comment WHERE star=5 or star=4";
    }else if($comment == 'middle'){
        $sql_2 = "select * from comment where star=3 or star=2 order by star desc limit $pageNumFirst,$shownum";
        $sql_total = "select count(star) from comment WHERE star=3 or star=2";
    }else if($comment == 'bad'){
        $sql_2 = "select * from comment where star=0 or star=1 order by star desc limit $pageNumFirst,$shownum";
        $sql_total = "select count(star) from comment WHERE star=0 or star=1";
    }
    $result = $conn->query($sql_2);
    $total = $conn->query($sql_total);
    $row = $result->fetch_all(MYSQLI_ASSOC);
    $row_total = $total->fetch_all(MYSQLI_NUM);
    if($comment == 'allfirst'){
        $total_good = $conn->query($sql_total_good);
        $total_middle = $conn->query($sql_total_middle);
        $total_bad = $conn->query($sql_total_bad);
        $row_good = $total_good->fetch_all(MYSQLI_NUM);
        $row_middle = $total_middle->fetch_all(MYSQLI_NUM);
        $row_bad = $total_bad->fetch_all(MYSQLI_NUM);
        echo json_encode($row_total,JSON_UNESCAPED_UNICODE).'&'.json_encode($row,JSON_UNESCAPED_UNICODE).'&'.json_encode($row_good,JSON_UNESCAPED_UNICODE).'&'.json_encode($row_middle,JSON_UNESCAPED_UNICODE).'&'.json_encode($row_bad,JSON_UNESCAPED_UNICODE);
    }else{
        echo json_encode($row_total,JSON_UNESCAPED_UNICODE) .'&'. json_encode($row,JSON_UNESCAPED_UNICODE);
    }
    $result->close();
    $total->close();
    $conn->close();
?>