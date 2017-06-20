<?php
include 'dbmanager.php';
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $winner_name   = $_POST['winner'];
    $game_duration = $_POST['duration'];
    $res           = DBConnection::_executeQuery('INSERT INTO games VALUES (DEFAULT, "' . $winner_name . '","' . $game_duration . '")');
    if ($res === true) {
        $res = DBConnection::_executeQuery('UPDATE users set wins  = (wins + 1) where user_name = "' . $winner_name . '"');
        if ($res === true) {
            $obj = array(
                "status" => "SUCESS",
                "winner" => $winner_name,
                "duration" => $game_duration
            );
            echo json_encode($obj);
        } else {
            $obj = array(
                "status" => "ERROR",
                "message" => $res
            );
            echo json_encode($obj);
        }
        
    } else {
        $obj = array(
            "status" => "ERROR",
            "message" => $res
        );
        echo json_encode($obj);
    }
}
//echo DBConnection::_executeQuery('drop database fourarrow');
?>