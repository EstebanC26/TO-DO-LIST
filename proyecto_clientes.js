document.addEventListener("DOMContentLoaded", () => {
    const API_URL = "https://jsonplaceholder.typicode.com/todos";
    const taskList = document.getElementById("taskList");
    const completedList = document.getElementById("completedList");
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTaskButton");
    let tasks = [];
    
    function showNotification(message) {
        alert(message);
    }

    async function fetchTasks() {
        try {
            const response = await fetch(API_URL + "?limit=10");
            tasks = await response.json();
            renderTasks();
        } catch (error) {
            showNotification("Error al cargar las tareas");
        }
    }

    function renderTasks() {
        taskList.innerHTML = "";
        completedList.innerHTML = "";
        tasks.forEach(task => {
            const li = document.createElement("li");
            li.textContent = task.title;
            li.dataset.id = task.id;
            li.className = "task-item";
            const toggleButton = document.createElement("button");
            toggleButton.textContent = task.completed ? "Marcar como no completada" : "Marcar como completada";
            toggleButton.onclick = () => toggleTaskStatus(task.id);
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Eliminar";
            deleteButton.onclick = () => deleteTask(task.id);
            li.appendChild(toggleButton);
            li.appendChild(deleteButton);
            (task.completed ? completedList : taskList).appendChild(li);
        });
    }

    function addTask() {
        const title = taskInput.value.trim();
        if (!title) {
            showNotification("Por favor, introduce un título de tarea");
            return;
        }
        const newTask = { id: Date.now(), title, completed: false };
        tasks.push(newTask);
        renderTasks();
        taskInput.value = "";
        showNotification("Tarea agregada correctamente");
    }

    function deleteTask(id) {
        tasks = tasks.filter(task => task.id !== id);
        renderTasks();
        showNotification("Tarea eliminada");
    }

    function toggleTaskStatus(id) {
        tasks = tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task);
        renderTasks();
        showNotification("Estado de la tarea actualizado");
    }

    addTaskButton.addEventListener("click", addTask);
    fetchTasks();
});
