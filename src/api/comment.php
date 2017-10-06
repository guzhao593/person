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
    if($comment == 'all'){
        $sql_2 = "select * from comment order by id desc limit $pageNumFirst,$shownum";
        $sql_total = "select count(id) from comment";
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
    echo json_encode($row_total,JSON_UNESCAPED_UNICODE) .'&'. json_encode($row,JSON_UNESCAPED_UNICODE);
    $result->close();
    $total->close();
    $conn->close();
?>