//Define UI variables
const form = document.querySelector(".task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

//Load all Event Listners
loadEventListners();
function loadEventListners() {
   //DOM Event loader
   document.addEventListener("DOMContentLoaded", getTasks);

   //Add task Event
   form.addEventListener("submit", addTask);

   //Remove tasks
   taskList.addEventListener("click", removeTask);

   //clear task event
   clearBtn.addEventListener("click", clearTasks);

   //filter tasks event
   filter.addEventListener("keyup", filterTasks);
}

//Get tasks from LS
function getTasks(e) {
   let tasks;
   if (localStorage.getItem("tasks") == null) {
      tasks = [];
   } else {
      tasks = JSON.parse(localStorage.getItem("tasks"));
   }
   tasks.forEach(function (task) {
      //Create Li element
      const li = document.createElement("li");
      li.className = "collection-item";
      li.appendChild(document.createTextNode(task));

      //create new link element
      const link = document.createElement("a");
      link.className = "delete-item secondary-content";
      //Add icon
      link.innerHTML = '<i class="fa fa-remove"></i>';
      li.appendChild(link);

      //Append Li to ul
      taskList.appendChild(li);
   });
}

//Add Task
function addTask(e) {
   if (taskInput.value === "") {
      alert("Add a task");
   } else {
      //Create Li element
      const li = document.createElement("li");
      li.className = "collection-item";
      li.appendChild(document.createTextNode(taskInput.value));

      //create new link element
      const link = document.createElement("a");
      link.className = "delete-item secondary-content";
      //Add icon
      link.innerHTML = '<i class="fa fa-remove"></i>';
      li.appendChild(link);

      //Append Li to ul
      taskList.appendChild(li);

      //Store task in local storage
      storeInLS(taskInput.value);

      //clear input
      taskInput.value = "";
      e.preventDefault();
   }
}

function storeInLS(task) {
   let tasks;
   if (localStorage.getItem("tasks") == null) {
      tasks = [];
   } else {
      tasks = JSON.parse(localStorage.getItem("tasks"));
   }
   tasks.push(task);
   localStorage.setItem("tasks", JSON.stringify(tasks));
}

//Remove tasks
function removeTask(e) {
   if (e.target.parentElement.classList.contains("delete-item")) {
      e.target.parentElement.parentElement.remove();
   }
   //remove from LS
   removeTaskFromLS(e.target.parentElement.parentElement);
}

//Remove from LS
function removeTaskFromLS(taskItem) {
   let tasks;
   if (localStorage.getItem("tasks") == null) {
      tasks = [];
   } else {
      tasks = JSON.parse(localStorage.getItem("tasks"));
   }
   tasks.forEach(function (task, index) {
      if (taskItem.textContent === task) {
         tasks.splice(index, 1);
      }
   });
   localStorage.setItem("tasks", JSON.stringify(tasks));
}

//clear tasks
function clearTasks() {
   //taskList.innerHTML = "";
   //Faster
   let tasks;
   if (localStorage.getItem("tasks") == null) {
      return;
   }
   tasks = JSON.parse(localStorage.getItem("tasks"));
   if (tasks.length == 1) {
      if (confirm("Do you want to remove the Task")) {
         while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
         }
      }
   } else {
      if (confirm("Do you want to remove all Tasks")) {
         while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
         }
      }
   }
   //clear from LS
   clearTasksFromLS();
}

//clear tasks from LS
function clearTasksFromLS(e) {
   localStorage.clear();
}

//Filter tasks
function filterTasks(e) {
   const text = e.target.value.toLowerCase();
   document.querySelectorAll(".collection-item").forEach(function (task) {
      const item = task.firstChild.textContent;
      if (item.toLowerCase().indexOf(text) != -1) {
         task.style.display = "block";
      } else {
         task.style.display = "none";
      }
   });
}
