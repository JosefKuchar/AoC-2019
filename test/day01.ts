
import { expect } from 'chai';
import 'mocha';
import { part1, part2 } from '../src/day1';

describe('Day 1', () => {
  describe('Part 1', () => {
    it('For a mass of 12, divide by 3 and round down to get 4, then subtract 2 to get 2', () => {
      const result = part1([12]);
      expect(result).to.equal(2);
    });

    it('For a mass of 14, dividing by 3 and rounding down still yields 4, so the fuel required is also 2', () => {
      const result = part1([14]);
      expect(result).to.equal(2);
    });

    it('For a mass of 1969, the fuel required is 654', () => {
      const result = part1([1969]);
      expect(result).to.equal(654);
    });

    it('For a mass of 100756, the fuel required is 33583', () => {
      const result = part1([100756]);
      expect(result).to.equal(33583);
    });
  });

  describe('Part 2', () => {
    it('The fuel required by a module of mass 100756 and its fuel is: 33583 + 11192 + 3728 + 1240 + 411 + 135 + 43 + 12 + 2 = 50346', () => {
      const result = part2([100756]);
      expect(result).to.equal(50346);
    });
  });
});
