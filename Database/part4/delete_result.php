<?php
    $db_host = "localhost";
    $db_user="root";
    $db_password="2810";
    $db_name = "sqlDB";

    $con=mysqli_connect($db_host, $db_user, $db_password, $db_name) or die("insert_result: MySQL 접속 실패");

    $userID = $_POST["userID"];

    $sql = "DELETE FROM userTbl WHERE userID='".$userID."'";

    $ret = mysqli_query($con, $sql);
    echo "<h1>회원 삭제 결과</h1>";
    if($ret){
        echo $userID." 회원 삭제 성공..";
    }
    else {
        echo "데이터 삭제 실패"."<br>";
        echo "실패 원인: ".mysqli_error($con);
    }
    mysqli_close($con);

    echo "<br> <a href='main.html'> <-- 초기 화면</a>";
?>