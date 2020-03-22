class Task {
    constructor({point, normal, number, cycles}) {
        this.normal = normal; 
        this.point = point;

        this.number = number;
        this.cycles = cycles;

        this.time = 0;
        this.hits = null;
        this.status = false;
        this.run    = false;
        this.error = null
    }
}

module.exports = Task;
