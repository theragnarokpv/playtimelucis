<?php
include "conexion.php";
session_start();

// Verificar si se reciben datos del formulario
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Obtener datos del formulario
    $direccion = $_POST['direccion'];
    $totalPagar = $_POST['total_pagar'];
    $productos = $_POST['productos'];

    // Insertar datos en la tabla 'compra'
    $sqlCompra = "INSERT INTO compra (id_usuario, total_pagar, datos_direccion) VALUES (?, ?, ?)";
    $stmtCompra = $conn->prepare($sqlCompra);
    $stmtCompra->bind_param("ids", $idUsuario, $totalPagar, $direccion);

    // Aquí deberías obtener el ID del usuario de la sesión o de alguna manera adecuada
    $idUsuario = 1; // Ajusta esto según tu lógica de usuario

    if ($stmtCompra->execute()) {
        // Obtener el ID de la última compra insertada
        $idCompra = $conn->insert_id;

        // Insertar datos en la tabla 'detalle_compra' para cada producto en el carrito
        $sqlDetalle = "INSERT INTO detalle_compra (id_compra, id_producto, cantidad, precio_unitario, subtotal) VALUES (?, ?, ?, ?, ?)";
        $stmtDetalle = $conn->prepare($sqlDetalle);
        $stmtDetalle->bind_param("iiidd", $idCompra, $idProducto, $cantidad, $precioUnitario, $subtotal);

        foreach ($productos as $producto) {
            $idProducto = $producto['id_producto'];
            $cantidad = 1; // Puedes ajustar esto según la lógica de tu carrito
            $precioUnitario = $producto['precio'];
            $subtotal = $precioUnitario * $cantidad;

            $stmtDetalle->execute();
        }

        // Cerrar conexiones
        $stmtCompra->close();
        $stmtDetalle->close();
        $conn->close();

        // Enviar una respuesta al cliente (puedes enviar más información según tus necesidades)
        $respuesta = array('success' => true, 'idCompra' => $idCompra);
        header('Content-Type: application/json');
        echo json_encode($respuesta);
    } else {
        // Error al insertar en la tabla 'compra'
        echo "Error al procesar la compra";
    }
} else {
    // Si la solicitud no es de tipo POST
    echo "Acceso no permitido";
}
?>
