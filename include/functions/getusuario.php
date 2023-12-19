<?php
session_start();

// Obtén la id_usuario de la sesión
$idUsuario = $_SESSION['id_usuario'];

include "conexion.php";

$consulta = "SELECT nombre, apellidos, correo FROM usuario WHERE id_usuario = $idUsuario";


$resultado = $conn->query($consulta);


if ($resultado->num_rows > 0) {
    $usuario = $resultado->fetch_assoc();

    header('Content-Type: application/json');
    echo json_encode($usuario);
} else {
    echo json_encode([]);
}


$conn->close();
?>