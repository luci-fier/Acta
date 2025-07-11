const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const dueDateInput = document.getElementById('due-date-input');
const priorityInput = document.getElementById('priority-input');
const taskList = document.getElementById('task-list');
const searchInput = document.getElementById('search-input');
const statusFilter = document.getElementById('status-filter');

// Load tasks from localStorage on page load
window.addEventListener('load', function() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(function(task) {
        const taskItem = document.createElement('li');
        const taskTextSpan = document.createElement('span');
        taskTextSpan.textContent = `${task.text} (Due: ${task.dueDate}, Priority: ${task.priority})`;
        taskTextSpan.classList.add('task-text');
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-times"></i>';
        deleteButton.classList.add('delete-btn');
        deleteButton.addEventListener('click', deleteTask);
        taskItem.appendChild(taskTextSpan);
        taskItem.appendChild(deleteButton);
        taskList.appendChild(taskItem);
    });
});

taskForm.addEventListener('submit', addTask);
searchInput.addEventListener('input', filterTasks);
statusFilter.addEventListener('change', filterTasks);

function addTask(e) {
    e.preventDefault();
    const taskText = taskInput.value.trim();
    const dueDate = dueDateInput.value;
    const priority = priorityInput.value;
    if (taskText !== '' && dueDate !== '' && priority !== '') {
        // Add task to the UI
        const taskItem = createTaskItem(taskText, dueDate, priority, 'pending');
        taskList.appendChild(taskItem);
        taskInput.value = '';
        dueDateInput.value = '';
        priorityInput.value = '';

        // Save task to the database and localStorage
        saveTaskToDatabase(taskText, dueDate, priority, 'pending');
        saveTaskToLocalStorage(taskText, dueDate, priority, 'pending');
    }
}

function createTaskItem(taskText, dueDate, priority, status) {
    const taskItem = document.createElement('li');
    taskItem.classList.add('task-item');

    const taskCheckbox = document.createElement('input');
    taskCheckbox.type = 'checkbox';
    taskCheckbox.checked = status === 'completed';
    taskCheckbox.addEventListener('change', toggleTaskStatus);

    const taskTextSpan = document.createElement('span');
    taskTextSpan.textContent = `${taskText} (Due: ${dueDate}, Priority: ${priority})`;
    taskTextSpan.classList.add('task-text');

    const priorityIcon = document.createElement('i');
    priorityIcon.classList.add('fas', `priority-${priority}`);

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-times"></i>';
    deleteButton.classList.add('delete-btn');
    deleteButton.addEventListener('click', deleteTask);

    taskItem.appendChild(taskCheckbox);
    taskItem.appendChild(taskTextSpan);
    taskItem.appendChild(priorityIcon);
    taskItem.appendChild(deleteButton);

    return taskItem;
}

function toggleTaskStatus(e) {
    const taskItem = e.target.parentNode;
    const taskText = taskItem.querySelector('.task-text').textContent.split(' (')[0];
    const status = e.target.checked ? 'completed' : 'pending';
    taskItem.classList.toggle('completed', status === 'completed');

    // Update task status in localStorage
    updateTaskStatusInLocalStorage(taskText, status);

    // Update task status in the database (you'll need to implement this)
    // updateTaskStatusInDatabase(taskText, status);
}

function filterTasks() {
    const searchText = searchInput.value.toLowerCase();
    const statusFilter = document.getElementById('status-filter').value;
    const taskItems = taskList.getElementsByTagName('li');

    for (let i = 0; i < taskItems.length; i++) {
        const taskItem = taskItems[i];
        const taskText = taskItem.querySelector('.task-text').textContent.toLowerCase();
        const taskStatus = taskItem.querySelector('input[type="checkbox"]').checked ? 'completed' : 'pending';

        const shouldShow =
            (searchText === '' || taskText.includes(searchText)) &&
            (statusFilter === 'all' || statusFilter === taskStatus);

        taskItem.style.display = shouldShow ? 'flex' : 'none';
    }
}
function deleteTask(e) {
    const taskItem = e.target.closest('li'); // Get the nearest parent <li> element
    const taskText = taskItem.firstChild.textContent.split(' (')[0];
    taskList.removeChild(taskItem);

    // Delete task from the database
    deleteTaskFromDatabase(taskText);

    // Delete task from localStorage
    deleteTaskFromLocalStorage(taskText);
}

// Function to save task to the database
function saveTaskToDatabase(taskText, dueDate, priority) {
    const xhr = new XMLHttpRequest();
    const url = 'save_task.php';
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            console.log(xhr.responseText);
        }
    };
    xhr.send(`task=${encodeURIComponent(taskText)}&due_date=${encodeURIComponent(dueDate)}&priority=${encodeURIComponent(priority)}`);
}

// Function to delete task from the database
function deleteTaskFromDatabase(taskText) {
    const xhr = new XMLHttpRequest();
    const url = 'delete_task.php';
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            console.log(xhr.responseText);
        }
    };
    xhr.send('task=' + encodeURIComponent(taskText));
}

// Function to save task to localStorage
function saveTaskToLocalStorage(taskText, dueDate, priority) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ text: taskText, dueDate, priority });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to delete task from localStorage
function deleteTaskFromLocalStorage(taskText) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}