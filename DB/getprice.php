<?php
    include("connection.php");

    $list=[];
    $data = json_decode(file_get_contents("php://input"));

    $nombreModelo = $data[0];
    $capacidad = $data[1];

    $sql_select = "SELECT precio FROM precios WHERE id_modelo IN (SELECT id_modelo FROM modelos WHERE nombre_modelo = ?) AND capacidad = ?";

    $stmt = $con->prepare($sql_select);
    $stmt->bind_param("si",$nombreModelo,$capacidad);
    $stmt->execute();

    $result = $stmt->get_result();

    header('Content-Type: text/plain'); // Indica que devolverá texto
    if ($result->num_rows > 0) {
        echo $result->fetch_assoc()['precio']; // Cada texto en una nueva línea
    } else {
        error_log("No se encontraron modelos para la marca.");
    }
    
    $con->close();
?>