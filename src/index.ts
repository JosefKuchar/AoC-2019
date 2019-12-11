import * as fs from 'fs';

import { isNumber } from 'util';

import * as day1 from './day1';
import * as day2 from './day2';
import * as day3 from './day3';
import * as day4 from './day4';
import * as day5 from './day5';
import * as day6 from './day6';
import * as day7 from './day7';
import * as day8 from './day8';
import * as day9 from './day9';
import * as day10 from './day10';
import * as day11 from './day11';

const days = [
  day1,
  day2,
  day3,
  day4,
  day5,
  day6,
  day7,
  day8,
  day9,
  day10,
  day11
];

const day = parseInt(process.argv[2]);

if (!isNumber(day) || isNaN(day) || day < 0 || day > days.length) {
  console.log('Error: You must specify valid day');
} else {
  let hrstart = process.hrtime();
  let answer = days[day - 1].solve(readInput(day));
  let hrend = process.hrtime(hrstart);

  console.log('Day ', day);
  console.log('Part 1: ', answer.part1);
  console.log('Part 2: ', answer.part2);
  console.info('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000);

  function readInput(day: number): string {
    let input = fs.readFileSync('inputs/day' + day + '.txt', 'utf8');
    return input.trim();
  }
}
