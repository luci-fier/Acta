// Quick Task functionality
const quickTaskForm = document.getElementById('quick-task-form');
const quickTaskInput = document.getElementById('quick-task-input');
const quickTaskList = document.getElementById('quick-task-list');

quickTaskForm.addEventListener('submit', addQuickTask);

function addQuickTask(e) {
    e.preventDefault();
    const taskText = quickTaskInput.value.trim();
    if (taskText !== '') {
        const taskItem = document.createElement('li');
        const taskTextSpan = document.createElement('span');
        taskTextSpan.textContent = taskText;
        taskTextSpan.classList.add('task-text');
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-times"></i>';
        deleteButton.classList.add('delete-btn');
        deleteButton.addEventListener('click', deleteQuickTask);
        taskItem.appendChild(taskTextSpan);
        taskItem.appendChild(deleteButton);
        quickTaskList.appendChild(taskItem);
        quickTaskInput.value = '';
    }
}

function deleteQuickTask(e) {
    const taskItem = e.target.parentNode;
    quickTaskList.removeChild(taskItem);
}