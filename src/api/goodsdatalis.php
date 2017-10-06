<?php
    include 'server.php';
    $id = isset($_GET['id']) ? $_GET['id'] : '' ;
    $watching = isset($_GET['watching'])?$_GET['watching'] : ''; 
    $similar = isset($_GET['similar'])?$_GET['similar'] : '';
    if($id != ''){
        $sql = "select * from goods where id=$id";
        $result = $conn->query($sql);
        $row = $result->fetch_all(MYSQLI_ASSOC);
        $result->close();
        echo json_encode($row,JSON_UNESCAPED_UNICODE);
    }
    if($watching != '' || $similar != ''){
        if($watching){
            $sql = "select * from goods order by id limit $watching,10";
        }
        if($similar){
            $sql = "select * from goods where subclass='$similar' order by id limit 0,4";
        }
        $result = $conn->query($sql);
        $row = $result->fetch_all(MYSQLI_ASSOC);
        $result->close();
        echo json_encode($row,JSON_UNESCAPED_UNICODE);
    }
    $conn->close();
?>