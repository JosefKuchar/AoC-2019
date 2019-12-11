import { IntcodeComputer } from './IntcodeComputer';

function part1(memory: number[]) {
  let computer = new IntcodeComputer(memory);
  let map: number[][] = new Array(1000)
    .fill(0)
    .map(() => new Array(1000).fill(-1));
  let pos = [500, 500];
  let rotation = 0;

  computer.input = [0];

  while (!computer.halted) {
    if (computer.output.length === 2) {
      map[pos[0]][pos[1]] = computer.output[0];
      rotation += computer.output[1] === 0 ? 3 : 1;
      rotation %= 4;
      switch (rotation) {
        case 0:
          pos[1]--;
          break;
        case 1:
          pos[0]++;
          break;
        case 2:
          pos[1]++;
          break;
        case 3:
          pos[0]--;
          break;
      }

      computer.output = [];
      computer.input = [map[pos[0]][pos[1]] < 1 ? 0 : 1];
    }

    computer.step();
  }

  return map
    .map(col => col.filter(cell => cell !== -1).length)
    .reduce((a, b) => a + b, 0);
}

function part2(memory: number[]) {
  let computer = new IntcodeComputer(memory);
  let map: number[][] = new Array(100)
    .fill(0)
    .map(() => new Array(100).fill(1));
  let pos = [50, 50];
  let rotation = 0;

  computer.input = [1];

  while (!computer.halted) {
    if (computer.output.length === 2) {
      map[pos[0]][pos[1]] = computer.output[0];
      rotation += computer.output[1] === 0 ? 3 : 1;
      rotation %= 4;
      switch (rotation) {
        case 0:
          pos[1]--;
          break;
        case 1:
          pos[0]++;
          break;
        case 2:
          pos[1]++;
          break;
        case 3:
          pos[0]--;
          break;
      }

      computer.output = [];
      computer.input = [map[pos[0]][pos[1]]];
    }

    computer.step();
  }

  for (let y = 0; y < 100; y++) {
    let buffer = '';
    for (let x = 0; x < 100; x++) {
      buffer += map[x][y] === 0 ? '.' : '#';
    }
    console.log(buffer);
  }
}

export function solve(input: string) {
  const memory = input
    .split(',')
    .map(Number)
    .concat(new Array(10000).fill(0));

  return {
    part1: part1([...memory]),
    part2: part2([...memory])
  };
}
