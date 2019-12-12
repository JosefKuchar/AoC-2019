import { expect } from 'chai';
import 'mocha';
import { solve } from '../src/day12';

describe('Day 1', () => {
  describe('Part 2', () => {
    it('To move from K to I, a minimum of 4 orbital transfers are required', () => {
      const input =
        '<x=-1, y=0, z=2>\n<x=2, y=-10, z=-7>\n<x=4, y=-8, z=8>\n<x=3, y=5, z=-1>';
      const result = solve(input);
      expect(result.part2).to.equal(4);
    });
  });
});
