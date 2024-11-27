<?php
    include("connection.php");

    $data = file_get_contents("php://input");

    $sql_action = "DELETE p
                    FROM precios p
                    JOIN modelos l ON p.id_modelo = l.id_modelo
                    JOIN marcas a ON l.id_marca = a.id_marca
                    WHERE a.nombre_marca = ?";

    $stmt = $con->prepare($sql_action);

    if ($stmt === false) {
        echo "Error en la preparacion del script";
    }

    $stmt->bind_param("s",$data);
    
    if ($stmt->execute()) {
        echo "Operacion ejecutado con exito";
    }
    else{
        echo "No se ha recibido nada";
    }

    //!Seccion para asignar modelos
    $sql_select = "DELETE FROM modelos WHERE id_marca IN (SELECT id_marca FROM marcas WHERE nombre_marca = ?)";

    $stmt = $con->prepare($sql_select);

    if ($stmt === false) {
        echo "Error en la preparacion del script";
    }

    $stmt->bind_param("s",$data);
    
    if ($stmt->execute()) {
        echo "Operacion ejecutado con exito";
    }
    else{
        echo "No se ha recibido nada";
    }

    $sql_delete = "DELETE FROM marcas WHERE nombre_marca = ?";

    $stmt = $con->prepare($sql_delete);

    if ($stmt === false) {
        echo "Error en la preparacion del script";
    }

    $stmt->bind_param("s",$data);
    
    if ($stmt->execute()) {
        echo "Operacion ejecutado con exito";
    }
    else{
        echo "No se ha recibido nada";
    }

    $stmt->close();
    $con->close();
?>