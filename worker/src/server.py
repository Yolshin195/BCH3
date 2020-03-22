from flask import Flask, request, jsonify
from worker import Worker
import json
import random

app = Flask(__name__)
worker = Worker()

@app.route("/set/model")
def setModel():
    return '{"message": "method no realized"}'

@app.route("/get/status")
def getStatus():
    status = str(worker.getStatus())
    return '{"status":"'+status+'""}'

@app.route("/get/result")
def getResult():
    status = str(worker.getStatus())
    result = str(worker.getResult())
    return '{"status":"'+status+'", "result":"{'+result+'}"}'

@app.route("/run", methods=['POST'])
def runWorker():
    if request.is_json:
        data = request.get_json()
        print(data)
        result = worker.run(
            data['normal'],
            data['point'],
            data['number'],
            data['cycles']
        )
        return result;
    else:
        return {"error": "nid headers: applications/json"}

@app.route("/get/points/montecarlo", methods=['POST'])
def get_points_monte_carlo():
    data = request.get_json()
    #print(data)
    #print(data['repeat'])
    #print(data['center'])
    #print(data['radius'])
    #return data
    result = worker.get_point_monte_carlo(data['repeat'], data['center'], data['radius'])
    result = json.dumps(result)
    return result

if __name__ == "__main__":
    port = random.randrange(6000, 9000)
    worker = Worker('http://localhost:{}'.format(port))
    print(worker.registerWorker())
    app.run('localhost', port);
