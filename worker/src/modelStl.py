from os.path import isfile

class ModelStl:
    def __init__(self):
        self.pathModel = "public"
        self.pathModelName = "temp/modelName.txt"
        self.modelName = self.getModelName()

    def getPathModel(self):
        return "{}/{}".format(self.pathModel, self.modelName)

    def setModelName(self, modelName):
        with open(self.pathModelName, "w") as file_handler:
            file_handler.write(modelName)
            self.modelName = modelName

    def getModelName(self):
        if isfile(self.pathModelName):
            with open(self.pathModelName) as file_handler:
                self.modelName = file_handler.read()
            return self.modelName
        else:
            return "noModel"

        return self.modelName

    def setModel(self, model):
        with open(self.getPathModel(), "w") as file_handler:
            file_handler.write(model)

