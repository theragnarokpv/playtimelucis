<?php
include "conexion.php";

// Consulta para obtener la información de los productos
$query = "SELECT * FROM plataforma";
$result = $conn->query($query);

// Crear un array para almacenar los resultados
$productos = array();

// Verificar si se obtuvieron resultados
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        // Agregar cada fila como un elemento al array
        $productos[] = $row;
    }
}

// Cerrar la conexión a la base de datos
$conn->close();

// Devolver los resultados en formato JSON
header('Content-Type: application/json');
echo json_encode($productos);
?>