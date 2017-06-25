<?php
include 'dbmanager.php';
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $res = DBConnection::_executeSelectQuery("SELECT * FROM games order by game_duration limit 1");
    while ($row = mysqli_fetch_array($res)) { //send back result
        $player   = $row['winner_name'];
        $duration = $row['game_duration'];
    }
    $obj = array(
        "status" => "SUCCESS",
        "message" => "The fastest game ame playerd by " . $player . ", and was " . $duration
    );
    echo json_encode($obj);
    return;
}
?>