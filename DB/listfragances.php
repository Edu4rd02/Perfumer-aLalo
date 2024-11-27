<?php
    include("connection.php");
    $list = [];

    $sql_select = "SELECT nombre_marca FROM marcas";
    $result = $con->query($sql_select);

    while ($row = $result->fetch_assoc()) {
        // echo $row['nombre_marca'] . "<br>";
        array_push($list,$row['nombre_marca']);
    }

    header('Content-Type: text/plain'); // Indica que devolverá texto
    echo implode("\n", $list); // Cada texto en una nueva línea

    $con->close();
?>