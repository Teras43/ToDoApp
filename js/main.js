// Variables
const taskInput = document.getElementById('taskInput');
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
    if (event.keyCode === 13) {
        const taskListName = event.target.value;
        currentList = allLists.addList(listOfLists, taskListName)
        selectList(currentList.id);
        event.target.value = '';
    }
}

function addTask(event) {
    if(event.type === "keydown" && event.keyCode !== 13) return;
    if (currentList !== undefined) {
        currentList.addTask(taskInput.value);
    }
    taskInput.value = '';
}