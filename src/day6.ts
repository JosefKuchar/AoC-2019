interface IOrbit {
  satellites: IOrbit[];
  parent: IOrbit | null;
  name: string;
}

interface IOrbitArray {
  [index: string]: IOrbit;
}

function getTotalOrbits(node: IOrbit, depth: number): number {
  let sum = depth;
  node.satellites.forEach(satellite => {
    sum += getTotalOrbits(satellite, depth + 1)
  })
  return sum;
}

function getPathToRoot(node: IOrbit) {
  let path = []
  let curr = node;
  while (curr.parent !== null) {
    path.push(curr.name);
    curr = curr.parent;
  }
  return path.reverse();
}

function getPathLength(node1: IOrbit, node2: IOrbit) {
  if (typeof(node1) === 'undefined' || typeof(node2) === 'undefined') {
    return 0
  }

  let path1 = getPathToRoot(node1)
  let path2 = getPathToRoot(node2)

  for (let i = 0; ; i++) {
    if (path1[i] !== path2[i]) {
      return path1.length + path2.length - 2*i - 2
    }
  }
}

export function solve(input: string) {
  let tree: IOrbitArray = {};
  const orbits = input.split('\n').map(line => line.split(')'))

  orbits.forEach(orbit => {
    orbit.forEach(object => tree[object] = {
      satellites: [],
      parent: null,
      name: object,
    })
  })

  orbits.forEach(orbit => {
    tree[orbit[0]].satellites.push(tree[orbit[1]])
    tree[orbit[1]].parent = tree[orbit[0]]
  })

  return {
    part1: getTotalOrbits(tree['COM'], 0),
    part2: getPathLength(tree['YOU'], tree['SAN']),
  };
}
