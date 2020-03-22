class Api {
    constructor(url) {
        this.host = 'http://localhost:3200' || url;
    }

    getResultateTaskList() {
        const url    = '/get/taskList';
        return this.fetch(url);
    }

    getStatus() {
        const url    = '/get/status';
        return this.fetch(url);
    }

    getResultateTask() {
        const url    = '/get/resultate/task';
        return this.fetch(url);
    }

    getProgressTask() {
        const url    = '/get/progress/task';
        return this.fetch(url);
    }

    getWorkerList() {
        const url       = '/get/workerList';
        return this.fetch(url);
    } 

    setModelStl(formData) {
        const method    = 'PUT';
        const url       = '/set/modelStl';

        return this.fetchFormData(url, method, formData);
    }

    getModelName() {
        return this.fetch('/get/modelStl/name')
    }

    run(body) {
        const method    = 'POST';
        const url       = '/run';

        return fetch(`${this.host}${url}`, {
            method: method,
            mode: 'cors',
            headers: {
                Origin: window.location,
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(body) 
        })
        .then(res => {
            if(res.status > 200) {
                throw Error(`Respons status ${res.status}`)
            }

            return res.json()
        })
    }

    fetch(path) {
        return fetch(`${this.host}${path}`)
        .then(res => {
            if(res.status > 200) {
                throw Error(`Respons status ${res.status}`)
            }

            return res.json()
        })
    }

    fetchFormData(path, method, formData) {
        return fetch(`${this.host}${path}`, {
            method: method,
            mode: 'cors',
            headers: {
                Origin: window.location
            },
            body: formData
        })
        .then(res => {
            if(res.status > 200) {
                throw Error(`Respons status ${res.status}`)
            }

            return res.json()
        })
    }
}

module.exports = Api;
