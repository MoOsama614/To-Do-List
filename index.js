let text = document.querySelector("#text");
let button = document.querySelector("#button");
let content = document.querySelector(".content");
let arrOfTasks = [];
if (localStorage.getItem("tasks")) {
  arrOfTasks = JSON.parse(localStorage.getItem("tasks"));
}
getDataFromLocSto();
button.onclick = function () {
  if (text.value !== "") {
    addTaskToArray(text.value);
    text.value = "";
  }
};

function addTaskToArray(taskText) {
  let task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  arrOfTasks.push(task);
  addTasksToPage(arrOfTasks);
  addtaskstolostorage(arrOfTasks);
}

function addTasksToPage(arrOfTasks) {
  content.innerHTML = "";

  arrOfTasks.forEach((task) => {
    let div = document.createElement("div");
    div.className = "task";
    if (task.completed) {
      div.className = "task done";
    }
    div.setAttribute("data-id", task.id);
    div.textContent = task.title;

    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("delete"));
    div.appendChild(span);
    content.appendChild(div);
    content.addEventListener("click", (e) => {
      if (e.target.classList.contains("del")) {
        deletefroLocStorage(e.target.parentElement.getAttribute("data-id"));
        e.target.parentElement.remove();
      }

      if (e.target.classList.contains("task")) {
        e.target.classList.toggle("done");
        toggleElemnts(e.target.getAttribute("data-id"));
      }
    });
  });
}

function addtaskstolostorage(arrOfTasks) {
  localStorage.setItem("tasks", JSON.stringify(arrOfTasks));
}

function getDataFromLocSto() {
  let data = localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addTasksToPage(tasks);
  }
}

function deletefroLocStorage(id) {
  arrOfTasks = arrOfTasks.filter((task) => task.id != id);
  addtaskstolostorage(arrOfTasks);
}

function toggleElemnts(id) {
  for (let i = 0; i < arrOfTasks.length; i++) {
    if (arrOfTasks[i].id == id) {
      arrOfTasks[i].completed == false
        ? (arrOfTasks[i].completed = true)
        : (arrOfTasks[i].completed = false);
    }
  }
  addtaskstolostorage(arrOfTasks);
}
