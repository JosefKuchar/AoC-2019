import { IntcodeComputer } from './IntcodeComputer'

export function solve(input: string) {
  const numbers = input.split(',').map(Number)

  let computer = new IntcodeComputer([...numbers]);
  computer.input = [1]
  computer.simulate()
  const part1 = computer.output.reduce((acc, out) => acc + out, 0)
  computer.memory = [...numbers]
  computer.halted = false
  computer.input = [5]
  computer.simulate()
  const part2 = computer.output[0]

  return {
    part1,
    part2,
  };
}
