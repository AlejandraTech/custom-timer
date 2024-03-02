// Manejo de tareas

// Función para guardar una nueva tarea
function saveTask(task, hours, minutes, seconds) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ task, hours, minutes, seconds });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Función para obtener todas las tareas guardadas
function getTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

// Función para limpiar todas las tareas guardadas
function clearTasks() {
  localStorage.removeItem("tasks");
}

// Función para eliminar una tarea específica
function deleteTask(taskName) {
  let tasks = getTasks();
  let newTasks = tasks.filter((task) => task.task !== taskName);
  localStorage.setItem("tasks", JSON.stringify(newTasks));
}
