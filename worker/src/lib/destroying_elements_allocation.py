import numpy as np


def destroying_elements_allocate( s, number, cycles=None ):
    """
    @param s is np.array( (2, 3) ):
        s[0] is normal of HE shell
        s[1] is position of HE sheel
    @param number is Int: number of destroying elements in HE shell

    @return np.array( (number * cycles, 2, 3) ): destroying elements 
    """
    normal = s[0]
    position = s[1]
    # radians per one degree
    k = np.pi / 180

    # alpha and betta increment
    dalpha = 240 / number

    dbetta = 0
    if cycles is None:
        cycles = np.int(3/2 * number)
        dbetta = 360 / cycles 
    else:
        dbetta = 360 / cycles 


    betta = 0
    alpha = 0 

    dels = np.zeros( (number * cycles, 2, 3) )

    for el in dels:
        el[1] = position

    for j in range(0, cycles ):  

        betta = k * (j * dbetta)

        for i in range(0, number):
            if (i < number // 2):
                alpha = k * ((i + .5) * dalpha + 30 )
            else:
                alpha = k * ((i + .5) *  dalpha + 90)

            # x
            dels[j * number + i][0][0] = np.cos(alpha) * np.cos(betta)

            # y
            dels[j * number + i][0][1] = np.sin(alpha) * np.cos(betta)

            # z
            dels[j * number + i][0][2] = np.sin(betta)

    return dels
