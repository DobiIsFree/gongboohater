<?php
    $db_host = "localhost";
    $db_user="root";
    $db_password="2810";
    $db_name = "sqlDB";

    $con=mysqli_connect($db_host, $db_user, $db_password, $db_name) or die("insert_result: MySQL 접속 실패");

    $userID = $_POST["userID"];
    $name = $_POST["name"];
    $birthYear = $_POST["birthYear"];
    $addr = $_POST["addr"];
    $mobile1 = $_POST["mobile1"];
    $mobile2 = $_POST["mobile2"];
    $height = $_POST["height"];
    $mDate = date("Y-m-j");

    $sql = "UPDATE userTbl SET name='".$name."', birthYear=".$birthYear;
    $sql = $sql.", addr='".$addr."', mobile1='".$mobile1."', mobile2='".$mobile2;
    $sql = $sql."', height='".$height."', mDate='".$mDate."' WHERE userID='".$userID."'";

    $ret = mysqli_query($con, $sql);

    echo "<h1>회원 정보 수정 결과</h1>";
    if($ret){
        echo "데이터 수정 성공.";
    }
    else {
        echo "데이터 수정 실패."."<br>";
        echo "실패 원인: ".mysqli_error($con);
    }
    mysqli_close($con);

    echo "<br> <a href='main.html'> <-- 초기 화면</a>";
?>