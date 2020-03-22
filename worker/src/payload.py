import lib.destroying_elements_allocation as dea
import lib.plane_straight_intersection    as psi
from lib.readSTLModel import getTriangle
import numpy as np

import os.path
pathModel = "/public/model.stl"

def run(path, normal, points, number, cycles=None):

    #mainifest = {
    #    "straight": [
    #        [], #Normal
    #        [], #Point
    #    ],
    #    "number": 100 #Number destroying elements
    #}

    if not os.path.isfile(path):
        return {"error": "Файл модели не найден"}

    straight = np.array([normal, points]) 

    triangle = getTriangle(path)
    triangle = np.array(triangle)

    # destroying elemenets allocation
    dels = dea.destroying_elements_allocate( straight, number, cycles )
    print(dels)
    print(len(triangle))
    hits = 0
    for num, de in enumerate(dels):
        for n, t in enumerate(triangle): 
            if psi.triangle_is_contains_intersection_point( t, de ):
                hits += 1
        print(num, hits)

    return {"error": None, "hits": hits}

if __name__ == "__main__":
    print(run(pathModel, [1, 0, 0], [0, 50, 0], 50, 1))

