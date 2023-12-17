<?php
    include "conexion.php";

    $rol = $_POST['rol'];
    $contrasena = password_hash($_POST['contrasena'], PASSWORD_DEFAULT);
    $nombre = $_POST['nombre'];
    $apellido = $_POST['apellido'];
    $correo = $_POST['correo'];
    $telefono = $_POST['celular'];

    $query = "INSERT INTO usuario (id_rol, password, nombre, apellidos, correo, telefono)
                VALUES (?,?,?,?,?,?)";

    $stmt = $conn->prepare($query);
    $stmt->bind_param("isssss", $rol, $contrasena, $nombre, $apellido, $correo, $telefono);

    if ($stmt->execute()) {
        $response = array('success' => true);
    } else {
        $response = array('success' => false);
    }

    header('Content-Type: application/json');
    echo json_encode($response);

?>