let task = [];

const taskTitle = document.getElementById("title-input");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("task-list");

const addField = document.getElementById("add-new");
const addTaskField = document.getElementById("task-title");

const message = document.getElementById("message");

document.addEventListener("DOMContentLoaded", () => renderTask(false));

addField.addEventListener("click", () => {
  addTaskField.classList.toggle("d-none");
});

function addTask() {
  const taskName = taskTitle.value.trim();

    if (taskName !== "") {
      task.push({
        name: taskName,
        state: false,
      });
      localStorage.setItem("tasks", JSON.stringify(task));
      taskTitle.value = "";
      message.innerHTML = "Task added successfully";
      renderTask(false);
      setTimeout(() => {
        message.innerHTML = "";
      }, 2000);
    } else {
        message.innerHTML = "Taskname must not be empty";
    }

}

function renderTask(checkCondition) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  taskList.innerHTML = "";
  tasks
    .filter((task) => task.state === checkCondition)
    .forEach((task, index) => {
      const div = document.createElement("div");
      div.className = "task";
      const header = document.createElement("p");
      header.textContent = task.name;

      var tickBox = document.createElement("input");
      tickBox.type = "checkbox";

      tickBox.addEventListener("change", () => {
        tasks[index].state = "true";
        localStorage.setItem("tasks", JSON.stringify(tasks));
        setTimeout(() => {
          div.className = "task-complete";
          message.innerHTML = "Task Completed";
          renderTask(false);
        }, 3000);
      });

      div.prepend(tickBox);
      div.append(header);
      taskList.appendChild(div);
    });
}
