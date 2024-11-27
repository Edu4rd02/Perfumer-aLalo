<?php
    include('connection.php');

    $valores = [];

    $data = file_get_contents("php://input");

    $sql_action = "SELECT info_compra FROM clientes";

    $sql_limit = "SELECT COUNT(id_cliente) FROM clientes";

    $result = $con->query($sql_action);

    $valor = $con->query($sql_action);

    while ($row = $result->fetch_assoc()) {
        $valores[] = $row['info_compra'];
    }



    header('Content-Type: application/JSON'); // Indica que devolverá texto
    echo json_encode($valores); 

    $con->close();
?>