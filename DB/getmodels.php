<?php
    include("connection.php");

    $list=[];
    $texto = file_get_contents("php://input");

    $sql_select = "SELECT nombre_modelo FROM modelos WHERE id_marca IN (SELECT id_marca FROM marcas WHERE nombre_marca = ?)";

    $stmt = $con->prepare($sql_select);
    $stmt->bind_param("s",$texto);
    $stmt->execute();

    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            // Agregar los modelos encontrados al array
            array_push($list, $row['nombre_modelo']);
        }
    } else {
        error_log("No se encontraron modelos para la marca '$texto'.");
    }

    header('Content-Type: text/plain'); // Indica que devolverá texto
    echo implode("\n", $list); // Cada texto en una nueva línea
    
    $con->close();
?>