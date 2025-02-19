// const input = ["12 6 1/2", "12", "12 0 3/6", "0 0 4/12", "0 4 1/2", "1 3", "2 3 1/8"];
// [75'-3", 72', 72'-3", 0'-2", 2'-3", 7'-6", 13'-6 3/4"]
// const multiplier = 6;

function simplifyFraction(numerator, denominator) {
  if (numerator === 0 || isNaN(numerator)) return [0, 1];
  function gcd(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);

    return b === 0 ? a : gcd(b, a % b);
  }

  let divisor = gcd(numerator, denominator);
  return [numerator / divisor, denominator / divisor];
}

export const unFormattedFractionMultiply = function (entry, multiplier) {
  const parts = entry.split(" ");
  const feet = parts[0] === undefined ? 0 : Number(parts[0]);
  const inches = parts[1] === undefined ? 0 : Number(parts[1]);
  const fraction = parts[2];
  let numerator = 0;
  let denominator = 1;
  if (fraction !== undefined) {
    const fractionParts = fraction.split("/");
    numerator = Number(fractionParts[0]);
    denominator = Number(fractionParts[1]);
  }
  const totalInches = feet * 12 + inches;
  numerator += totalInches * denominator;
  numerator *= multiplier;
  const newFeet = Math.floor(numerator / denominator / 12);
  numerator = numerator - newFeet * 12 * denominator;
  let newInches = 0;

  newInches = Math.floor(numerator / denominator);
  numerator -= newInches * denominator;
  [numerator, denominator] = simplifyFraction(numerator, denominator);
  return { newFeet, newInches, numerator, denominator };
};
/**
 * Parses a fraction string (e.g., "1/2") into a numerator and denominator.
 * @param {string} fraction - The fraction string (e.g., "1/2").
 * @returns {Object} - An object with numerator and denominator.
 */
export const parseFraction = (fraction) => {
  if (!fraction) return { numerator: 0, denominator: 1 }; // Default to 0 if no fraction

  const parts = fraction.split("/");
  if (parts.length !== 2) throw new Error("Invalid fraction format");

  const numerator = parseInt(parts[0], 10);
  const denominator = parseInt(parts[1], 10);

  if (isNaN(numerator) || isNaN(denominator) || denominator === 0) {
    throw new Error("Invalid fraction values");
  }

  return { numerator, denominator };
};

/**
 * Adds two fractions.
 * @param {Object} frac1 - First fraction { numerator, denominator }.
 * @param {Object} frac2 - Second fraction { numerator, denominator }.
 * @returns {Object} - Sum of the fractions as { numerator, denominator }.
 */
export const addFractions = (frac1, frac2) => {
  const numerator =
    frac1.numerator * frac2.denominator + frac2.numerator * frac1.denominator;
  const denominator = frac1.denominator * frac2.denominator;
  return simplifyFraction({ numerator, denominator });
};

/**
 * Multiplies two fractions.
 * @param {Object} frac1 - First fraction { numerator, denominator }.
 * @param {Object} frac2 - Second fraction { numerator, denominator }.
 * @returns {Object} - Product of the fractions as { numerator, denominator }.
 */
export const multiplyFractions = (frac1, frac2) => {
  const numerator = frac1.numerator * frac2.numerator;
  const denominator = frac1.denominator * frac2.denominator;
  return simplifyFraction({ numerator, denominator });
};

/**
 * Simplifies a fraction.
 * @param {Object} fraction - Fraction { numerator, denominator }.
 * @returns {Object} - Simplified fraction { numerator, denominator }.
 */
export const simplifyFraction2 = (fraction) => {
  const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b)); // Greatest Common Divisor
  const divisor = gcd(fraction.numerator, fraction.denominator);
  return {
    numerator: fraction.numerator / divisor,
    denominator: fraction.denominator / divisor,
  };
};

/**
 * Converts a string like "12 6 1/2" into total inches as a fraction.
 * @param {string} input - The input string (e.g., "12 6 1/2").
 * @returns {Object} - Total inches as a fraction { numerator, denominator }.
 */
export const parseFeetInchesToFraction = (input) => {
  const parts = input.trim().split(" ");
  const feet = parts[0] ? parseInt(parts[0], 10) : 0;
  const inches = parts[1] ? parseInt(parts[1], 10) : 0;
  const fraction = parts[2]
    ? parseFraction(parts[2])
    : { numerator: 0, denominator: 1 };

  if (isNaN(feet) || isNaN(inches)) {
    throw new Error("Invalid feet or inches value");
  }

  // Convert feet to inches and add everything together
  const totalInches = feet * 12 + inches;
  const totalInchesFraction = { numerator: totalInches, denominator: 1 };
  return addFractions(totalInchesFraction, fraction);
};

/**
 * Multiplies an array of strings (like "12 6 1/2") by a given number.
 * @param {string[]} inputs - Array of strings (e.g., ["12 6 1/2", "12 6", "12"]).
 * @param {number} multiplier - The number to multiply by.
 * @returns {Object[]} - Array of products as fractions { numerator, denominator }.
 */
export const multiplyFeetInchesArray = (inputs, multiplier) => {
  const multiplierFraction = { numerator: multiplier, denominator: 1 };

  return inputs.map((input) => {
    const totalInches = parseFeetInchesToFraction(input);
    return multiplyFractions(totalInches, multiplierFraction);
  });
};

function gcd(a, b) {
  // Greatest Common Divisor function
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

export const convertToFeetInchesSimplified = (numerator, denominator) => {
  // Calculate feet (1 foot = 12 inches)
  const feet = Math.floor(numerator / 12);

  // Calculate remaining inches
  const remainingInches = numerator % 12;

  if (remainingInches === 0) {
    return `${feet}'-0"`;
  } else {
    // Simplify the fraction
    const commonDivisor = gcd(remainingInches, denominator);
    const simplifiedNumerator = remainingInches / commonDivisor;
    const simplifiedDenominator = denominator / commonDivisor;

    return `${feet}'-${simplifiedNumerator}/${simplifiedDenominator}"`;
  }
};
