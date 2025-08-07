export const getRandomPositiveFloat = (a, b, digits = 1) => {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  return +((Math.random() * (upper - lower)) + lower).toFixed(digits);
};

export const getRandomArrayElement = (arr) =>
  arr[getRandomPositiveFloat(0, arr.length - 1, 0)];

export const getRandomSubarray = (arr, min, max, unique = false) => {
  const count = getRandomPositiveFloat(min, max, 0);
  return unique
    ? [...arr].sort(() => Math.random() - 0.5).slice(0, count)
    : Array.from({length: count}, () => getRandomArrayElement(arr));
};

export const getOfferType = (type) => {
  switch (type) {
    case 'flat':
      return 'Квартира';
    case 'bungalow':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    case 'palace':
      return 'Дворец';
    case 'hotel':
      return 'Отель';
    default:
      return 'Неизвестный тип жилья';
  }
};

