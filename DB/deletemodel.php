<?php
    include("connection.php");

    $json = file_get_contents('php://input');

    $data = json_decode($json,true);

    $sql_action = "DELETE FROM precios WHERE id_modelo IN (SELECT id_modelo FROM modelos WHERE nombre_modelo = ?)";

    $stmt = $con->prepare($sql_action);

    if ($stmt === false) {
        echo "Error en la preparacion del script";
    }

    $stmt->bind_param("s",$data[1]);
    
    if ($stmt->execute()) {
        echo "Operacion ejecutado con exito";
    }
    else{
        echo "No se ha recibido nada";
    }

    //!Seccion para asignar modelos
    
    $sql_select = "DELETE FROM modelos WHERE id_marca IN (SELECT id_marca FROM marcas WHERE nombre_marca = ?) AND nombre_modelo = ?";

    $stmt = $con->prepare($sql_select);

    if ($stmt === false) {
        echo "Error en la preparacion del script";
    }

    $stmt->bind_param("ss",$data[0],$data[1]);
    
    if ($stmt->execute()) {
        echo "Operacion ejecutado con exito";
    }
    else{
        echo "No se ha recibido nada";
    }

    $stmt->close();
    $con->close();
?>