<?php
session_start();

// Cerrar la sesión
session_unset();
session_destroy();

$response = array('success' => true);

// Devolver la respuesta en formato JSON
header('Content-Type: application/json');
echo json_encode($response);
?>
