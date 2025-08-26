import Pristine from '../pristine/pristine.min.js';

const adForm = document.querySelector('.ad-form');
const titleInput = adForm.querySelector('#title');
const priceInput = adForm.querySelector('#price');
const typeSelect = adForm.querySelector('#type');
const roomSelect = adForm.querySelector('#room_number');
const capacitySelect = adForm.querySelector('#capacity');
const timeinSelect = adForm.querySelector('#timein');
const timeoutSelect = adForm.querySelector('#timeout');

// === Pristine init ===
const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__error'
});

// === 1. Заголовок ===
const validateTitle = (value) => value.length >= 30 && value.length <= 100;
pristine.addValidator(titleInput, validateTitle, 'От 30 до 100 символов');

// === 2. Цена ===
const typeToMinPrice = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const getMinPrice = () => typeToMinPrice[typeSelect.value];

const validatePrice = (value) => {
  const num = Number(value);
  return num >= getMinPrice() && num <= 100000;
};
pristine.addValidator(priceInput, validatePrice, () => `Минимальная цена ${getMinPrice()}`);

// При смене типа жилья обновляем атрибуты поля цены
typeSelect.addEventListener('change', () => {
  const minPrice = getMinPrice();
  priceInput.min = minPrice;
  priceInput.placeholder = minPrice;
  pristine.validate(priceInput); // обновляем валидацию
});

// === 3. Комнаты ↔ гости ===
const roomToGuests = {
  1: ['1'],
  2: ['1','2'],
  3: ['1','2','3'],
  100: ['0'],
};

const validateCapacity = () =>
  roomToGuests[roomSelect.value].includes(capacitySelect.value);

pristine.addValidator(capacitySelect, validateCapacity, 'Количество гостей не подходит для выбранного количества комнат');

// === 4. Время заезда ↔ выезда ===
timeinSelect.addEventListener('change', () => {
  timeoutSelect.value = timeinSelect.value;
});
timeoutSelect.addEventListener('change', () => {
  timeinSelect.value = timeoutSelect.value;
});

// === 5. Submit ===
adForm.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
  }
});
