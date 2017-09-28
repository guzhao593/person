<?php
    $severname = 'localhost';
    $username = 'root';
    $password = '';
    $dbname = 'ugoshop';
    $conn = new mysqli($severname,$username,$password,$dbname);
    if($conn->connect_error){
        die('连接失败：' . $conn->connect_error);
    }
    $conn->set_charset('utf8');
    $sql = 'select * from goods';
    $result = $conn->query($sql);
    $row = $result->fetch_all(MYSQLI_ASSOC);

    for($i= 0 ;$i<count($row);$i++){
        $sql_1 = 'INSERT INTO `goods`(';
            $prolink='';
            $vallink='';
        foreach($row[$i] as $pro => $val){
            if($pro != 'id'){
                $prolink .= "$pro".',';
                $vallink .= "'$val',";
            }
        } 
        $prolink = substr($prolink,0,-1);
        $vallink = substr($vallink,0,-1);
        $sql_1 .= "$prolink) VALUES ($vallink),";
        $sql_1 = substr($sql_1,0,-1);
        echo $sql_1;
        if ($conn->query($sql_1) === TRUE) {
                echo "新记录插入成功";
            } else {
                echo "Error: " . $sql_1 . "<br>" . $conn->error;
            }
    }
    $result->close();
    $conn->close();
?>