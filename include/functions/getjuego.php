<?php
include "conexion.php";

// Obtener el ID del producto desde la solicitud GET
$id_producto = $_GET['id_producto'];

// Consulta para obtener la información del producto y el nombre de la plataforma
$query = "SELECT p.*, pl.descripcion AS nombre_plataforma 
          FROM producto p 
          JOIN plataforma pl ON p.id_plataforma = pl.id_plataforma 
          WHERE p.id_producto = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $id_producto);
$stmt->execute();
$stmt->store_result();

// Verificar si se obtuvieron resultados
if ($stmt->num_rows > 0) {
    $stmt->bind_result($id_producto, $id_plataforma, $id_usuario, $descripcion, $detalle, $precio, $existencias, $ruta_imagen, $nombre_plataforma);

    // Obtener los resultados
    $stmt->fetch();

    // Crear un array con la información del producto
    $producto = array(
        'id_producto' => $id_producto,
        'id_usuario' => $id_usuario,
        'descripcion' => $descripcion,
        'detalle' => $detalle,
        'precio' => $precio,
        'existencias' => $existencias,
        'ruta_imagen' => $ruta_imagen,
        'id_plataforma' => $id_plataforma,
        'nombre_plataforma' => $nombre_plataforma
    );

    // Devolver los resultados en formato JSON
    header('Content-Type: application/json');
    echo json_encode($producto);
} else {
    // Devolver un array vacío si no se encontraron resultados
    echo json_encode([]);
}

// Cerrar la conexión a la base de datos
$stmt->close();
$conn->close();
?>
