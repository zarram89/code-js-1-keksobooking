const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');

const setDisabled = (elements, isDisabled) => {
  elements.forEach((el) => {
    el.disabled = isDisabled;
  });
};

export const setInactiveState = () => {
  adForm.classList.add('ad-form--disabled');
  mapFilters.classList.add('map__filters--disabled');

  setDisabled([...adForm.querySelectorAll('fieldset, select, input, button, textarea')], true);
  setDisabled([...mapFilters.querySelectorAll('fieldset, select, input, button, textarea')], true);
};

export const setActiveState = () => {
  adForm.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('map__filters--disabled');

  setDisabled([...adForm.querySelectorAll('fieldset, select, input, button, textarea')], false);
  setDisabled([...mapFilters.querySelectorAll('fieldset, select, input, button, textarea')], false);
};
