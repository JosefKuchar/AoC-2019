import { combination } from 'js-combinatorics';

function gcd2(a: number, b: number): number {
  // Greatest common divisor of 2 integers
  if (!b) return b === 0 ? a : NaN;
  return gcd2(b, a % b);
}

function lcm2(a: number, b: number) {
  // Least common multiple of 2 integers
  return (a * b) / gcd2(a, b);
}

function lcm(array: number[]) {
  // Least common multiple of a list of integers
  var n = 1;
  for (var i = 0; i < array.length; ++i) n = lcm2(array[i], n);
  return n;
}

export function solve(input: string) {
  const moons = input
    .split('\n')
    .map(line => line.match(/[-]?\d+/g)!.map(Number))
    .map(position => ({
      position,
      velocity: [0, 0, 0]
    }));

  const initial = JSON.parse(JSON.stringify(moons));

  let repeat = [-1, -1, -1];
  let part1 = 0;

  const combinations = combination(moons, 2).toArray();

  for (let step = 0; ; step++) {
    combinations.forEach(comb => {
      for (let i = 0; i < 3; i++) {
        const diff = comb[0].position[i] - comb[1].position[i];
        if (diff < 0) {
          comb[0].velocity[i]++;
          comb[1].velocity[i]--;
        } else if (diff > 0) {
          comb[1].velocity[i]++;
          comb[0].velocity[i]--;
        }
      }
    });

    for (let dir = 0; dir < 3; dir++) {
      if (
        repeat[dir] === -1 &&
        moons.every(
          (moon, i) =>
            moon.position[dir] === initial[i].position[dir] &&
            moon.velocity[dir] === 0
        )
      ) {
        repeat[dir] = step + 1;
      }
    }

    moons.forEach(moon => {
      for (let i = 0; i < 3; i++) {
        moon.position[i] += moon.velocity[i];
      }
    });

    if (step === 999) {
      part1 = moons.reduce(
        (acc, moon) =>
          acc +
          moon.position.reduce((acc, val) => acc + Math.abs(val), 0) *
            moon.velocity.reduce((acc, val) => acc + Math.abs(val), 0),
        0
      );
    }

    if (repeat.every(number => number !== -1)) break;
  }

  return {
    part1,
    part2: lcm(repeat)
  };
}
