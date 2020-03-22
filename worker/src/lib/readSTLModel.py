def getTriangle(fileName):
    result = []

    with open(fileName) as file_handler:
        triangle = []
        for line in file_handler:
            line = line.strip()
            if(line.startswith("facet")):
                point = line.split(" ")[2:]
                point = [float(item) for item in point]
                triangle.append(point)
            
            if(line.startswith("vertex")):
                point = line.split(" ")[1:]
                point = [float(item) for item in point]
                triangle.append(point)

            if(line.startswith("endfacet")):
                result.append(triangle)
                triangle = []

    return result 
