function Graph() {
    this.vertices = []
    this.adjList = new Map()

    this.addVertex = (v) => {
        this.adjList.set(v, [])
    }
    this.addEdge = (v1, v2) => {
        const first = this.adjList.get(v1)
        const second = this.adjList.get(v2)
        if (!first)  
            this.adjList.set(v1, [v2])
        else
            this.adjList.get(v1).push(v2)
        
        if (!second)
            this.adjList.set(v2, [v1])
        else 
            this.adjList.get(v2).push(v1)

    }
    this.djikstra = startNode => {
        const distance = {
            [startNode]: 0
        }
        const vertices = []
        this.adjList.forEach((val, key) => {
            vertices.push(key)
            if (key !== startNode) {
                distance[key] = Infinity
            }
        })
        const shortest = (vertices, distance) => {
            let s = Infinity
            let node = null
            vertices.forEach(v => {
                let test = v
        
                if (distance[v] <= s) {
                    node = v
                    s = distance[v]
                }
            })
            return node
        }
        while (vertices.length > 0) {
            const next = shortest(vertices, distance)
            const index = vertices.indexOf(next)
            vertices.splice(index, 1)
            const children = this.adjList.get(next)
            children && children.forEach(child => {
                if (vertices.indexOf(child) > -1) {
                    let test = distance[next] + 1
                    if (test < distance[child])
                        distance[child] = test
                }
            })
        }
        let farthest = 0
        Object.keys(distance).forEach(key => {
            if (distance[key] > farthest)
                farthest = distance[key]   
        })
        console.log('>>>here', farthest)
    }

    this.shortestPath = (source, target) => {
        if (source == target) {   // Delete these four lines if
          console.log(source);          // you want to look for a cycle
          return;                 // when the source is equal to
        }                         // the target.
        var queue = [ source ],
            visited = { source: true },
            predecessor = {},
            tail = 0;
        while (tail < queue.length) {
          var u = queue[tail++],  // Pop a vertex off the queue.
              neighbors = this.adjList.get(u);
          for (var i = 0; i < neighbors.length; ++i) {
            var v = neighbors[i];
            if (visited[v]) {
              continue;
            }
            visited[v] = true;
            if (v === target) {   // Check if the path is complete.
              var path = [ v ];   // If so, backtrack through the path.
              while (u !== source) {
                path.push(u);
                u = predecessor[u];          
              }
              path.push(u);
              path.reverse();
              console.log(path.length, path.join(', '));
              return;
            }
            predecessor[v] = u;
            queue.push(v);
          }
        }
        console.log('there is no path from ' + source + ' to ' + target);
      }

}

module.exports = Graph