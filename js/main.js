// Variables
const listOfLists = document.getElementById('listOfLists')
const allLists = new AllListContainer()
let currentList

// Functions
function selectList(id) {
    currentList = allLists.getList(id);
    const node = document.getElementById(id);
    [...document.getElementsByClassName('active')].forEach(element => {
        element.classList.remove('active');
    })
    node.classList.add('active');
    console.log(currentList);
}

function newList(event) {
    if (event.keyCode === 13) {
        const taskListName = event.target.value;
        allLists.addList(listOfLists, taskListName)
        event.target.value = '';
    }
}

function addTask(event) {
    if (currentList !== undefined) {

    }
}