<?php
    include('connection.php');

    $data = file_get_contents("php://input");

    $sql_action = "INSERT INTO clientes (info_compra) VALUES (?)";

    header('Content-Type: text/plain'); // Indica que devolverá texto

    if (json_decode($data) === null && json_last_error() !== JSON_ERROR_NONE) {
        http_response_code(400); // Código HTTP 400: Solicitud incorrecta
        echo json_encode([
            "success" => false,
            "message" => "El cuerpo de la solicitud no es JSON válido."
        ]);
        exit();
    }

    $stmt = $con->prepare($sql_action);

    $stmt->bind_param("s",$data);

    if ($stmt->execute()) {
        echo "JSON insertado exitosamente en la columna `config`.";
    } else {
        echo "Error al insertar el JSON: " . $stmt->error;
    }

    $stmt->close();
    $con->close();
?>