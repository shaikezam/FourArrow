<?php

class DBConnection {

    protected static $server = 'localhost';
    protected static $user = 'root';
    protected static $password = '';
    protected static $db = 'fourarrow';
    protected static $connectionString;

    /* setters & getters */

    public static function setServer($value) {
        self::$server = $value; //Works fine
    }

    public static function getServer() {
        return self::$server; //Works fine
    }

    public static function setUser($value) {
        self::$user = $value; //Works fine
    }

    public static function getUser() {
        return self::$user; //Works fine
    }

    public static function setPassword($value) {
        self::$password = $value; //Works fine
    }

    public static function getPassword() {
        return self::$password; //Works fine
    }

    public static function setDB($value) {
        self::$db = $value; //Works fine
    }

    public static function getDB() {
        return self::$db; //Works fine
    }

    /* get DB connection */

    public static function getDBConnection() {
        if (!self::$connectionString) {
            self::$connectionString = mysqli_connect(self::getServer(), self::getUser(), self::getPassword());

            if (!self::$connectionString) {
                die("Connection failed: ");
            }

            $db_selected = mysqli_select_db(self::$connectionString, self::getDB());
            if (!$db_selected) {
// If we couldn't, then it either doesn't exist, or we can't see it.
                $sql = 'CREATE DATABASE ' . self::getDB();
                if (self::$connectionString->query($sql) === TRUE) {
                    $str = "Database " . self::getDB() . " created successfully\n";
                    self::$connectionString = mysqli_connect(self::getServer(), self::getUser(), self::getPassword(), self::getDB());
                    self::_initDataStructure();
                } else {
                    $str = 'Error creating database: ' . mysqli_error() . "\n";
                }
            }
        }
        return self::$connectionString;
    }

    /* execute query */

    public static function _executeQuery($sql) {

        if (self::$connectionString == null) {
            self::getDBConnection();
        }
        $res = self::$connectionString->query($sql);
        if ($res === TRUE) {
            return true; 
        } else {
            return self::$connectionString->error; //error -> table wont created
        }
    }

    public static function _executeSelectQuery($sql) {

        if (self::$connectionString == null) {
            self::getDBConnection();
        }
        $result = mysqli_query(self::$connectionString, $sql);
        if (!$result) // error in query
            echo 'Invalid query: ' . mysqli_error(); //sending error message
        $numResults = mysqli_num_rows($result);
        if ($numResults == 0) {
            return false;
        } else {
            return $result;
        }
    }
    
    public static function getLastInsertID() {
        if (self::$connectionString == null) {
            self::getDBConnection();
        }
        return mysqli_insert_id(self::$connectionString);
    }

    /* create table */

    private static function _initDataStructure() {
        self::_executeQuery('CREATE TABLE users (
    user_id     INT(8) NOT NULL AUTO_INCREMENT,
    user_name   VARCHAR(30) NOT NULL,
    user_pass   VARCHAR(255) NOT NULL,
    wins   INT(6) NOT NULL DEFAULT 0,
    UNIQUE INDEX user_name_unique (user_name),
    PRIMARY KEY (user_id)
) Engine=InnoDB');
        
        self::_executeQuery('CREATE TABLE games (
    game_id     INT(8) NOT NULL AUTO_INCREMENT,
    p1_name   VARCHAR(30) NOT NULL,
    p2_name   VARCHAR(255) NOT NULL,
    UNIQUE INDEX user_name_unique (user_name),
    PRIMARY KEY (user_id)
) Engine=InnoDB');
    }

    /* close DB connection */

    public static function closeDBConnection() {
        if (self::$connectionString) {
            mysqli_close(self::$connectionString);
        }
    }

}

?>