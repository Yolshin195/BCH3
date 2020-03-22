import numpy        as np
import numpy.linalg as lg


def triangle_straight_intersection( t, s ):
    """
    @param t is np.array( (4,) ):
        t[0] is triangle normal
        t[1:] is triangle points
    @param s is np.array( (2,) ):
        s[0] is straight normal
        s[1] is straight point
    
    @return np.array( (3,) ) - intersection point of triangle and straight
    """
    p = t[0]
    M = t[1]

    n = s[0]
    M0 = s[1]

    if  np.dot( p, n ) == 0:
        return np.array([])

    """ 
        (p, MM0)    p[0](M0[0] - M[0]) + p[1](M0[1] - M[1]) + p[2](M0[2] - M[2])
    t = --------- = ------------------------------------------------------------
         (p, n)             p[0]n[0] + p[1]n[1] + p[2]n[2]
    """
    top = 0
    bottom = 0
    for i in range(len(p)):
        top += p[i] * (M0[i] - M[i])
        bottom += p[i] * n[i]

    t = - top / bottom

    
    """ intersection point """
    p_int = np.zeros((3,))
    p_int += n * t + M0

    """
    if  (p, n) < 0
    and  
    and |M0M| > |M0N|, N = M + p
    then:
        n and p is face2face
    """
    if  np.dot( p, n ) < 0:
        direction = 0
        for i in range( len(n) ):
            if  n[i] == 0:
                a = 0
            else:
                a = n[i] / np.abs( n[i] )

            if  p_int[i] == 0:
                b = 0
            else:
                b = p_int[i] / np.abs( p_int[i] )

            direction += a - b

        if  direction == 0 \
        and lg.norm( M - M0 ) > lg.norm( (M + p) - M0 ):
            return p_int
    
    return np.array([])


def triangle_is_contains_intersection_point( t, s ):
    """
    @param t is np.array( (4,3) ):
        t[0] is triangle normal
        t[1:] is triangle points
    @param s is np.array( (2,3) ):
        s[0] is straight normal
        s[1] is straight point
    
    @return 1 if t contains intersection point of t and s
            0 else
    """

    """ intersection point of t and s """
    point = triangle_straight_intersection( t, s ) 

    """ intersection is not happened """
    if  len( point ) == 0:
        return 0

    p = t[0]
    M1 = t[1]
    M2 = t[2]
    M3 = t[3]

    n = s[0]
    M0 = s[1] 

    """
    находим минимум и максимум проекции треугольника
    на каждой из осей
    """
    inf = np.zeros( (len(point),) )
    sup = np.zeros( (len(point),) )
    for num, axis in enumerate( list(zip( M1,M2,M3 )) ):
        inf[num] = min(axis)
        sup[num] = max(axis)
        if not (inf[num] <= point[num] and point[num] <= sup[num]):
            return 0

    return 1
