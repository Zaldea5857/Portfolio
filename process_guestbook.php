<?php
// Check if the form was submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Database connection settings
    $dbHost = '127.0.0.1';
    $dbUser = 'root';
    $dbPass = '';
    $dbName = 'website';

    // Create a database connection
    $conn = new mysqli($dbHost, $dbUser, $dbPass, $dbName);

    // Check the connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Get form data
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    // Check if the user has already left 5 messages
    $userEmail = $conn->real_escape_string($email);
    $checkQuery = "SELECT COUNT(*) AS message_count FROM guestbook WHERE Email = '$userEmail'";
    $result = $conn->query($checkQuery);
    $row = $result->fetch_assoc();
    $messageCount = $row['message_count'];

    if ($messageCount >= 5) {
        echo "You have already left 5 messages. You cannot leave more messages.";
    } else {
        // Create an SQL insert statement
        $sql = "INSERT INTO guestbook (Name, Email, Message, entry_date) VALUES (?, ?, ?, NOW())";

        // Prepare and execute the SQL statement
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sss", $name, $email, $message);

        if ($stmt->execute()) {
            // Return a success message with a notification
            echo "Thank you! Your message has been submitted.";
        } else {
            echo "Error: " . $stmt->error;
        }
        if ($stmt->execute()) {
            echo json_encode(["status" => "success", "message" => "Thank you! Your message has been submitted."]);
        } else {
            echo json_encode(["status" => "error", "message" => "Error: " . $stmt->error]);
        }
        

        // Close the statement
        $stmt->close();
    }

    // Close the connection
    $conn->close();
} else {
    echo "Form not submitted.";
}

?>
