<?php
    include 'server.php';
    $id = isset($_GET['id']) ? $_GET['id'] : '' ;
    $watching = isset($_GET['watching'])?$_GET['watching'] : ''; 
    $similar = isset($_GET['similar'])?$_GET['similar'] : '';
    $province = isset($_GET['province'])?$_GET['province'] : '';
    $city = isset($_GET['city'])?$_GET['city'] : '';
    $area = isset($_GET['area'])?$_GET['area'] : '';
    if($id != ''){
        $sql = "select * from goods where id=$id";
        $result = $conn->query($sql);
        $row = $result->fetch_all(MYSQLI_ASSOC);
        $result->close();
        echo json_encode($row,JSON_UNESCAPED_UNICODE);
    }
    if($province != ''){
        $sql = "select * from provinces";
        $result = $conn->query($sql);
        $row = $result->fetch_all(MYSQLI_ASSOC);
        $result->close();
        echo json_encode($row,JSON_UNESCAPED_UNICODE);
    }
    if($city != ''){
        $sql = "select * from cities where provinceid=$city";
        $result = $conn->query($sql);
        $row = $result->fetch_all(MYSQLI_ASSOC);
        $result->close();
        echo json_encode($row,JSON_UNESCAPED_UNICODE);
    }
    if($area != ''){
        $sql = "select * from areas where cityid=$area";
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