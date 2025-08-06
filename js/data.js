import {getRandomArrayElement, getRandomPositiveFloat, getRandomSubarray} from './util.js';

const offerData = {
  titles: [
    'Уютная квартира в самом центре Москвы',
    'Современные апартаменты с панорамным видом в Челябинске',
    'Просторный дом на берегу моря во Владивостоке',
    'Элегантный пентхаус рядом с Кремлём',
    'Тихая студия в зелёном районе Екатеринбурга',
    'Лофт с дизайнерским ремонтом в Санкт-Петербурге',
    'Дом с садом и баней в Сочи',
    'Бунгало у подножия гор в Красной Поляне',
    'Квартира рядом с метро и парком',
    'Семейное жильё в новом комплексе Казани',
  ],
  descriptions: [
    'Светлая и просторная квартира с балконом и видом на город.',
    'Апартаменты с авторским интерьером и всей необходимой техникой.',
    'Дом на берегу залива с большой террасой и камином.',
    'Уютная студия с современной мебелью и качественным ремонтом.',
    'Жильё с тёплыми полами, отдельной спальней и рабочей зоной.',
    'Пентхаус с джакузи и выходом на крышу.',
    'Квартира в новом доме с техникой и кондиционером.',
    'Бунгало с камином, сауной и уютной верандой.',
    'Жильё бизнес-класса с охраной и парковкой.',
    'Дом с бассейном, мангальной зоной и фруктовым садом.',
  ],
  types: ['palace', 'flat', 'house', 'bungalow', 'hotel'],
  checkTimes: ['12:00', '13:00', '14:00'],
  features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  photos: [
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
  ],
  latitude: {
    min: 35.65,
    max: 35.7,
  },
  longitude: {
    min: 139.7,
    max: 139.8,
  },
  roomRange: [1, 5],
  guestRange: [1, 5],
  priceRange: [1000, 100000],
};

const SIMILAR_POST_COUNT = 10;

const createOffer = () => {
  const lat = getRandomPositiveFloat(offerData.latitude.min, offerData.latitude.max, 5);
  const lng = getRandomPositiveFloat(offerData.longitude.min, offerData.longitude.max, 5);

  return {
    title: getRandomArrayElement(offerData.titles),
    address: `${lat}, ${lng}`,
    price: getRandomPositiveFloat(...offerData.priceRange, 0),
    type: getRandomArrayElement(offerData.types),
    rooms: getRandomPositiveFloat(...offerData.roomRange, 0),
    guests: getRandomPositiveFloat(...offerData.guestRange, 0),
    checkin: getRandomArrayElement(offerData.checkTimes),
    checkout: getRandomArrayElement(offerData.checkTimes),
    features: getRandomSubarray(offerData.features, 0, offerData.features.length, true),
    description: getRandomArrayElement(offerData.descriptions),
    photos: getRandomSubarray(offerData.photos, 1, offerData.photos.length, true),
    location: {
      lat,
      lng,
    },
  };
};

const createListing = (id) => ({
  author: {
    avatar: `img/avatars/user${String(id + 1).padStart(2, '0')}.png`,
  },
  offer: createOffer(),
});

export const generateSimilarPosts = () =>
  Array.from({length: SIMILAR_POST_COUNT}, (_, id) => createListing(id));
