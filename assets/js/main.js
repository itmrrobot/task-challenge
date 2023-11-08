const btnAdd = document.querySelector(".btn-add");
const listElement = document.querySelector(".list");
const modal = document.getElementById("myModal");
const modalDelete = document.getElementById("myModalDelete");
const closeBtn = document.querySelector(".close-icon");
const inputElement = document.querySelector("input");
const btnSetLevelHigh = document.querySelector(".high");
const btnSetLevelMedium = document.querySelector(".medium");
const btnSetLevelLow = document.querySelector(".low");
const btnAddTask = document.querySelector(".btn-add-task");
const btnDeleteTask = document.querySelector(".btn-delete");
const btnModalDeleteTask = document.querySelector(".btn-delete-task");
const btnModalEditTask = document.querySelector(".btn-edit");
const btnCancel = document.querySelector(".btn-cancel");
const items = JSON.parse(localStorage.getItem("list")) || [];
const itemId = Math.max(...items.map((o) => o.id)) || 0;
let itemValue = {
  id: itemId === -Infinity ? 0 : itemId,
  priority: "Low",
  status: "To do",
  statusIcon: "to-do-icon.svg",
};

if (inputElement.value === "") {
  btnAddTask.classList.add("disabled");
  btnAddTask.disabled = true;
}

btnAdd.onclick = function () {
  modal.style.display = "block";
  btnSetLevelLow.classList.add("low-active");
  itemValue.priority = "Low";
  btnSetLevelHigh.classList.remove("high-active");
  btnSetLevelMedium.classList.remove("medium-active");
  modal.children[0].children[0].children[0].innerHTML = "Add Task";
  modal.children[0].children[3].children[0].remove();
  inputElement.value = "";
  inputElement.placeholder = "Type your task here...";
  modal.children[0].children[3].innerHTML = `<button class="btn-add-task disabled" onclick="addTask()">Add</button>`;
};

closeBtn.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (e) {
  if (e.target == modal) {
    modal.style.display = "none";
  }
};

inputElement.onchange = function (e) {
  itemValue.name = e.target.value;
  let btnAddTaskModal = modal.children[0].children[3].children[0];
  if (e.target.value !== "") {
    btnAddTaskModal.classList.remove("disabled");
    btnAddTaskModal.classList.add("active");
    btnAddTaskModal.disabled = false;
  } else {
    btnAddTaskModal.classList.add("disabled");
    btnAddTaskModal.disabled = true;
  }
};

btnSetLevelHigh.onclick = function () {
  btnSetLevelHigh.classList.toggle("high-active");
  if (btnSetLevelHigh.classList.contains("high-active") == true) {
    itemValue.priority = "High";
    btnSetLevelLow.classList.remove("low-active");
    btnSetLevelMedium.classList.remove("medium-active");
  }
};

btnSetLevelMedium.onclick = function () {
  btnSetLevelMedium.classList.toggle("medium-active");
  if (btnSetLevelMedium.classList.contains("medium-active") == true) {
    itemValue.priority = "Medium";
    btnSetLevelHigh.classList.remove("high-active");
    btnSetLevelLow.classList.remove("low-active");
  }
};

btnSetLevelLow.onclick = function () {
  btnSetLevelLow.classList.toggle("low-active");
  if (btnSetLevelLow.classList.contains("low-active") == true) {
    itemValue.priority = "Low";
    btnSetLevelHigh.classList.remove("high-active");
    btnSetLevelMedium.classList.remove("medium-active");
  }
};

function showModalDelete(id) {
  modalDelete.style.display = "block";
  modalDelete.id = id;
}

