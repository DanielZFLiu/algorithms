/**
 * https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm
 * Dijkstra's algorithm to find the shortest path between a and b. 
 * It picks the unvisited vertex with the lowest distance, 
 * calculates the distance through it to each unvisited neighbor, 
 * and updates the neighbor's distance if smaller. 
 * Mark visited (set to red) when done with neighbors.
 */

class PriorityQueue {
    constructor() {
        this.values = [];
    }

    enqueue(value, priority) {
        this.values.push({ value, priority });
        this.sort();
    }

    dequeue() {
        return this.values.shift();
    }

    sort() {
        this.values.sort((a, b) => a.priority - b.priority);
    }
}

function dijkstra(graph, startNode) {
    const distances = {};
    const priorityQueue = new PriorityQueue();
    const previous = {};
    let path = [];
    let smallest;

    // Initialize distances and priority queue
    for (let node in graph) {
        if (node === startNode) {
            distances[node] = 0;
            priorityQueue.enqueue(node, 0);
        } else {
            distances[node] = Infinity;
            priorityQueue.enqueue(node, Infinity);
        }
        previous[node] = null;
    }

    while (priorityQueue.values.length) {
        smallest = priorityQueue.dequeue().value;

        if (distances[smallest] === Infinity) break; // All remaining nodes are unreachable

        for (let neighbor in graph[smallest]) {
            let distance = graph[smallest][neighbor];
            let candidate = distances[smallest] + distance;

            if (candidate < distances[neighbor]) {
                distances[neighbor] = candidate;
                previous[neighbor] = smallest;
                priorityQueue.enqueue(neighbor, candidate);
            }
        }
    }

    // Get the shortest path by tracing back from the end node
    function getPath(endNode) {
        path = [];
        let temp = endNode;
        while (temp) {
            path.push(temp);
            temp = previous[temp];
        }
        return path.reverse();
    }

    return { distances, getPath };
}

// Example usage
const graph = {
    A: { B: 2, C: 4 },
    B: { A: 2, C: 1, D: 7 },
    C: { A: 4, B: 1, D: 3 },
    D: { B: 7, C: 3, E: 1 },
    E: { D: 1 }
};

const { distances, getPath } = dijkstra(graph, "A");
console.log("Shortest distances:", distances);
console.log("Shortest path to D:", getPath("D"));
