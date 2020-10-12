class AllListContainer {
    constructor() {
        this.lists = {};
    }
    addList(location, id, name) {
        this.lists[id] = {
            id,
            name,
        }
        const node =`
            <div id="${id}" class="h5 pb-4 pt-4 pl-5">
            <p>${name}</p>
            </div>
            `
        location.insertAdjacentHTML('beforeend', node);
    }
    getList(id) {
        return this.lists[id]
    }
    removeList(id) {
        this.lists[id] = null;
    }
}