export default function calculateCookingTime(size, initialTemp, waterTemp, targetYolkTemp) {
  const coeff = 0.15 ** ((size / Math.PI), 2);
  const toLn = ((2 * (waterTemp - initialTemp)) / (waterTemp - targetYolkTemp));
  return Number(coeff * Math.log(toLn)).toFixed(2);
}