function showModalEdit(id) {
  modal.style.display = "block";
  btnSetLevelLow.classList.add("low-active");
  itemValue.priority = "Low";
  btnSetLevelHigh.classList.remove("high-active");
  btnSetLevelMedium.classList.remove("medium-active");
  modal.children[0].children[0].children[0].innerHTML = "Edit Task";
  modal.children[0].children[3].children[0].remove();
  inputElement.placeholder = "Task name";
  modal.children[0].children[3].innerHTML = `<button class='btn-edit-task active' onclick='editTask(${id})'>Edit</button>`;
  const item = items.filter((item) => item.id === id);
  inputElement.value = item[0].name;
}

function addPriorityColor() {
  if (listElement.hasChildNodes()) {
    for (let i = 0; i < listElement.childElementCount; i++) {
      const priorityElement =
        listElement.children[i].children[1].children[0].children[1];
      if (priorityElement.innerHTML === "Low") {
        priorityElement.classList.add("low-color");
      } else if (priorityElement.innerHTML === "High") {
        priorityElement.classList.add("high-color");
      } else {
        priorityElement.classList.add("medium-color");
      }
    }
  }
}

function listItems() {
  let list = "";
  for (let i = 0; i < items.length; i++) {
    list += "<div class='item'>";
    list += `<div class="wrap-name">
                <h4 class="sub-title">Task</h4>
                <div class="name">${items[i].name}</div>
             </div>
             <div class="wrapper">
                <div class="wrap-priority">
                  <div class="priority-name">Priority</div>
                  <div class="priority-level">${items[i].priority}</div>
                </div>
                <div class="status" onclick="changeStatus(${items[i].id})">${items[i].status}</div>
                <img
                  src="./assets/img/${items[i].statusIcon}"
                  alt="status-icon"
                  class="status-icon"
                />
             </div>
             <div class="group-btn">
                <div class="btn-edit" onclick="showModalEdit(${items[i].id})">
                  <img
                    src="./assets/img/edit-icon.svg"
                    alt="edit-icon"
                    class="edit-icon"
                  />
                </div>
                <div class="btn-delete" onclick="showModalDelete(${items[i].id})">
                  <img
                    src="./assets/img/delete-icon.svg"
                    alt="delete-icon"
                    class="delete-icon"
                  />
                </div>
            </div>`;
    list += "</div>";
    listElement.innerHTML = list;
    addPriorityColor();
  }
}

function addTask() {
  if (inputElement.value !== "") {
    itemValue.id += 1;
    items.unshift({
      id: itemValue.id,
      name: inputElement.value,
      priority: itemValue.priority,
      status: itemValue.status,
      statusIcon: itemValue.statusIcon,
    });
    localStorage.setItem("list", JSON.stringify(items));
    listItems();
    modal.style.display = "none";
    inputElement.value = "";
    btnAddTask.classList.add("disabled");
    btnAddTask.disabled = true;
  }
}

function deleteTask() {
  const id = Number(modalDelete.id);
  const check = items.findIndex((item) => Number(item.id) === id);
  if (check !== -1) {
    items.splice(check, 1);
    localStorage.setItem("list", JSON.stringify(items));
    listItems();
  }
  modalDelete.style.display = "none";
}

btnCancel.onclick = function () {
  modalDelete.style.display = "none";
};

function editTask(id) {
  if (inputElement.value !== "") {
    const task = items.filter((item) => item.id == id);
    task[0].name = inputElement.value;
    task[0].priority = itemValue.priority;
    localStorage.setItem("list", JSON.stringify(items));
    modal.style.display = "none";
    listItems();
  }
}

function changeStatus(id) {
  const item = items.filter((item) => item.id == id);
  if (item[0].status === "To do") {
    item[0].status = "In progress";
    item[0].statusIcon = "in-progress-icon.svg";
  } else if (item[0].status === "In progress") {
    item[0].status = "Done";
    item[0].statusIcon = "done-icon.svg";
  } else {
    item[0].status = "To do";
    item[0].statusIcon = "to-do-icon.svg";
  }
  localStorage.setItem("list", JSON.stringify(items));
  listItems();
}

(function () {
  btnSetLevelLow.classList.add("low-active");
  listItems();
})();
