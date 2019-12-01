import * as fs from 'fs';

import { isNumber } from 'util';

const days = [

];

const day = parseInt(process.argv[2]);

if (!isNumber(day) || isNaN(day) || day < 0 || day > days.length) {
    console.log('Error: You must specify valid day');
} else {
    let answer = days[day - 1].solve(readInput(day));

    console.log('Day ', day);
    console.log('Part 1: ', answer.part1);
    console.log('Part 2: ', answer.part2);

    function readInput(day: number): string {
        return fs.readFileSync('inputs/day' + day + '.txt', 'utf8');
    }
}
