<?php
// Database configuration
$servername = "127.0.0.1"; // Change this to your database server address
$username = "root"; // Change this to your database username
$password = ""; // Change this to your database password
$database = "website"; // Change this to your database name

// Create a connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
