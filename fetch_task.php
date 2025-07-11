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

// Fetch tasks based on the month and year
$year = $_GET['year'];
$month = $_GET['month'];

$sql = "SELECT *, DATE_FORMAT(due_date, '%Y-%m-%d') AS formatted_due_date FROM tasks WHERE YEAR(due_date) = $year AND MONTH(due_date) = $month";
$result = $conn->query($sql);

$tasks = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $task = array(
            'id' => $row['id'],
            'text' => $row['text'],
            'due_date' => $row['formatted_due_date']
        );
        $tasks[] = $task;
    }
}

// Close database connection
$conn->close();

// Return tasks as JSON data
header('Content-Type: application/json');
echo json_encode($tasks);
?>