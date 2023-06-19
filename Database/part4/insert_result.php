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

    $sql = "INSERT INTO userTbl VALUES('".$userID."','".$name."','".$birthYear;
    $sql = $sql."','".$addr."','".$mobile1."','".$mobile2."','".$height."','".$mDate."')";

    $ret = mysqli_query($con, $sql);

    echo "<h1> 신규 회원 입력 결과</h1>";
    if($ret){
        echo "데이터 입력 성공.";
    }
    else{
        echo "데이터 입력 실패."."<br>";
        echo "실패 원인: ".mysqli_error($con);
    }
    mysqli_close($con);

    echo "<br> <a href='main.html'> <-- 초기 화면</a>";

?>