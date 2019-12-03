
import { expect } from 'chai';
import 'mocha';
import { solve } from '../src/day3';

describe('Day 1', () => {
  describe('Part 1', () => {
    it('The closest intersection should be at distance 159', () => {
      const input = 'R75,D30,R83,U83,L12,D49,R71,U7,L72\nU62,R66,U55,R34,D71,R55,D58,R83'
      const result = solve(input);
      expect(result.part1).to.equal(159);
    });
    it('The closest intersection should be at distance 135', () => {
      const input = 'R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51\nU98,R91,D20,R16,D67,R40,U7,R15,U6,R7'
      const result = solve(input);
      expect(result.part1).to.equal(135);
    });
  });

  describe('Part 2', () => {
    it('The best intersection should take 610 steps', () => {
      const input = 'R75,D30,R83,U83,L12,D49,R71,U7,L72\nU62,R66,U55,R34,D71,R55,D58,R83'
      const result = solve(input);
      expect(result.part2).to.equal(610);
    });
    it('The best intersection should take 410 steps', () => {
      const input = 'R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51\nU98,R91,D20,R16,D67,R40,U7,R15,U6,R7'
      const result = solve(input);
      expect(result.part2).to.equal(410);
    });
  });
});
