interface IIntersection {
  x: number,
  y: number,
  steps: number,
  distance: number
}

interface IPoint {
  x: number,
  y: number,
  steps: number
}

export function solve(input: string) {
    const paths = input.split('\n').map(path => path.split(','));
    let visited: Set<string> = new Set();
    let intersections: IIntersection[] = new Array();
    let path1: IPoint[] = new Array();

    paths.forEach((path, index) => {
        let x = 0;
        let y = 0;
        let steps = 0;
        path.forEach(segment => {
            let direction = segment.substring(0, 1);
            let length = parseInt(segment.substring(1));

            for (let i = 0; i < length; i++) {
                switch (direction) {
                    case 'L':
                        x--;
                        break;
                    case 'R':
                        x++;
                        break;
                    case 'D':
                        y--;
                        break;
                    case 'U':
                        y++;
                        break;
                }
                steps++;

                if (index === 0) {
                    visited.add([x, y].join(','));
                    path1.push({ x, y, steps });
                } else {
                    if (visited.has([x, y].join(','))) {
                        intersections.push({
                            x,
                            y,
                            steps,
                            distance: Math.abs(x) + Math.abs(y)
                        });
                    }
                }
            }
        });
    });

    return {
        part1: intersections.reduce(
            (acc, intersection) =>
                intersection.distance < acc ? intersection.distance : acc,
            Number.MAX_SAFE_INTEGER
        ),
        part2: intersections
            .map(
                intersection =>
                    path1.find(
                        point =>
                            point.x === intersection.x &&
                            point.y === intersection.y
                    )!.steps + intersection.steps
            )
            .reduce(
                (acc, steps) => (steps < acc ? steps : acc),
                Number.MAX_SAFE_INTEGER
            )
    };
}
