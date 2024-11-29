// DOM Elements
const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');

// Load tasks from localStorage
const loadTasks = () => {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  taskList.innerHTML = '';
  tasks.forEach((task, index) => addTaskToDOM(task, index));
};

// Add task to DOM
const addTaskToDOM = (task, index) => {
  const li = document.createElement('li');
  li.classList.add('task-item');
  li.innerHTML = `
    <span>${task}</span>
    <div>
      <button onclick="editTask(${index})">Edit</button>
      <button onclick="deleteTask(${index})">Delete</button>
    </div>
  `;
  taskList.appendChild(li);
};

// Add task
const addTask = () => {
  const task = taskInput.value.trim();
  if (!task) return alert('Please enter a task!');
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  taskInput.value = '';
  loadTasks();
};

// Edit task
const editTask = (index) => {
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  const newTask = prompt('Edit your task:', tasks[index]);
  if (newTask !== null) {
    tasks[index] = newTask;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
  }
};

// Delete task
const deleteTask = (index) => {
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  tasks.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  loadTasks();
};

// Event Listeners
addBtn.addEventListener('click', addTask);
document.addEventListener('DOMContentLoaded', loadTasks);