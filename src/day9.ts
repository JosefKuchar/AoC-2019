import { IntcodeComputer } from './IntcodeComputer';

function simulate(memory: number[], input: number) {
  let computer = new IntcodeComputer(memory);
  computer.input = [input];
  computer.simulate();
  return computer.output[0];
}

export function solve(input: string) {
  const memory = input
    .split(',')
    .map(Number)
    .concat(new Array(10000).fill(0));

  return {
    part1: simulate([...memory], 1),
    part2: simulate([...memory], 2)
  };
}
