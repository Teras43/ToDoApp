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
            <div id="${id}" class="h5 pb-4 pt-4 pl-5" onclick="selectList(${id})">
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
    renderTasks() {
        document.getElementById('taskArea').innerHTML = '';
        let allTasks = '';
        for (const id in this.tasks) {
            const task = this.tasks[id];
            allTasks += 
                `
                <div id="${id}" class="taskBorder">
                <div>${task.name}</div>
                <div>${task.description}</div>
                </div>
                `
        }
        document.getElementById('taskArea').insertAdjacentHTML('beforeend', allTasks);
    }
}