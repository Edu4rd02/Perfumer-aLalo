<?php
    
    $dbhost = "localhost";
    $dbuser = "root";
    $dbpass = "admin1234";
    $dbname = "perfumeria";

    if(!$con = new mysqli($dbhost, $dbuser, $dbpass, $dbname)){
        die("La conexion ha fallado". mysqli_connect_error());
    }
?>