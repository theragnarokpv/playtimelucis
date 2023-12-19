<?php
session_start();

if (!isset($_SESSION['carrito'])) {
    $_SESSION['carrito'] = array();
}

// Recibe el ID del producto a agregar al carrito
$idProducto = $_POST['idProducto'];

// Agrega el ID del producto al carrito
$_SESSION['carrito'][] = $idProducto;

// Devuelve una respuesta indicando que el producto se agregó al carrito
$response = array('success' => true, 'message' => 'Producto agregado al carrito');
header('Content-Type: application/json');
echo json_encode($response);
?>
