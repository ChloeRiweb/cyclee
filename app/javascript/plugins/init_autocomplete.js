import places from 'places.js';

const initAutocomplete = () => {
  const addressInput = document.getElementById('search');
  if (addressInput) {
    places({
      container: addressInput,
      countries: ['fr'],
    });
  }
};

export { initAutocomplete };
