export function makeEaseOut(timing) {
  return (timeFraction) => 1 - timing(1 - timeFraction);
}

export function elastic(timeFraction) {
  return Math.pow(2, 10 * (timeFraction - 1)) * Math.cos(20 * Math.PI * 1.5 / 3 * timeFraction);
}

export const elasticOut = makeEaseOut(elastic);

export function bounce(timeFraction) {
  for (let a = 0, b = 1, result; 1; a += b, b /= 2) {
    if (timeFraction >= (7 - 4 * a) / 11) {
      return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2);
    }
  }
}

export function linear(timeFraction) {
  return timeFraction;
}
