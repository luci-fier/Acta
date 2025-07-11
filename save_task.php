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

// Get the task details from the request
$taskText = $_POST['task'];
$dueDate = $_POST['due_date'];
$priority = $_POST['priority'];

// Prepare and execute the SQL query
$sql = "INSERT INTO tasks (task_text, due_date, priority) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssi", $taskText, $dueDate, $priority);
$stmt->execute();

// Close the statement and connection
$stmt->close();
$conn->close();
?>