const WorkerList    = require('./worker/WorkerList');
const Worker        = require('./worker/Worker');
const TaskList      = require('./task/TaskList');
const Queue         = require('./queue/Queue');

class Manager {
    constructor(config) {
        this.queue = [];
        this.status = false;
        this.configApp = config;
        this.workerList = new WorkerList();
        this.taskList = new TaskList();
    }

    getWorkerList() {
        const workerList = this.workerList.getList();
        return workerList;

    }

    get progresTask() {
        return this.taskList.progress;
    }

    async run(config) {
        if(this.status) {
            throw Error("Уже запущен расчёт, дождитесь завершения");
        }
        if(this.workerList.lenght === 0) {
            throw Error("Нету серверов для начала расчёта");
        }

        const worker = this.workerList.get();
        if(worker === undefined) {
            throw Error("Нету свободных воркеров.");
        }

        console.log(config, worker);

        const points = await worker.runMonteCarlo(config);

        this.taskList = new TaskList({
            ...config,
            points: points.result
        });

        if(this.taskList.length === 0) {
            this.status = false;
            throw Error("Нету задачь для расчёта");
        }

        const queue = new Queue(this.workerList,
            this.taskList);

        this.status = true;
        queue.run();
        queue.onDone(taskList => {
            console.log(taskList);
            this.status = false;
        })

        return {
            status: this.status,
            message: "Задача запущена"
        }
    }

    registerWorker(config) {
        var worker = new Worker({...config});
        this.workerList.push(worker);
    }
}

module.exports = Manager; 
