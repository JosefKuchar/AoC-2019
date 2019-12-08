export function solve(input: string) {
  const data = input.split('').map(Number)

  let leastZeros = Number.MAX_SAFE_INTEGER;
  let part1 = 0;

  let layers: number[][] = new Array(data.length / 150).fill(0).map(() => [])
  data.forEach((number, index) => {
    layers[Math.floor(index / 150)].push(number)
  })

  layers.forEach(layer => {
    let zeros = layer.filter(number => number === 0).length
    if (zeros < leastZeros) {
      leastZeros = zeros
      part1 = layer.filter(number => number === 2).length * layer.filter(number => number === 1).length
    }
  })

  let img: string[][] = new Array(6).fill(0).map(() => [])
  for (let i = 0; i < 150; i++) {
    for (let j = 0; j < 100; j++) {
      if (layers[j][i] !== 2) {
        img[Math.floor(i / 25)][i % 25] = layers[j][i] === 1 ? '#' : '.'
        break;
      }
    }
  }

  img.forEach(row => console.log(row.join('')))

  return {
    part1,
    part2: 0,
  };
}
