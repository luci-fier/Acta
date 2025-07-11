const calendarMonthYearElement = document.getElementById('calendar-month-year');
const calendarGridElement = document.getElementById('calendar-grid');
const prevMonthButton = document.getElementById('prev-month');
const nextMonthButton = document.getElementById('next-month');

let currentDate = new Date();
let tasks = [];

function renderCalendar(date) {
    // Clear existing calendar grid
    calendarGridElement.innerHTML = '';

    // Get month and year
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();

    // Set month and year in the header
    calendarMonthYearElement.textContent = `${month} ${year}`;

    // Get the number of days in the month
    const daysInMonth = new Date(year, date.getMonth() + 1, 0).getDate();

    // Get the first day of the month
    const firstDayOfMonth = new Date(year, date.getMonth(), 1).getDay();

    // Define day labels
    const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Create day label cells
    for (let i = 0; i < 7; i++) {
        const dayLabelCell = document.createElement('div');
        dayLabelCell.classList.add('date-cell', 'day-label');
        dayLabelCell.textContent = dayLabels[i];
        calendarGridElement.appendChild(dayLabelCell);
    }

    // Start creating the grid
    for (let i = 0; i < firstDayOfMonth; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.classList.add('date-cell', 'empty-cell');
        calendarGridElement.appendChild(emptyCell);
    }

    // Fill in the dates of the month
    for (let i = 1; i <= daysInMonth; i++) {
        const dateCell = document.createElement('div');
        dateCell.classList.add('date-cell');
        dateCell.textContent = i;
        const formattedDate = `${year}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
        dateCell.setAttribute('data-date', formattedDate);
        calendarGridElement.appendChild(dateCell);

        // Check if the date has tasks and mark the cell
        const tasksForDate = tasks.filter(task => task.due_date === formattedDate);
        if (tasksForDate.length > 0) {
            dateCell.classList.add('has-task');
        }
    }
}

// Function to go to the previous month
prevMonthButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    fetchTasks(currentDate.getFullYear(), currentDate.getMonth() + 1);
});

// Function to go to the next month
nextMonthButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    fetchTasks(currentDate.getFullYear(), currentDate.getMonth() + 1);
});

// Initial render and fetch tasks
renderCalendar(currentDate);
fetchTasks(currentDate.getFullYear(), currentDate.getMonth() + 1);

// Function to fetch tasks based on the month and year
function fetchTasks(year, month) {
    fetch(`fetch_tasks.php?year=${year}&month=${month}`)
        .then(response => response.json())
        .then(data => {
            tasks = data;
            renderCalendar(currentDate);
        })
        .catch(error => console.error('Error fetching tasks:', error));
}