import { calculateReadingTime } from '../lib/utils.js';

describe('Reading Time Calculator', () => {
  it('should calculate time for empty content', () => {
    expect(calculateReadingTime('')).toBe(0);
  });

  it('should calculate time for short content', () => {
    const content = 'This is a short test';
    expect(calculateReadingTime(content)).toBe(1);
  });

  it('should calculate time for long content', () => {
    const content = Array(300).fill('word ').join('');
    expect(calculateReadingTime(content)).toBe(2);
  });
});
