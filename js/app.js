// Funcionalidad de la aplicación Pomodoro Timer

// Variables globales
let currentTask = null;
let intervalId = null;

// Función para iniciar el temporizador
function startTimer(hours, minutes, seconds, display, taskElement) {
  let totalSeconds = (hours || 0) * 3600 + (minutes || 0) * 60 + (seconds || 0);
  if (totalSeconds <= 0) {
    alert("Please enter valid time!");
    return;
  }

  let timer = totalSeconds;
  intervalId = setInterval(function () {
    let remainingHours = parseInt(timer / 3600, 10);
    let remainingMinutes = parseInt((timer % 3600) / 60, 10);
    let remainingSeconds = parseInt(timer % 60, 10);

    // Mostrar el temporizador
    document.getElementById("timer").style.display = "block";

    remainingHours =
      remainingHours < 10 ? "0" + remainingHours : remainingHours;
    remainingMinutes =
      remainingMinutes < 10 ? "0" + remainingMinutes : remainingMinutes;
    remainingSeconds =
      remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;

    display.textContent =
      remainingHours + ":" + remainingMinutes + ":" + remainingSeconds;

    if (--timer < 0) {
      clearInterval(intervalId);
      currentTask = null;
      display.textContent = "00:00:00";
      taskElement.classList.add("expired-task");
      deleteTask(taskElement.textContent.split(" (")[0]);
      // Ocultar el temporizador
      document.getElementById("timer").style.display = "none";
    }
  }, 1000);
}

// Función para mostrar tareas y asignar temporizador
function displayTasks() {
  let tasks = getTasks();
  let taskList = document.getElementById("task-list");
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    let taskElement = document.createElement("div");
    let timeString = "";

    if (task.hours) {
      timeString += `${task.hours}h `;
    }

    if (task.minutes) {
      timeString += `${task.minutes}m `;
    }

    if (task.seconds) {
      timeString += `${task.seconds}s`;
    }

    taskElement.textContent = `${task.task} (${timeString})`;

    let startButton = document.createElement("button");
    startButton.textContent = "Start";
    startButton.addEventListener("click", function () {
      if (currentTask === null) {
        currentTask = task.task;
        let display = document.getElementById("timer");
        startTimer(
          task.hours || 0,
          task.minutes || 0,
          task.seconds || 0,
          display,
          taskElement
        );
      } else {
        alert("You can only work on one task at a time!");
      }
    });

    taskElement.appendChild(startButton);
    taskList.appendChild(taskElement);
  });
}

// Llamar a la función para mostrar tareas al cargar la página
window.onload = function () {
  displayTasks();

  // Agregar manejo de eventos para el formulario
  let form = document.getElementById("task-form");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    let taskInput = document.getElementById("task-input");
    let hoursInput = document.getElementById("hours-input");
    let minutesInput = document.getElementById("minutes-input");
    let secondsInput = document.getElementById("seconds-input");

    let task = taskInput.value.trim();
    let hours = parseInt(hoursInput.value.trim()) || 0;
    let minutes = parseInt(minutesInput.value.trim()) || 0;
    let seconds = parseInt(secondsInput.value.trim()) || 0;

    if (task !== "" && (hours > 0 || minutes > 0 || seconds > 0)) {
      saveTask(task, hours, minutes, seconds);
      displayTasks();
      taskInput.value = "";
      hoursInput.value = "";
      minutesInput.value = "";
      secondsInput.value = "";
    } else {
      alert("Please enter valid task and time!");
    }
  });
};

// Función para eliminar una tarea específica
function deleteTask(taskName) {
  let tasks = getTasks();
  let newTasks = tasks.filter((task) => task.task !== taskName);
  localStorage.setItem("tasks", JSON.stringify(newTasks));
  displayTasks();
}
