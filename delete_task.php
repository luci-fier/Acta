<?php
// Database connection details
$servername = "localhost";
$username = "root";
$password = "raksha";
$database = "task_management";

// Create a connection
$conn = new mysqli($servername, $username, $password, $database);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the task text from the request
$taskText = $_POST['task'];

// Prepare and execute the SQL query
$sql = "DELETE FROM tasks WHERE task_text = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $taskText);
$stmt->execute();

// Close the statement and connection
$stmt->close();
$conn->close();
?>