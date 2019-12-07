import { IntcodeComputer } from './IntcodeComputer'
import { permutation } from 'js-combinatorics'

function part1(memory: number[]) {
  let permutations = permutation([0, 1, 2, 3, 4]).toArray()
  let computer = new IntcodeComputer([...memory]);
  let result = 0
  permutations.forEach(perm => {
    let input = 0
    perm.forEach(number => {
      computer.memory = [...memory]
      computer.halted = false
      computer.input = [number, input]
      computer.simulate()
      input = computer.output[0]
    })

    if (input > result)
      result = input
  });
  return result
}

function part2(memory: number[]) {
  let permutations = permutation([5, 6, 7, 8, 9]).toArray()
  let result = 0
  permutations.forEach(perm => {
    let A = new IntcodeComputer([...memory])
    let B = new IntcodeComputer([...memory])
    let C = new IntcodeComputer([...memory])
    let D = new IntcodeComputer([...memory])
    let E = new IntcodeComputer([...memory])
    let amplifiers = [A, B, C, D, E]
    amplifiers.forEach((amp, index) => amp.input.push(perm[index]))
    A.input.push(0)
    let lastE = 0
    while (amplifiers.some(amp => !amp.halted)) {
      amplifiers.forEach(amp => amp.step())
      B.input.push(...A.output)
      C.input.push(...B.output)
      D.input.push(...C.output)
      E.input.push(...D.output)
      A.input.push(...E.output)
      if (E.output.length > 0) {
        lastE = E.output[0]
      }
      amplifiers.forEach(amp => amp.output = [])
    }
    if (lastE > result) {
      result = lastE
    }
  });
  return result
}

export function solve(input: string) {
  const memory = input.split(',').map(Number)

  return {
    part1: part1(memory),
    part2: part2(memory),
  };
}
