<?php
include 'dbmanager.php';
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $res = DBConnection::_executeSelectQuery("SELECT * FROM games");
    $table = '<table class="table table table-striped"><thead><tr><th>Game id</th><th>Winner</th><th>Game duration</th></tr></thead><tbody>';
    while ($row = mysqli_fetch_array($res)) { //send back result
        $table = $table . '<tr><td>' . $row['game_id'] . '</td><td>' . $row['winner_name'] . '</td><td>' . $row['game_duration'] . '</td></tr>';
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