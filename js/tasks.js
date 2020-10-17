class AllListContainer {
  constructor() {
    this.lists = {};
  }
  addList(name) {
    const id = randomId();
    const newList = new List(id, name);
    this.lists[id] = newList;
    this.renderLists();
    return newList;
  }
  getList(id) {
    return this.lists[id];
  }
  removeList(id) {
    delete this.lists[id];
  }
  removeAllLists() {
    delete this.lists;
    this.lists = {};
  }
  renderLists() {
    document.getElementById("listOfLists").innerHTML = "";
    let allLists = "";
    for (const id in this.lists) {
      const list = this.lists[id];
      allLists += `
            <div id="${list.id}" class="actualListName h5 pb-4 pt-4" onclick="selectList(${list.id})">
                <p>${list.name}</p>
                <div class="deleteWrapperList" onclick="deleteCurrentList(event)">
                    <img class="trashImgList" src="./assets/trash-can.png"/>
                </div>
            </div>
            `;
    }
    document
      .getElementById("listOfLists")
      .insertAdjacentHTML("beforeend", allLists);
  }
  saveData() {
    localStorage.setItem("allLists", JSON.stringify(allLists.lists));
  }
  loadData() {
    const savedData = localStorage.getItem("allLists");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      for (const listId in parsedData) {
        const list = parsedData[listId];
        this.lists[listId] = new List(list.id, list.name);
        for (const taskId in list.tasks) {
          const task = list.tasks[taskId];
          this.lists[listId].tasks[taskId] = new Task(
            task.id,
            task.name,
            task.isComplete
          );
        }
      }
    }
  }
}

class Task {
  constructor(id, name, isComplete = false) {
    this.id = id;
    this.name = name;
    this.isComplete = isComplete;
  }
  editTask(name) {
    this.name = name;
  }
  toggleComplete() {
      this.isComplete = !this.isComplete;
  }
}

class List {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.tasks = {};
  }
  addTask(name) {
    const id = randomId();
    this.tasks[id] = new Task(id, name);
    this.renderTasks();
  }
  getTask(id) {
    return this.tasks[id];
  }
  renderTasks() {
    document.getElementById("taskArea").innerHTML = "";
    let allTasks = "";
    for (const id in this.tasks) {
      const task = this.tasks[id];
      if (task.isComplete) {
        allTasks += `
        <div id="${id}" class="taskBorder pb-4">
            <div class="taskComplete">
                <div class="customCheckFilled" onclick="toggleTaskComplete(event)"></div>
                <div>
                    ${task.name}
                </div>
                <div class="deleteWrapper" onclick="deleteTask(event)">
                    <img class="trashImg" src="./assets/trash-can.png"/>
                </div>
            </div>
        </div>
        `;
      } else {
        allTasks += `
        <div id="${id}" class="taskBorder pb-4">
            <div class="task">
                <div class="customCheck" onclick="toggleTaskComplete(event)"></div>
                <div>
                    ${task.name}
                </div>
                <div class="deleteWrapper" onclick="deleteTask(event)">
                    <img class="trashImg" src="./assets/trash-can.png"/>
                </div>
            </div>
        </div>
        `;
      }
    }
    document
      .getElementById("taskArea")
      .insertAdjacentHTML("beforeend", allTasks);
  }
  removeTask(id) {
    delete this.tasks[id];
  }
  clearCompleteTasks() {}
}
