export function solve(input: string) {
  const range = input.split('-').map(Number);
  let part1 = 0
  let part2 = 0

  for (let i = range[0]; i <= range[1]; i++) {
    let digits = i.toString().split('').map(Number)
    let groups: number[] = [];
    digits.reduce((prev, curr) => {
      if (prev === curr) {
        groups[groups.length - 1]++;
      } else {
        groups.push(1)
      }
      return curr
    }, -1)

    let decrease = false;
    for (let j = 0; j < digits.length - 1; j++) {
      if (digits[j] > digits[j + 1]) {
        decrease = true
        break
      }
    }

    if (!decrease) {
      if (groups.some(group => group >= 2)) part1++
      if (groups.some(group => group === 2)) part2++
    }
  }

  return {
    part1,
    part2,
  };
}
