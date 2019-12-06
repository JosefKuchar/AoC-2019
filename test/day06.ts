
import { expect } from 'chai';
import 'mocha';
import { solve } from '../src/day6';

describe('Day 1', () => {
  describe('Part 1', () => {
    it('The total number of direct and indirect orbits in this example is 42', () => {
      const input = 'COM)B\nB)C\nC)D\nD)E\nE)F\nB)G\nG)H\nD)I\nE)J\nJ)K\nK)L'
      const result = solve(input);
      expect(result.part1).to.equal(42);
    });
  });
  describe('Part 2', () => {
    it('To move from K to I, a minimum of 4 orbital transfers are required', () => {
      const input = 'COM)B\nB)C\nC)D\nD)E\nE)F\nB)G\nG)H\nD)I\nE)J\nJ)K\nK)L\nK)YOU\nI)SAN'
      const result = solve(input);
      expect(result.part2).to.equal(4);
    });
  });
});
