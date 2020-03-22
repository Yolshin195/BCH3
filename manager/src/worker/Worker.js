const workerApi = require('./workerApi');
const Task = require('../task/Task');

class Worker { 
    constructor({host, url, modelName, status}) {
        this.host = url || host;
        this.modelName = modelName;
        this.status = this.setStatus(status);

        Object.defineProperty(this, "workerApi", {
            enumerable: false,
            configurable: false,
            writable: false,
            value: workerApi
        });
    }

    setStatus(status) {
        if(status instanceof String) {
            switch (status) {
                case 'True':
                case 'true':
                    return true
                default:
                    return false
            }
        }

        if(status instanceof Boolean) {
            return status;
        }

        return false;
    }

    isEqual(worker) {
        return (worker.host === this.host) ? true : false;
    }

    getStatus() {
        return this.workerApi.getStatus();
    }

    run(task) {
        return new Promise((resolve, reject) => {
            if(!task instanceof Task) {
                return reject(Error("Метод run принемает на вход object classa Task"))
            }
            if(this.status) {
                return reject(Error("Уже запущен расчёт, дождитесь завершения"))
            }

            this.status = true;

            this.workerApi.run(this.host, task)
            .then(body => {
                console.log('Body: ', body);
                this.status = false;
                task.status = true;
                task.hits = body.result.hits;
                task.time = body.time

                resolve(task);
            })
            .catch(err => {
                this.status = false;
                task.error(err.message);
                task.status = true;
                reject(task);
            })

        });
    }

    runMonteCarlo(config) {
        return new Promise((resolve, reject) => {
            if(this.status) {
                return reject(Error("Уже запущен расчёт, дождитесь завершения"))
            }

            this.status = true;

            console.log(this.workerApi)

            this.workerApi.runMonteCarlo(this.host, config)
            .then(body => {
                this.status = false;

                resolve(body)
            })
            .catch(err => {
                this.status = false;
                reject(err)
            })
        });
    }
}

module.exports = Worker;
