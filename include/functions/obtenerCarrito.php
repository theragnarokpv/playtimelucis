<?php
include "conexion.php";
session_start();

// Verifica si la sesión del carrito está configurada
if (isset($_SESSION['carrito']) && !empty($_SESSION['carrito'])) {
    // Convierte los IDs del carrito en una cadena para la consulta SQL
    $idProductos = implode(',', $_SESSION['carrito']);

    // Consulta para obtener detalles de productos en el carrito
    $consulta = "SELECT id_producto, descripcion, precio FROM producto WHERE id_producto IN ($idProductos)";

    // Ejecuta la consulta
    $resultado = $conn->query($consulta);

    // Verifica si hay resultados
    if ($resultado->num_rows > 0) {
        // Recorre los resultados y los almacena en un array
        $productosEnCarrito = array();
        while ($row = $resultado->fetch_assoc()) {
            // Convierte el valor de "precio" a un tipo numérico
            $row['precio'] = (float)$row['precio'];
            $productosEnCarrito[] = $row;
        }

        // Devuelve los detalles de los productos en formato JSON
        header('Content-Type: application/json');
        echo json_encode($productosEnCarrito);
    } else {
        // Devuelve un array vacío si no hay productos en el carrito
        echo json_encode([]);
    }

    // Cierra la conexión a la base de datos
    $conn->close();
} else {
    // Devuelve un array vacío si no hay productos en el carrito
    echo json_encode([]);
}
?>
