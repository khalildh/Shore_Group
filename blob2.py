blob = [
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,1,1,1,0,0,0,0,0],
    [0,0,1,1,1,1,1,0,0,0],
    [0,0,1,0,0,0,1,0,0,0],
    [0,0,1,1,1,1,1,0,0,0],
    [0,0,0,0,1,0,1,0,0,0],
    [0,0,0,0,1,0,1,0,0,0],
    [0,0,0,0,1,1,1,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0]
]

length = len(blob)
top_index = None
left_index = None
bottom_index = None
right_index = None

# Sample output:
# Cell Reads: 44
# Top: 1
# Left: 2
# Bottom: 7
# Right: 6

cell_reads = 0

# def hasNeighbor(x, y):
#     # hasNeighbor will fail if the current index is on the perimeter
#     global cell_reads
#     top     = blob[x - 1][y]
#     cell_reads += 1
#     if top == 1:
#         return True
#     right   = blob[x][y + 1]
#     cell_reads += 1
#     if right == 1:
#         return True
#     bottom  = blob[x + 1][y]
#     cell_reads += 1
#     if bottom == 1:
#         return True
#     left    = blob[x][y - 1]
#     cell_reads += 1
#     if left == 1:
#         return True
#     return False


def findRight(indX, indY):
    global right_index, cell_reads, top_index
    for x in range(indX -1, top_index[0] -1, -1):
        for y in range(length - 1, indY, -1):
            cell_reads += 1
            if blob[x][y] == 1:
                print("Right: ", y)
                return y
    print("Right: ", indY)
    right_index = [indX, indY]
    return indY

def findBottom(indX, indY):
    global bottom_index, cell_reads
    for x in range(length - 1, indX, -1):
        for y in range(length - 1, indY -1 , -1):
            global cell_reads
            cell_reads += 1
            if blob[x][y] == 1:
                print("Bottom: ", x)
                findRight(x, y)
                bottom_index = [x, y]
                return x
    print("Bottom: ", x)
    findRight(x, y)
    bottom_index = [indX, indY]
    return indX

def findLeft(indX, indY):
    global left_index, cell_reads
    for x in range(indX + 1, length):
        for y in range(indY):
            cell_reads += 1
            if blob[x][y] == 1:
                print("Left: ", y)
                findBottom(x, y)
                left_index = [x, y]
                return y
    print("Left: ", indY)
    findBottom(indX, indY)
    left_index = [indX, indY]
    return indY



def findTop():
    global top_index, cell_reads
    for x in range(length):
        for y in range(length):
            cell_reads += 1
            if blob[x][y] == 1:
                print("Top: ", x)
                top_index = [x, y]
                findLeft(x, y)
                print("Cell Reads: ", cell_reads)
                return x

findTop()
