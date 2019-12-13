import { IntcodeComputer } from './IntcodeComputer';

/*
    console.log(score);
    for (let y = 0; y < 23; y++) {
      let buffer = '';
      for (let x = 0; x < 37; x++) {
        switch (map[x][y]) {
          case 0:
            buffer += '.';
            break;
          case 1:
            buffer += '#';
            break;
          case 2:
            buffer += 'X';
            break;
          case 3:
            buffer += '-';
            break;
          case 4:
            buffer += 'O';
            break;
        }
      }
      console.log(buffer);
    }*/

export function solve(input: string) {
  let memory = input
    .split(',')
    .map(Number)
    .concat(new Array(10000).fill(0));

  memory[0] = 2;
  let computer = new IntcodeComputer(memory);
  let score = 0;
  let ballPos = 0;
  let paddlePos = 0;

  let map = new Array(37).fill(0).map(x => new Array(23).fill(-1));
  let part1 = 0;
  let complete = false;

  for (let step = 0; step < 6215; step++) {
    if (step < 6207) {
      do {
        computer.step();
      } while (!computer.waiting);
    } else {
      for (let i = 0; i < 50; i++) {
        computer.step();
        complete = true;
      }
    }

    if (step === 0) {
      part1 = computer.output
        .filter((_, i) => (i % 3) - 2 === 0)
        .filter(number => number === 2).length;
    }

    for (let i = 0; i < computer.output.length; i += 3) {
      const x = computer.output[i];
      const y = computer.output[i + 1];
      const tile = computer.output[i + 2];

      if (x === -1 && y === 0) {
        score = tile;

        if (complete) {
          break;
        }
      } else {
        if (tile === 4) ballPos = x;
        if (tile === 3) paddlePos = x;

        map[x][y] = tile;
      }
    }

    let input = 0;
    if (ballPos < paddlePos) input--;
    if (ballPos > paddlePos) input++;
    computer.input = [input];
    computer.output = [];
  }

  return {
    part1: part1,
    part2: score
  };
}
