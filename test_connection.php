<?php
// Include the database connection script
include('database.php');

// Check if the connection was successful
if ($conn) {
    echo "Connected to the database successfully!";
} else {
    echo "Connection failed. Check your database configuration.";
}
?>
