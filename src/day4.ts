export function solve(input: string) {
  const range = input.split('-').map(Number);
  let part1 = 0
  let part2 = 0

  for (let i = range[0]; i <= range[1]; i++) {
    let digits = i.toString().split('').map(Number)
    let groups: number[] = [];
    let decrease = false;
    digits.reduce((prev, curr) => {
      if (prev === curr) {
        groups[groups.length - 1]++;
      } else {
        groups.push(1)
      }

      if (curr < prev) {
        decrease = true
      }

      return curr
    }, -1)

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
