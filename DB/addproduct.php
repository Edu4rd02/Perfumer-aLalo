<?php
    include("connection.php");

    $json = file_get_contents('php://input');

    $data = json_decode($json,true);

    $sql_action = "INSERT INTO marcas (nombre_marca) VALUES (?)";

    $stmt = $con->prepare($sql_action);

    if ($stmt === false) {
        echo "Error en la preparacion del script";
    }

    $stmt->bind_param("s",$data[0]);
    
    if ($stmt->execute()) {
        echo "Operacion ejecutado con exito";
    }
    else{
        echo "No se ha recibido nada";
    }

    //!Seccion para asignar modelos
    $sql_select = "SELECT id_marca FROM marcas WHERE nombre_marca = ?";

    $stmt = $con->prepare($sql_select);
    $stmt->bind_param("s",$data[0]);
    $stmt->execute();

    $result = $stmt->get_result();

    //Transformo el objeto devuelto de la consulta en un array al que puedo acceder que contiene el valor del ID
    $id = $result->fetch_assoc(); 

    $sql_action = "INSERT INTO modelos (nombre_modelo,id_marca) VALUES (?,?)";

    $stmt = $con->prepare($sql_action);

    if ($stmt === false) {
        echo "Error en la preparacion del script";
    }

    $stmt->bind_param("si",$data[1], $id['id_marca']);
    
    if ($stmt->execute()) {
        echo "Operacion ejecutado con exito";
    }
    else{
        echo "Fallo en la matrix";
    }
    
    //!SECCION PRECIOS
    $sql_select = "SELECT id_modelo FROM modelos WHERE nombre_modelo = ?";

    $stmt = $con->prepare($sql_select);
    $stmt->bind_param("s",$data[1]);
    $stmt->execute();

    $result = $stmt->get_result();

    //Transformo el objeto devuelto de la consulta en un array al que puedo acceder que contiene el valor del ID
    $id = $result->fetch_assoc(); 

    $sql_action = "INSERT INTO precios (capacidad,precio,id_modelo) VALUES (?,?,?);";

    $stmt = $con->prepare($sql_action);

    if ($stmt === false) {
        echo "Error en la preparacion del script";
    }

    for ($i=2; $i < count($data); $i+=2) { 
        $precio = (int)$data[$i+1];
        $stmt->bind_param("iii",$data[$i],$precio, $id['id_modelo']);
        
        if ($stmt->execute()) {
            echo "Operacion ejecutado con exito";
        }
        else{
            echo "Fallo en la matrix";
        }
    }

    $stmt->close();
    $con->close();
?>