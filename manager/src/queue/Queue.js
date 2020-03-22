const EventEmitter  = require('events');

class Queue {
    constructor(workerList, taskList) {
        this.event = new EventEmitter();
        this.workerList = workerList;
        this.taskList = taskList;

        this.event.on('run', () => {
            while(true) {
                const worker    = this.workerList.get();
                const task      = this.taskList.get();

                if(!worker) {
                    break;
                }

                if(!task) {
                    break;
                }

                task.run = true;

                worker.run(task)
                .then(task => {
                    task.run = false;
                    this.event.emit('workerDone', task);
                })
                .catch(err => {
                    task.run = false;
                    task.error = err.message;
                    this.event.emit('error', err);
                })
            }
        })

        this.event.on('workerDone', (task) => {
            console.log('WorkerDone: ', task);
            if(this.taskList.isDone) {
                this.event.emit('done', this.taskList);
            } else {
                this.event.emit('run');
            }
        })

        this.event.on('error', (err) => {
            console.log('Error: ', err)
        })
    }

    run() {
        this.event.emit('run');
    }

    onError(callback) {
        this.event.on('error', callback);
    }

    onDone(callback) {
        this.event.on('done', callback);
    }
}

module.exports = Queue;
