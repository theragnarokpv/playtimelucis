<?php
include "conexion.php";
session_start();

$idusuario = $_SESSION['id_usuario'];

// Consulta para obtener la información del usuario
$query = "SELECT * FROM usuario WHERE id_usuario = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $idusuario);
$stmt->execute();
$result = $stmt->get_result();

// Obtener los datos del usuario
$usuario = $result->fetch_assoc();

// Devolver la respuesta en formato JSON
header('Content-Type: application/json');
echo json_encode($usuario);
?>