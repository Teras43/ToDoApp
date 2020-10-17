// Variables
const taskInput = document.getElementById('taskInput');
const listInput = document.getElementById('newListName');
const listOfLists = document.getElementById('listOfLists');
const allLists = new AllListContainer();
let currentList
let currentTaskId

// Functions
function selectList(id) {
    currentList = allLists.getList(id);
    const node = document.getElementById(id);
    [...document.getElementsByClassName('active')].forEach(element => {
        element.classList.remove('active');
    })
    node.classList.add('active');
    currentList.renderTasks();
}

function newList(event) {
    if (event.type === "keydown" && event.keyCode !== 13) return;
    const taskListName = listInput.value;
    currentList = allLists.addList(taskListName)
    selectList(currentList.id);
    listInput.value = '';
    allLists.saveData();
}

function addTask(event) {
    if (event.type === "keydown" && event.keyCode !== 13) return;
    if (currentList !== undefined) {
        currentList.addTask(taskInput.value);
    }
    taskInput.value = '';
    allLists.saveData();
}

function toggleTaskComplete(event) {
    const eventTarget = $(event.target);
    const node = eventTarget.parent().parent();
    const task = currentList.getTask(node.attr("id"));
    task.toggleComplete();
    currentList.renderTasks();
}

function getSelectedTaskId(event) {
    const eventTarget = $(event.target);
    const node = eventTarget.parent().parent();
    let task = currentList.getTask(node.attr("id"));
    currentTaskId = task;
}

function editSelectedTask() {
    let inputValue = document.getElementById('modalInputBox');
    currentTaskId.editTask(inputValue.value);
    inputValue.value = '';
    currentList.renderTasks();
    allLists.saveData();
}

// Delete Functions
const animateTaskDeleteProperties = {
    marginLeft: "125%",
    opacity: 0
}

const animateListDeleteProperties = {
    marginRight: "125%",
    opacity: 0
}

function deleteTask(event) {
    const eventTarget = $(event.target);
    const taskItem = eventTarget.parent().parent().parent();
    currentList.removeTask(taskItem.attr("id"));
    taskItem.animate(animateTaskDeleteProperties, 1000, () => taskItem.remove());
    allLists.saveData();
}

function deleteCompletedTasks() {
    currentList.clearCompletedTasks();
    currentList.renderTasks();
    allLists.saveData();
}

function deleteCurrentList(event) {
    event.preventDefault();
    const eventTarget = $(event.target);
    const listItem = eventTarget.parent().parent();
    allLists.removeList(listItem.attr("id"));
    listItem.animate(animateListDeleteProperties, 1000, () => listItem.remove());
    currentList = undefined;
    document.getElementById("taskArea").innerHTML = "";
    allLists.saveData();
}

allLists.loadData();
allLists.renderLists();