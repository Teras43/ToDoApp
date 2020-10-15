// Variables
const taskInput = document.getElementById('taskInput');
const listInput = document.getElementById('newListName');
const listOfLists = document.getElementById('listOfLists');
const allLists = new AllListContainer();
let currentList;

// Functions
function selectList(id) {
    currentList = allLists.getList(id);
    const node = document.getElementById(id);
    [...document.getElementsByClassName('active')].forEach(element => {
        element.classList.remove('active');
    })
    node.classList.add('active');
    currentList.renderTasks();
    console.log(currentList);
}

function newList(event) {
    if (event.type === "keydown" && event.keyCode !== 13) return;
    const taskListName = listInput.value;
    currentList = allLists.addList(listOfLists, taskListName)
    selectList(currentList.id);
    listInput.value = '';
    // allLists.saveData();
}

function addTask(event) {
    if(event.type === "keydown" && event.keyCode !== 13) return;
    if (currentList !== undefined) {
        currentList.addTask(taskInput.value);
    }
    taskInput.value = '';
    // allLists.saveData();
}

// Delete Functions
const animateDeleteProperties = {
    marginLeft: "125%",
    opacity: 0
}

function deleteTask(event) {
    const eventTarget = $(event.target);
    const taskItem = eventTarget.parent().parent().parent();
    currentList.removeTask(taskItem.attr("id"));
    taskItem.animate(animateDeleteProperties, 1000, () => taskItem.remove());
    // allLists.saveData();
}