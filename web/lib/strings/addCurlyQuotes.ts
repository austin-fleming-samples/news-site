import { pipe } from '@lib/fp';
import { quotationMarksRegex } from '@lib/regex';

// TODO: remove commented code once new version is confirmed

/*
const removeFirstQuote = (inputString: string) => {
  const getFirstChar = (value: string) => value[0];

  const firstCharIsQuote = (value: string): boolean =>
    quotationMarksRegex.test(getFirstChar(value));

  const removeFirstChar = (value: string) => value.slice(1);

  const removeFirstQuote = (value: string) =>
    firstCharIsQuote(value) ? removeFirstChar(value) : value;

  return removeFirstQuote(inputString);
};
*/

/*
const removeLastQuote = (inputString: string) => {
  const getLastChar = (value: string) => value[value.length - 1];

  const lastCharIsQuote = (value: string): boolean => quotationMarksRegex.test(getLastChar(value));

  const removeLastChar = (value: string) => value.slice(0, -1);

  const removeLastQuote = (value: string) =>
    lastCharIsQuote(value) ? removeLastChar(value) : value;

  return removeLastQuote(inputString);
};
*/

const removeFirstQuote = (inputString: string) => {
  const getFirstChar = (value: string) => value[0];

  const firstCharIsQuote = (value: string): boolean =>
    quotationMarksRegex.test(getFirstChar(value));

  const removeFirstChar = (value: string) => value.slice(1);

  return firstCharIsQuote(inputString) ? removeFirstChar(inputString) : inputString;
};

const removeLastQuote = (inputString: string) => {
  const getLastChar = (value: string) => value[value.length - 1];

  const lastCharIsQuote = (value: string): boolean => quotationMarksRegex.test(getLastChar(value));

  const removeLastChar = (value: string) => value.slice(0, -1);

  return lastCharIsQuote(inputString) ? removeLastChar(inputString) : inputString;
};

const trimWhitespace = (value: string) => value.trim();

const wrapStringInCurlyQuotes = (value:string) => `“${value}”`

export const addCurlyQuotes = (value:string) =>
  pipe(
    trimWhitespace,
    removeFirstQuote,
    removeLastQuote,
    wrapStringInCurlyQuotes
  )(value)
