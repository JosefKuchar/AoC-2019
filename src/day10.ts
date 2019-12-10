export function solve(input: string) {
  let asteroids: number[][] = [];
  input.split('\n').forEach((line, y) =>
    line.split('').forEach((character, x) => {
      if (character === '#') {
        asteroids.push([x, y]);
      }
    })
  );

  let stationLocation = [-1, -1];

  const part1 = asteroids.reduce((acc, station) => {
    let detected = new Set();
    asteroids.forEach(asteroid => {
      if (station !== asteroid) {
        detected.add(
          Math.atan2(station[1] - asteroid[1], station[0] - asteroid[0])
        );
      }
    });

    if (detected.size > acc) {
      stationLocation = station;
      return detected.size;
    } else {
      return acc;
    }
  }, 0);

  const newAsteroids = asteroids
    .filter(asteroid => asteroid !== stationLocation)
    .map(asteroid => {
      const angle = Math.atan2(
        asteroid[0] - stationLocation[0],
        stationLocation[1] - asteroid[1]
      );
      return {
        location: asteroid,
        angle: angle < 0 ? angle + 2 * Math.PI : angle,
        destroyed: false
      };
    })
    .sort((a, b) => {
      const diff = a.angle - b.angle;
      if (diff !== 0) {
        return diff;
      }
      {
        return (
          Math.sqrt(
            Math.pow(a.location[0] - stationLocation[0], 2) +
              Math.pow(a.location[1] - stationLocation[1], 2)
          ) -
          Math.sqrt(
            Math.pow(b.location[0] - stationLocation[0], 2) +
              Math.pow(b.location[1] - stationLocation[1], 2)
          )
        );
      }
    });

  let destroyed = 0;
  let lastAngle = -1;
  let part2 = 0;
  for (let i = 0; ; i++) {
    const current = newAsteroids[i % newAsteroids.length];
    if (current.angle !== lastAngle && !current.destroyed) {
      destroyed++;
      current.destroyed = true;
      lastAngle = current.angle;
      if (destroyed === 200) {
        part2 = current.location[0] * 100 + current.location[1];
        break;
      }
    }
  }

  return {
    part1,
    part2
  };
}
