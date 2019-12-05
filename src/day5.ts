interface IParam {
  value: number,
  address: number,
}

enum Mode {
  Position,
  Immediate,
}

let INPUT = 0;
let OUTPUT = 0;

function add(mem: number[], params: IParam[]) {
  mem[params[2].address] = params[0].value + params[1].value
}

function multiply(mem: number[], params: IParam[]) {
  mem[params[2].address] = params[0].value * params[1].value
}

function readInteger(mem: number[], params: IParam[]) {
  mem[params[0].address] = INPUT;
}

function printInteger(mem: number[], params: IParam[]) {
  OUTPUT += params[0].value;
}

function jumpIfTrue(mem: number[], params: IParam[]) {
  return params[0].value !== 0 ? params[1].value : 0
}

function jumpIfFalse(mem: number[], params: IParam[]) {
  return params[0].value === 0 ? params[1].value : 0
}

function lessThan(mem: number[], params: IParam[]) {
  mem[params[2].address] = params[0].value < params[1].value ? 1 : 0
}

function equals(mem: number[], params: IParam[]) {
  mem[params[2].address] = params[0].value === params[1].value ? 1 : 0
}

const instructions = [() => 0, add, multiply, readInteger, printInteger, jumpIfTrue, jumpIfFalse, lessThan, equals];
const paramCounts = [0, 3, 3, 1, 1, 2, 2, 3, 3];

export function simulate(memory: number[], input: number) {
  let pc = 0;
  INPUT = input
  OUTPUT = 0

  while (true) {
    const instruction = memory[pc]
    const opcode = instruction % 100

    if (opcode === 99) break;

    let params = []
    for (let i = 0; i < paramCounts[opcode]; i++) {
      const mode = Math.floor(instruction / Math.pow(10, 2 + i)) % 10
      if (mode === Mode.Position) {
        params.push({ value: memory[memory[pc + i + 1]], address: memory[pc + i + 1] })
      } else {
        params.push({ value: memory[pc + i + 1], address: -1})
      }
    }
    const ret: number | undefined | void = instructions[opcode](memory, params);
    if (typeof(ret) !== 'undefined' && ret !== 0) {
      pc = ret;
      continue;
    }
    pc += paramCounts[opcode] + 1
  }

  return OUTPUT
}

export function solve(input: string) {
  const numbers = input.split(',').map(Number)
  return {
    part1: simulate([...numbers], 1),
    part2: simulate([...numbers], 5),
  };
}
