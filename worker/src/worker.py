import time
from modelStl import ModelStl
from managerApi import ManagerApi
from lib.monte_carlo import get_point_monte_carlo
import payload

class Worker:
    def __init__(self, url=None, managerUrl=None):
        self.modelStl   = ModelStl()
        self.managerApi = ManagerApi(managerUrl or 'http://localhost:3200')
        self.status = False
        self.url = url or "http://localhost:6000"
        self.registerStatus = False
        self.timeBegin  = None
        self.timeEnd    = None

    def getTime(self):
        if self.status:
            return time.time() - self.timeBegin
        elif self.timeEnd != None:
            return self.timeEnd
        else:
            return 0

    def registerWorker(self):
        body = {
            "url": "{}".format(self.url),
            "modelName": "{}".format(self.modelStl.getModelName()),
            "status": "{}".format(self.status)
        }

        self.registerStatus = self.managerApi.registerWorker(body)

        return self.registerStatus

    def run(self, normal, points, number, cycles=None):
        if self.status:
            return {"time": self.getTime(), "status": self.status, "message": "worker is run"}
        self.status = True
        self.timeBegin = time.time()

        modelStlPath = self.modelStl.getPathModel()

        self.result = payload.run(modelStlPath, normal, points, number, cycles) 

        self.status = False
        self.timeEnd = time.time() - self.timeBegin

        return {"time": self.timeEnd, "result": self.result}

    def getStatus(self):
        return self.status

    def getResult(self):
        return self.result

    def getModelStl(self):
        modelStlName = self.managerApi.getModelName()

        modelStl = self.managerApi.getModelStl()

        self.modelStl.setModelName(modelStlName)
        self.modelStl.setModel(modelStl)


    def get_point_monte_carlo(self, repeat, center, radius):
        self.timeBegin = time.time()

        points = get_point_monte_carlo(repeat, center, radius)

        self.timeEnd = time.time() - self.timeBegin
        print(self.timeEnd)

        return {"time": self.timeEnd, "result": points}


if __name__ == "__main__":
    worker = Worker()
    print(worker.run([1, 0, 0], [0, 50, 0], 10, 1))

