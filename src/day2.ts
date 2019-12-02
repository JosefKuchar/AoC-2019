export function part2(numbers: number[]) {
  for (let noun = 0; noun < 100; noun++) {
    for (let verb = 0; verb < 100; verb++) {
      if (part1([...numbers], noun, verb) === 19690720)
        return 100 * noun + verb
    }
  }
}

export function part1(numbers: number[], noun: number, verb: number) {
  numbers[1] = noun
  numbers[2] = verb
  for (let i = 0; i < numbers.length; i += 4) {
    const opcode = numbers[i]

    if (opcode === 99) {
      break;
    }

    const a = numbers[numbers[i + 1]]
    const b = numbers[numbers[i + 2]]
    const addr = numbers[i + 3]

    if (opcode === 1) {
      numbers[addr] = a + b
    } else {
      numbers[addr] = a * b
    }
  }

  return numbers[0]
}

export function solve(input: string) {
  const numbers = input.split(',').map(x => parseInt(x))
  return {
    part1: part1([...numbers], 12, 2),
    part2: part2([...numbers]),
  };
}
