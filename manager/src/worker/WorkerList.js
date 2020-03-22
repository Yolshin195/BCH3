class WorkerList {
    constructor() {
        this.workerList = []
    }

    get lenght() {
        return this.workerList;
    }

    push(worker) {
        if(this.workerList.find(w => w.isEqual(worker)) === undefined) {
            this.workerList.push(worker);
            return true;
        }

        return false;
    }

    getList() {
        return this.workerList;
    }

    get() {
        return this.workerList.find(el => el.status === false)
    }
}

module.exports = WorkerList;
