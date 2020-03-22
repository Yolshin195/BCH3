import lib.plane_straight_intersection    as psi
import lib.destroying_elements_allocation as dea

import numpy as np


def point_in_sphere_allocate_random( center, radius ):
    """
    @param center is np.array( (,3) ): center of sphere
    @param radius is Int: sphere radius

    @return np.array( (3,) ): point in sphere
    """

    # point in shpere
    point = np.zeros( (3,) )
    
    point[0] = np.random.rand()
    point[1] = np.random.rand()    
    point[2] = np.random.rand()    

    point = (center - radius) + point * 2 * radius

    return point

def get_point_monte_carlo(repeat, center, radius):
    points = []

    center = np.array(center)

    for i in range(repeat):
        points.append(point_in_sphere_allocate_random(center, radius).tolist())

    return points


def monte_carlo( repeat, center, radius, model, des_per_cycle, cycles=None ):
    '''
    @param repeat is Int: number of tests

    @param center is np.array( (,3) ):
        center of sphere of possible explosion point
    @param radius is Int: sphere radius

    @param model is np.array( (?, 4, 3) )
        where each el in model is triangle of normal and 3 points

    @param des_per_cycle is Int: 
        number of destroying elements in HEshell 
    @param cycles is Int: 
        number of cycles
    @param HEshell is np.array( (des_per_cycle * cycles, 2, 3) )
        where each el in HEshell is straight of normal and point

    @return hits, shots
    @return triangle_numbers 
    ''' 

    # if @param cycles equal 0
    if cycles == 0:
        return 0, 0

    # if param cycles is not specified
    if cycles is None:
        cycles = np.int( 3/2 * des_per_cycle )

    shots = repeat * des_per_cycle * cycles
    hits = 0
    for i in range( repeat ):

        HEshell_direction = np.array( [1, 0, 0] )
        HEshell_position  = point_in_sphere_allocate_random( center, radius )

        _HEshell = np.array( [HEshell_direction, HEshell_position] )
        HEshell = dea.destroying_elements_allocate( _HEshell, des_per_cycle, cycles )

        triangle_numbers = []
        for num, triangle in enumerate(model):
            for straight in HEshell:
                if psi.triangle_is_contains_intersection_point( triangle, straight ):
                    hits += 1
                    triangle_numbers.append( num )

    return hits, shots, triangle_numbers 
