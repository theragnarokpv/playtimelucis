<?php
session_start();

if (isset($_SESSION['id_usuario'])) {
    $response = array('success' => true, 'id_usuario' => $_SESSION['id_usuario'], 'id_rol' => $_SESSION['id_rol']);
} else {
    $response = array('success' => false);
}


header('Content-Type: application/json');
echo json_encode($response);
?>
