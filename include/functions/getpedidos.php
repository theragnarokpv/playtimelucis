<?php
include "conexion.php";  // Asegúrate de incluir tu archivo de conexión

// Validar sesión iniciada
session_start();
if (!isset($_SESSION['id_usuario'])) {
    echo json_encode(['status' => 'error', 'message' => 'Sesión no iniciada']);
    exit();
}

// Obtener el ID del usuario desde la sesión
$id_usuario = $_SESSION['id_usuario'];

// Consulta para obtener el historial de pedidos del usuario
$sql = "SELECT compra.id_compra, compra.fecha_compra, GROUP_CONCAT(producto.descripcion SEPARATOR ', ') AS productos, compra.total_pagar
        FROM compra
        JOIN detalle_compra ON compra.id_compra = detalle_compra.id_compra
        JOIN producto ON detalle_compra.id_producto = producto.id_producto
        WHERE compra.id_usuario = ?
        GROUP BY compra.id_compra
        ORDER BY compra.fecha_compra DESC";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id_usuario);

$result = $stmt->execute();

if ($result) {
    $pedidos = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    echo json_encode($pedidos);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Error al obtener el historial de pedidos']);
}

$stmt->close();
$conn->close();
?>
