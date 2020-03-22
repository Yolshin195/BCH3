import sys

import destroying_elements_allocation as dea
import plane_straight_intersection    as psi

from monte_carlo import monte_carlo

import numpy as np


def test_intersection():
    #elements number
    number = 10

    # orientation and position of HE Shell
    straight = np.array( [[1, 0, 0], [0, 0, 0]] )

    # trinagle
    triangle = np.array( [[0, -1, 0], [-50, 100, -1], [50, 50, -1], [50, 50, 1]] )

    # destroying elemenets allocation
    dels = dea.destroying_elements_allocate( straight, number )

    print("triangle normal:")
    print( triangle[0] )
    print("triangle points:")
    print( triangle[1:] )
    print("")
    for num, de in enumerate(dels):
        if psi.triangle_is_contains_intersection_point( triangle, de ): 
            print(num, "d.el. normal", de[0] )
            print(num, "d.el. point ", de[1] )
            print( "" )


def test_intersection_count():
    #elements number
    number = 10

    # orientation and position of HE Shell
    straight = np.array( [[1, 0, 0], [0, 0, 0]] )

    # trinagle
    triangle = np.array( [[0, -1, 0], [-50, 100, -1], [50, 50, -1], [50, 50, 1]] )

    # destroying elemenets allocation
    dels = dea.destroying_elements_allocate( straight, number )

    hits = 0
    for num, de in enumerate(dels):
        if psi.triangle_is_contains_intersection_point( triangle, de ): 
            hits += 1

    print("hits count ", hits, " of ", len(dels))
    print("accuracy   ", hits / len(dels))


def test_monte_carlo():

    repeat = 100
    center = np.array( [0, -100, 0] )
    radius = 100

    #model
    triangle = np.array( [[0, -1, 0], [-50, 10, -10], [50, 10, -10], [50, 10, 10]] )
    model = np.array( [triangle] )

    des_per_cycle = 25
    cycles = 25

    hits, shots, t_nums = monte_carlo( repeat, center, radius, model, des_per_cycle )

    print("repeats = ", repeat)
    print("hits = ", hits, "/", shots, " = ", hits / shots)


def main():
    test_monte_carlo()
    pass    



if __name__ == "__main__":
    main()
