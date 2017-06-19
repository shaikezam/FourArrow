<?php
include 'dbmanager.php';
function check_sign_data($p_user_name, $p_pass)
{
    $res = DBConnection::_executeSelectQuery("SELECT * FROM users where user_name = '$p_user_name'");
    if ($res !== false) {
        $res = DBConnection::_executeSelectQuery("SELECT * FROM users where user_name like binary '$p_user_name' and user_pass like binary '$p_pass'");
        if ($res === false) {
            $obj = array(
                "status" => "ERROR",
                "message" => "User name and password are not match"
            );
            echo json_encode($obj);
            return;
        } else {
            return true;
        }
    } else {
        $res = DBConnection::_executeQuery('INSERT INTO users VALUES (DEFAULT, "' . $p_user_name . '","' . $p_pass . '", DEFAULT)');
        if ($res === true) {
            return true;
        } else {
            return $res;
        }
    }
}
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $p1_user_name = $_POST['p1'];
    $p2_user_name = $_POST['p2'];
    $p1_pass      = $_POST['p1Pass'];
    $p2_pass      = $_POST['p2Pass'];
    if (strlen($p1_user_name) < 5 || strlen($p2_user_name) < 5 || strlen($p1_pass) < 5 || strlen($p2_pass) < 5) {
        $obj = array(
            "status" => "ERROR",
            "message" => "User name and password must contains 5 character each"
        );
        echo json_encode($obj);
        return;
    } else {
        $res = check_sign_data($p1_user_name, $p1_pass);
        if ($res === false) {
            return false;
        } else if ($res === true) {
            $res = check_sign_data($p2_user_name, $p2_pass);
            if ($res === false) {
                return false;
            } else if ($res === true) {
                $obj = array(
                    "status" => "SUCCESS",
                    "message" => "Start the game"
                );
                echo json_encode($obj);
            } else {
                echo $res;
            }
        } else {
            echo $res;
        }
    }
}

?>