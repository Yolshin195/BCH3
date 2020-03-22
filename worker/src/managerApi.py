import requests

class ManagerApi:
    def __init__(self, url):
        self.host = url or 'http://localhost:3200'

    def registerWorker(self, body):
        url = "{}/registerWorker".format(self.host)

        r = requests.post(url, json=body)

        if r.status_code > 200:
            return False
        else:
            return True

    def getModelName(self):
        url = "{}/get/modelStl/name".format(self.host)

        r = requests.get(url)
        body = r.json()
        print(body["modelName"])
        return body["modelName"] 


    def getModelStl(self):
        url = "{}/get/modelStl".format(self.host)

        r = requests.get(url)
        return r.text

