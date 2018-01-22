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

# Sample output:
# Cell Reads: 44
# Top: 1
# Left: 2
# Bottom: 7
# Right: 6

cell_reads = 0

def hasNeighbor(blob, x, y):
    # hasNeighbor will fail if the current index is on the perimeter
    global cell_reads
    top     = blob[x - 1][y]
    cell_reads += 1
    if top == 1:
        return True
    right   = blob[x][y + 1]
    cell_reads += 1
    if right == 1:
        return True
    bottom  = blob[x + 1][y]
    cell_reads += 1
    if bottom == 1:
        return True
    left    = blob[x][y - 1]
    cell_reads += 1
    if left == 1:
        return True
    return False

def findTop(blob):
    for x in range(len(blob)):
        for y in range(len(blob)):
            global cell_reads
            cell_reads += 1
            if blob[x][y] == 1:
                # print(x, y)
                if(hasNeighbor(blob, x, y)):
                    return x

def findBottom(blob):
    for x in range(len(blob) - 1, 0, -1):
        for y in range(len(blob)):
            global cell_reads
            cell_reads += 1
            if blob[x][y] == 1:
                # print(x, y)
                if(hasNeighbor(blob, x, y)):
                    return x

def findLeft(blob):
    for x in range(len(blob)):
        for y in range(len(blob)):
            global cell_reads
            cell_reads += 1
            if blob[y][x] == 1:
                # print(y, x)
                if(hasNeighbor(blob, y, x)):
                    return x

def findRight(blob):
    for x in range(len(blob) - 1, 0, -1):
        for y in range(len(blob)):
            # print(y, x)
            global cell_reads
            cell_reads += 1
            if blob[y][x] == 1:
                # print(y, x)
                if(hasNeighbor(blob, y, x)):
                    return x
print("Top: " + str(findTop(blob)))
print("Left: " + str(findLeft(blob)))
print("Bottom: " + str(findBottom(blob)))
print("Right: " + str(findRight(blob)))
print("Cell Reads: " + str(cell_reads))
