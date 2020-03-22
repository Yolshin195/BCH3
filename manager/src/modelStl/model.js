const fs = require('fs')

class ModelStl {
    constructor({fileName, path}) {
        this.currentModel = 'temp/currentModel.txt';
        this.path = path;
        this.fileName = this.getCurrentModelNameSync();
    }

    getCurrentModelNameSync() {
        try {
            var data = fs.readFileSync(this.currentModel);
            return data.toString();
        } catch(err) {
            return "NoModel";
        }
    }

    getCurrentModelName() {
        return new Promise((resolve, reject) => {
            fs.readFile(this.currentModel, (err, data) => {
                if (err) return reject(err);
                return resolve(data)
            });  
        })
    }

    setCurrentModelName(fileName) {
        this.fileName = fileName;

        return new Promise((resolve, reject) => {
            const data = new Uint8Array(Buffer.from(fileName));
            fs.writeFile(this.currentModel, data, (err) => {
                if (err) return reject({error: err.message, status: false});
                return resolve({status: true})
            });
        })
    }

    async setModel(file) {
        console.log('setModel: ', file, file.originalname);
        const v = await this.setCurrentModelName(file.originalname);
        const r = await renameModel(file.path, `${this.path}/${file.originalname}`);

        return {modelName: file.originalname, status: r.status}
    }

    getModel() {
        return fs.createReadStream(`${this.path}/${this.fileName}`, this.fileName);
    }

    getPath(){
        return `${this.path}/${this.fileName}`;
    };

    getModelName() {
        return new Promise((resolve, reject) => {
            fs.access(`${this.path}/${this.fileName}`, fs.F_OK, (err) => {
                if(err) {
                    reject({modelName: "noModel"});
                    return;
                }

                return resolve({modelName: this.fileName});
            });
        });
    }
}

async function renameModel(oldFile, newFile) {
    var isAccessNewFile = await fsAccess(newFile);
    console.log(isAccessNewFile);
    var isDeleteNewFile = false;

    console.log('test1');

    if(isAccessNewFile) {
        isDeleteNewFile = await fsUnlinck(newFile);
    }

    console.log('test');

    var r = await fsRename(oldFile, newFile)

    return r;
}

function fsRename(oldFile, newFile) {
    return new Promise((resolve, reject) => {
        fs.rename(oldFile, newFile, (err) => {
          if (err) return reject({status: false, error: err.message});
          return resolve({status: true})
        });
    });
}

function fsAccess(path) {
    console.log('test0: ', path);
    return new Promise((resolve, reject) => {
        fs.access(path, fs.F_OK, (err) => {
            if(err) {
                resolve(false)
            }

            return resolve(true);
        });
    });
}

function fsUnlinck(path) {
    return new Promise((resolve, reject) => {
        fs.unlink(path, function(err) {
          if (err) return reject(false);

          return resolve(true);
        });
    });
}

module.exports = ModelStl;
