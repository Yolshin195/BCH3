const config    = require('../config.json');
const express   = require('express')
const fs        = require('fs')
const multer    = require('multer')
const app       = express()
const port      = config.port; 

const Manager   = require('./manager');
const manager   = new Manager();
const { ModelStl } = require('./modelStl');

const modelStlPath  = "public"
const upload        = multer({dest: modelStlPath});
const modelStl      = new ModelStl({
    fileName: "model.stl", 
    path: modelStlPath
});


//app.use(express.json())

app.use((req, res, next) => {
    console.log(req.url);
    next();
})

app.use((req, res, next) => {
  if(req.headers.hasOwnProperty('origin')) {
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'PUT, GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }

  next();
});


//app.get('/register/worker', (req, res) => manager.registerWorker())
app.get('/get/workerList', (req, res) => {
    res.json({workerList: manager.getWorkerList()})
})
app.get('/get/taskList', (req, res) => {
    res.json({taskList: manager.taskList})
})
app.get('/get/status', (req, res) => 
    res.send({status: manager.status})
)
app.get('/get/progress/task', (req, res) => 
    res.send({
        status: manager.status,
        progress: manager.progresTask
    })
)
app.get('/get/resultate/task', (req, res) => 
    res.send({
        status: manager.status,
        resultate: manager.taskList.resultate
    })
)

app.get('/get/modelStl/name', (req, res) => {
    modelStl.getModelName()
    .then(body => res.send(body))
    .catch(err => res.send(err));
})
app.get('/get/modelStl', (req, res) => {
    res.download(modelStl.getPath());
})
app.put('/set/modelStl',upload.single('file'),  (req, res) => {
    modelStl.setModel(req.file)
    .then(body => res.send(body))
    .catch(err => (console.log(err),res.send(err)));
})

//app.put('/setModelName', (request, respond) => {
//  console.log(request);
//  var body = '';
//  var filePath = __dirname + '/public/model.stl';
//  console.log(filePath);
//  request.on('data', function(data) {
//      console.log('data: ', data);
//    body += data;
//  });
//
//  request.on('end', function (){
//      console.log('end: ', body);
//    fs.appendFile(filePath, body, function() {
//      respond.end();
//    });
//  });
//})

app.post('/registerWorker',express.json(), (req, res) => {
    console.log('/registerWorker: ', req.body);
    try {
        let status = manager.registerWorker(req.body);
        res.send({status});
    } catch(err) {
        res.send({status: false, error: err.message});
    }

})

app.post('/run', express.json(), (req, res) => {
    console.log('/run: ',req.body)
    manager.run(req.body)
    .then(result => res.json({result, status: manager.status}))
    .catch(err => {
        res.json({error: err.message})
    })
})

app.listen(port, () => 
    console.log(`Example app listening on port ${port}!`))
