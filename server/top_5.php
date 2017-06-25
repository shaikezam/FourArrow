<?php
include 'dbmanager.php';
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $res = DBConnection::_executeSelectQuery("SELECT * FROM users order by wins DESC limit 5");
    $table = '<table class="table table table-striped"><thead><tr><th>User name</th><th>Wins</th></tr></thead><tbody>';
    while ($row = mysqli_fetch_array($res)) { //send back result
        $table = $table . '<tr><td>' . $row['user_name'] . '</td><td>' . $row['wins'] . '</td></tr>';
    }
    $table = $table . '</tbody></table>';
    $obj = array(
        "status" => "SUCCESS",
        "message" => $table
    );
    echo json_encode($obj);
    return;
}
?>