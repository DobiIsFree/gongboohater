<?php
    $db_host = "localhost";
    $db_user="root";
    $db_password="2810";
    $db_name = "sqlDB";

    $con=mysqli_connect($db_host, $db_user, $db_password, $db_name) or die("MySQL 접속 실패");

    $sql= "SELECT * FROM userTbl";

    $ret = mysqli_query($con, $sql);
    if($ret){
        $count = mysqli_num_rows($ret);
    }
    else {
        echo "userTbl 데이터 조회 실패"."<br>";
        echo "실패 원인: ".mysqli_error($con);
        exit();
    }

    echo "<h1>회원 조회 결과</h1>";
    echo "<table border=1>";
    echo "<tr>";
    echo "<th>아이디</th><th>name</th><th>birth</th><th>지역</th><th>극번</th>";
    echo "<th>전화번호</th><th>키</th><th>가입일</th><th>수정</th><th>삭제</th>";
    echo "</tr>";
    while($row = mysqli_fetch_array($ret)){
        echo "<tr>";
        echo "<td>", $row['userID'], "</td>";
        echo "<td>", $row['name'], "</td>";
        echo "<td>", $row['birthYear'], "</td>";
        echo "<td>", $row['addr'], "</td>";
        echo "<td>", $row['mobile1'], "</td>";
        echo "<td>", $row['mobile2'], "</td>";
        echo "<td>", $row['height'], "</td>";
        echo "<td>", $row['mDate'], "</td>";
        echo "<td>", "<a href='update.php?userID=", $row['userID'], "'>수정</a></td>";
        echo "<td>", "<a href='delete.php?userID=", $row['userID'], "'>삭제</a></td>";
        echo "</tr>";
    }

    mysqli_close($con);
    echo "</table>";
    echo "<br> <a href='main.html'> <-- 초기 화면</a>";
    
?>