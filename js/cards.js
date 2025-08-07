import {getOfferType} from './util.js';

// Получаем шаблон карточки
const similarCardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

// Вспомогательная функция для скрытия блоков с пустыми данными
const setTextContentOrHide = (element, content) => {
  if (!content) {
    element.classList.add('hidden');
  } else {
    element.textContent = content;
  }
};

// Функция отрисовки фич (удаляет те, которых нет в массиве)
const renderOfferFeatures = (featuresContainer, offerFeatures) => {
  const featuresList = featuresContainer.querySelectorAll('.popup__feature');

  featuresList.forEach((featureListItem) => {
    const modifier = featureListItem.classList[1]; // например popup__feature--wifi
    const featureName = modifier?.split('--')[1];

    if (!offerFeatures.includes(featureName)) {
      featureListItem.remove();
    }
  });
};

const createCardElement = ({offer, author}) => {
  const cardElement = similarCardTemplate.cloneNode(true);

  // Заголовок
  setTextContentOrHide(cardElement.querySelector('.popup__title'), offer.title);

  // Адрес
  setTextContentOrHide(cardElement.querySelector('.popup__text--address'), offer.address);

  // Цена
  const priceEl = cardElement.querySelector('.popup__text--price');
  if (offer.price) {
    priceEl.textContent = `${offer.price} ₽/ночь`;
  } else {
    priceEl.classList.add('hidden');
  }

  // Тип жилья
  const typeEl = cardElement.querySelector('.popup__type');
  setTextContentOrHide(typeEl, getOfferType(offer.type));

  // Количество комнат и гостей
  const capacityEl = cardElement.querySelector('.popup__text--capacity');
  if (offer.rooms && offer.guests) {
    capacityEl.textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  } else {
    capacityEl.classList.add('hidden');
  }

  // Время заезда/выезда
  const timeEl = cardElement.querySelector('.popup__text--time');
  if (offer.checkin && offer.checkout) {
    timeEl.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  } else {
    timeEl.classList.add('hidden');
  }

  // Удобства
  const featuresContainer = cardElement.querySelector('.popup__features');
  if (offer.features && offer.features.length) {
    renderOfferFeatures(featuresContainer, offer.features);
  } else {
    featuresContainer.classList.add('hidden');
  }

  // Описание
  const descEl = cardElement.querySelector('.popup__description');
  setTextContentOrHide(descEl, offer.description);

  // Фотографии
  const photosContainer = cardElement.querySelector('.popup__photos');
  const photoTemplate = photosContainer.querySelector('.popup__photo');
  photosContainer.innerHTML = '';

  if (offer.photos && offer.photos.length) {
    offer.photos.forEach((photoUrl) => {
      const photo = photoTemplate.cloneNode(true);
      photo.src = photoUrl;
      photosContainer.appendChild(photo);
    });
  } else {
    photosContainer.classList.add('hidden');
  }

  // Аватар
  const avatar = cardElement.querySelector('.popup__avatar');
  if (author.avatar) {
    avatar.src = author.avatar;
  } else {
    avatar.classList.add('hidden');
  }

  return cardElement;
};

export const renderCards = (cards, container) => {
  const fragment = document.createDocumentFragment();
  const firstCardElement = createCardElement(cards[0]);
  fragment.appendChild(firstCardElement);
  container.appendChild(fragment);
};
