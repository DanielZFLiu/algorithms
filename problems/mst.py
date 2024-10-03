# Kruskal Algorithm (Minimum Spanning Tree)
# sorts all the edges of the graph by weight 
# adds them one by one to the MST, ensuring no cycles are formed. 
# The process continues until all the vertices are connected.

# aka Disjoint Set class
class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))  # Each node is initially its own parent
        self.rank = [0] * n  # Rank used to keep the tree flat

    def find(self, u):
        '''
        Determine which set a particular element belongs to.

        Path Compression: After finding the root, we update the parent of every node 
        in the path to point directly to the root. This flattens the tree, 
        making future find operations faster.
        '''
        if self.parent[u] != u:  # path compression
            self.parent[u] = self.find(self.parent[u])
        return self.parent[u]

    def union(self, u, v):
        '''
        Combine two sets into one.

        Union by Rank: The set with the smaller rank is attached 
        under the root of the set with the larger rank, 
        ensuring the tree remains as flat as possible.

        Rank: Represents an Upper Bound on Tree Height
        The rank of a node is an approximation of the tree's height rooted at that node.
        '''
        root_u = self.find(u)
        root_v = self.find(v)

        if root_u != root_v:  # Union by rank
            if self.rank[root_u] > self.rank[root_v]:
                self.parent[root_v] = root_u
            elif self.rank[root_u] < self.rank[root_v]:
                self.parent[root_u] = root_v
            else:
                self.parent[root_v] = root_u
                self.rank[root_u] += 1

# Kruskal's MST algorithm
def kruskal(n, edges):
    '''
    n: number of vertices
    edges: list of edges, each represented as (weight, u, v)
    '''
    
    # Sort edges by their weight
    edges.sort()

    uf = UnionFind(n)
    mst = []
    mst_weight = 0

    for weight, u, v in edges:
        if uf.find(u) != uf.find(v):  # If u and v are not in the same set
            uf.union(u, v)            # Union the sets
            mst.append((u, v, weight)) # Add edge to MST
            mst_weight += weight

            if len(mst) == n - 1:  # Stop when we have n-1 edges
                break

    return mst, mst_weight

# Example usage:
# Number of vertices (0 to n-1)
n = 4

# List of edges (weight, u, v)
edges = [
    (1, 0, 1),
    (3, 0, 2),
    (4, 1, 2),
    (2, 1, 3),
    (5, 2, 3)
]

# Run Kruskal's algorithm
mst, mst_weight = kruskal(n, edges)

print("Edges in the Minimum Spanning Tree:", mst)
print("Total weight of the MST:", mst_weight)
