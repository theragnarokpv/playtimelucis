<?php
// pruebas_autenticacion.php

include "include/functions/conexion.php"; // Asegúrate de tener un archivo de conexión

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $correo = $_POST['correo'];
    $contrasena = $_POST['contrasena'];

    // Consulta para obtener la contraseña almacenada en la base de datos
    $query = "SELECT id_usuario, password FROM usuario WHERE correo = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $correo);
    $stmt->execute();
    $stmt->store_result();

    // Verificar si se obtuvieron resultados
    if ($stmt->num_rows > 0) {
        $stmt->bind_result($idUsuario, $hashedPassword);
        $stmt->fetch();

        // Verificar la contraseña utilizando password_verify
        if (password_verify($contrasena, $hashedPassword)) {
            // Credenciales válidas
            echo "Inicio de sesión exitoso para el usuario con ID: " . $idUsuario;
        } else {
            // Credenciales inválidas
            echo "Inicio de sesión fallido. Verifica tus credenciales.";
        }
    } else {
        // Credenciales inválidas (correo no encontrado)
        echo "Inicio de sesión fallido. Correo no encontrado.";
    }

    // Cerrar la conexión a la base de datos
    $stmt->close();
    $conn->close();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pruebas de Autenticación</title>
</head>
<body>
    <h2>Pruebas de Autenticación</h2>
    <form method="post">
        <label for="correo">Correo Electrónico:</label>
        <input type="email" name="correo" required><br>

        <label for="contrasena">Contraseña:</label>
        <input type="password" name="contrasena" required><br>

        <button type="submit">Iniciar Sesión</button>
    </form>
</body>
</html>
