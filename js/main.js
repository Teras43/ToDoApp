// Variables
const listOfLists = document.getElementById('listOfLists')
const allLists = new AllListContainer()

// Functions
function newList(event) {
    if (event.keyCode === 13) {
        const taskListName = event.target.value;
        const newId = randomId();
        allLists.addList(listOfLists, newId, taskListName)
        event.target.value = '';
    }
}

