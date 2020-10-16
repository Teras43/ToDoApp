class AllListContainer {
    constructor() {
        this.lists = {};
    }
    addList(location, name) {
        const id = randomId();
        const newList = new List(id, name);
        this.lists[id] = newList;
        const node =
            `
            <div id="${id}" class="actualListName h5 pb-4 pt-4" onclick="selectList(${id})">
            <p>${name}</p>
            </div>
            `
        location.insertAdjacentHTML('beforeend', node);
        return newList;
    }
    getList(id) {
        return this.lists[id]
    }
    removeList(id) {
        this.lists[id] = null;
    }
    // saveData() {
    //     localStorage.setItem("currentList", JSON.stringify(currentList));
        
    //     console.log("Data Saved!");
    // }
    // loadData() {
        // this.lists = JSON.parse(localStorage.getItem("currentList"));
        // console.log("Data retrieved!");
        
    // }
}

class Task {
    constructor(id, name, description) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.isComplete = false;
    }
    editTask(name, description, isComplete) {
        this.name = name;
        this.description = description;
        this.isComplete = isComplete;
    }
}

class List {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.tasks = {};
    }
    addTask(name, description = '') {
        const id = randomId();
        this.tasks[id] = new Task(id, name, description);
        this.renderTasks();
    }
    getTask(id) {
        return this.tasks[id];
    }
    renderTasks() {
        document.getElementById('taskArea').innerHTML = '';
        let allTasks = '';
        for (const id in this.tasks) {
            const task = this.tasks[id];
            allTasks += 
                `
                <div id="${id}" class="taskBorder pb-4">
                    <div class="task">
                        <input type="checkbox" id="taskCheck">
                        <label for="taskCheck"><span class="customCheck mr-3"></span>${task.name}</label>
                        <div class="deleteWrapper" onclick="deleteTask(event)">
                            <img class="trashImg" src="./assets/trash-can.png"/>
                        </div>
                    </div>
                </div>
                `
        }
        document.getElementById('taskArea').insertAdjacentHTML('beforeend', allTasks);
    }
    removeTask(id) {
        delete this.tasks[id];
    }
}