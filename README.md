# Acta - Task Management System

Acta is a modern, web-based task management system that helps you organize, track, and manage your personal or professional tasks with ease. Featuring a clean interface, calendar integration, and productivity reports, Acta empowers you to stay productive and efficient every day.

---

## 🌟 Features

- **Task Lists:** Add, edit, delete, search, prioritize, and filter tasks.
- **Calendar View:** Visualize your schedule and deadlines in a monthly calendar.
- **Quick Notes:** Capture ideas and notes instantly for later follow-up.
- **Progress Reporting:** View your productivity and completed tasks with reports.
- **Priority & Due Dates:** Assign priorities and deadlines to your tasks.
- **Persistent Storage:** Tasks are saved via localStorage and in a backend database (PHP/MySQL).
- **Responsive UI:** Works across desktop and mobile browsers.

---

## 🗂️ Project Structure

```
Acta/
│
├── index.html         # Landing page with login/signup
├── home.html          # Home/dashboard page
├── tasks.html         # Main task management interface
├── calendar.html      # Calendar view
├── styles.css         # Main styling
├── task.css           # Task-specific styling
├── calendar.css       # Calendar styling
├── script.js          # Quick notes functionality
├── tasks.js           # Task CRUD, filters, localStorage, AJAX
├── calendar.js        # Calendar rendering, task fetch
│
├── save_task.php      # PHP endpoint to save tasks to database
├── fetch_task.php     # PHP endpoint to fetch tasks for calendar
├── delete_task.php    # PHP endpoint to delete tasks
│
└── README.md
```

---

## ⚙️ How to Run

### Requirements

- Web server (e.g., Apache, Nginx, XAMPP, or similar)
- PHP (v7+)
- MySQL/MariaDB
- Modern browser

### 1. **Clone the Repository**

```sh
git clone https://github.com/luci-fier/Acta.git
```

### 2. **Set Up the Backend**

- Create a MySQL database named `task_management`.
- Import the following table structure:

```sql
CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    task_text VARCHAR(255) NOT NULL,
    due_date DATE,
    priority INT
);
```

- Update your database credentials in `save_task.php`, `fetch_task.php`, and `delete_task.php` if necessary.

### 3. **Serve the Project**

- Place the project folder in your web server's root directory (e.g., `htdocs` for XAMPP).
- Start Apache (and MySQL if using XAMPP).
- Access the app via [http://localhost/Acta/home.html](http://localhost/Acta/home.html).

### 4. **Using Acta**

- **Home Dashboard:** Overview, features, and quick notes.
- **Tasks:** Add, edit, delete, and filter your tasks. Set priorities and due dates.
- **Calendar:** Visualize all tasks for the selected month.
- **Reports:** (Coming soon) Track your productivity.

---

## 📋 Task Management

- **Add a Task:** Fill in the task details and submit.
- **Set Priority & Due Date:** Choose from Low, Medium, High priority and a due date.
- **Filter/Search:** Use the search bar and status dropdown to quickly find tasks.
- **Calendar Integration:** View tasks on the calendar for quick deadline tracking.

---

## 🖥️ Technologies Used

- **Frontend:** HTML, CSS, JavaScript, Font Awesome
- **Backend:** PHP (AJAX endpoints)
- **Database:** MySQL/MariaDB
- **Storage:** LocalStorage (browser) and MySQL (server)

---
