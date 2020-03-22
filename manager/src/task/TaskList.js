const Task = require('./Task');

class TaskList {
    constructor(config) {
        this.taskList = [];

        if(config instanceof Array) {
            this.taskList = array.map(point => new Task({point}));
        }

        if(config instanceof Object) {
            this.taskList = config.points.map(point => new Task({
                point,
                normal: config.bch_normal,
                number: config.bch_number,
                cycles: config.bch_cycles
            }))
        }
    }

    get isDone() {
        return this.taskList.every(task => task.status);
    }

    get length() {
        return this.taskList.length;
    }

    push(task) {
        if(task instanceof Task) {
            this.taskList.push(task);
            return true;
        }

        return false;
    }

    get resultate() {
        const taskTrue = this.taskList
        .filter(task => task.status)

        const vp = taskTrue
        .map(task => task.hits / task.number)
        .reduce((c, v) => (c+v), 0)

        return (vp > 0) ? vp / taskTrue.length : vp;
    }

    get progress() {
        const progress = this.taskList
            .reduce((progres, task) =>
                (progres + (task.status ? 1 : 0)), 0);

        return [
            progress || 0,
            this.taskList.length
        ]
    }

    get() {
        return this.taskList.find(task => (
            task.status === false && 
            task.run    === false
        ));
    }
}

module.exports = TaskList;
