<?php
    include('connection.php');

    // Email a verificar
    $brand = file_get_contents("php://input");

    // Consulta para verificar si el email existe
    $sql = "SELECT nombre_marca FROM marcas WHERE nombre_marca = ? LIMIT 1";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("s",$brand);
    $stmt->execute();

    $stmt->bind_result($nombre_marca);
    $brand = strtolower($brand);

    if ($stmt->fetch()) {
        // Convertir el resultado de la base de datos a minúsculas
        $nombre_marca = strtolower($nombre_marca);
    
        // Comparar los valores en minúsculas
        if ($nombre_marca === $brand) {
            echo json_encode(['resultado' => true]);
        } else {
            echo json_encode(['resultado' => false]);
        }
    } else {
        echo json_encode(['resultado' => false]);
    }

?>