    $sql = "SELECT * FROM post WHERE uid='1'";

    $ret = mysqli_query($con, $sql);

    $row = mysqli_fetch_array($ret);
    $lecture_name = $row['lecture_name'];
    $post_title = $row["post_title"];
    $post_content = $row["post_content"];
    $project_period = $row["project_period"];
    $recruit_period = $row["recruit_period"];
    $recruit_number = $row["recruit_number"];