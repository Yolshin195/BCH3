const WorkerApi = require('./workerApi');

const workerApi = new WorkerApi('http://localhost:6000');

workerApi.runMonteCarlo();

