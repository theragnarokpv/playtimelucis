<?php
include "conexion.php";
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Validar sesión iniciada
session_start();
if (!isset($_SESSION['id_usuario'])) {
    echo json_encode(['status' => 'error', 'message' => 'Sesión no iniciada']);
    exit();
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $id_plataforma = $_POST["id_plataforma"];
    $id_usuario = $_SESSION['id_usuario'];
    $descripcion = $_POST["nombre"];
    $detalle = $_POST["detalle"];
    $precio = $_POST["precio"];
    $existencias = $_POST["existencias"];

    $archivo_nombre = $_FILES['ruta_imagen']['name'];
    $archivo_tmp = $_FILES['ruta_imagen']['tmp_name'];
    $archivo_tipo = $_FILES['ruta_imagen']['type'];

    $permitidos = array('image/jpeg', 'image/jpg', 'image/png');

    if (in_array($archivo_tipo, $permitidos)) {
        $carpeta_destino = '../../server/productos/';
        $archivo_destino = $carpeta_destino . $archivo_nombre;

        if (move_uploaded_file($archivo_tmp, $archivo_destino)) {
            $ruta_guardar_bd = str_replace('../../server', '/playtimelucis-1/server', $archivo_destino);

            $sql = "INSERT INTO producto(id_plataforma, id_usuario, descripcion, detalle, precio, existencias, ruta_imagen)
                    VALUES (?, ?, ?, ?, ?, ?, ?)";

            $stmt = $conn->prepare($sql);

            $stmt->bind_param("iissdis", $id_plataforma, $id_usuario, $descripcion, $detalle, $precio, $existencias, $ruta_guardar_bd);

            try {
                $stmt->execute();
                $idProducto = $conn->insert_id;
                $response = ['status' => 'success', 'idProducto' => $idProducto, 'message' => 'Producto agregado con éxito'];
            } catch (PDOException $e) {
                $response = ['status' => 'error', 'message' => 'Error al agregar el producto: ' . $e->getMessage()];
            }
        } else {
            $response = ['status' => 'error', 'message' => 'Error al cargar el archivo'];
        }
    } else {
        $response = ['status' => 'error', 'message' => 'Formato de archivo no permitido. Sube una imagen en formato JPEG, JPG o PNG.'];
    }

    // Devolver la respuesta al cliente (JavaScript)
    echo json_encode($response);
}
?>
