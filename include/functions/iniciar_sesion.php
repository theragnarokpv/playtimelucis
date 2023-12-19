<?php
include "conexion.php";
session_start();

$correo = $_POST['correo'];
$contrasena = $_POST['contrasena'];


$query = "SELECT id_usuario, id_rol, password FROM usuario WHERE correo = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("s", $correo);
$stmt->execute();
$stmt->store_result();

// Verificar si se obtuvieron resultados
if ($stmt->num_rows > 0) {
    $stmt->bind_result($idUsuario, $idRol, $hashedPassword);
    $stmt->fetch();

    // Verificar la contraseña utilizando password_verify
    if (password_verify($contrasena, $hashedPassword)) {
        // Credenciales válidas
        $_SESSION['id_usuario'] = $idUsuario;
        $_SESSION['id_rol'] = $idRol;

        
        $response = array('success' => true);
    } else {
        // Credenciales inválidas
        $response = array('success' => false);
    }
} else {
    // Credenciales inválidas (correo no encontrado)
    $response = array('success' => false);
}

// Devolver la respuesta en formato JSON
header('Content-Type: application/json');
echo json_encode($response);

// Cerrar la conexión a la base de datos
$stmt->close();
$conn->close();
?>