<?php
    $servername = "localhost";
    $database = "playtime";
    $username = "admin_play";
    $password = "playContra123";
    // Create connection
    $conn = mysqli_connect($servername, $username, $password, $database);
    // Check connection
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
?>