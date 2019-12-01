function calculateFuel(mass: number): number {
  let sum = 0;
  let fuel = Math.floor(mass / 3) - 2
  if (fuel > 0) {
    sum += fuel
    sum += calculateFuel(fuel)
  }
  return sum
}

export function part1(masses: number[]) {
  return masses.map(mass => Math.floor(mass / 3) - 2).reduce((acc, fuel) => fuel + acc, 0)
}

export function part2(masses: number[]) {
  return masses.reduce((acc, fuel) => calculateFuel(fuel) + acc, 0)
}

export function solve(input: string) {
  const numbers = input.split('\n').map(x => parseInt(x))
  return {
    part1: part1(numbers),
    part2: part2(numbers),
  };
}
