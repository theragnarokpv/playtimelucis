<?php
session_start();

// Obtén el ID del producto a eliminar
$idProducto = $_POST['idProducto'];

// Lógica para eliminar el producto del carrito en la sesión
if (isset($_SESSION['carrito']) && in_array($idProducto, $_SESSION['carrito'])) {
    $index = array_search($idProducto, $_SESSION['carrito']);
    unset($_SESSION['carrito'][$index]);
}

// Devuelve una respuesta indicando que el producto se eliminó correctamente
$response = array('success' => true, 'message' => 'Producto eliminado del carrito');
header('Content-Type: application/json');
echo json_encode($response);
?>
