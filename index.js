let popupButton = document.querySelector('.profile__edit-button');
let popupContainer = document.querySelector('.popup');
let popupForm = document.querySelector('.popup__form');
let popupCloseButton = document.querySelector('.popup__close');
let popupName = popupForm.querySelector('#name');
let popupDescription = popupForm.querySelector('#description');
let profileName = document.querySelector('.profile__title');
let profileDescription = document.querySelector('.profile__subtitle');

popupButton.addEventListener('click', function () {
  popupContainer.classList.remove('popup__hidden');
  popupName.value = profileName.textContent;
  popupDescription.value = profileDescription.textContent;
});

popupCloseButton.addEventListener('click', function () {
  popupContainer.classList.add('popup__hidden');
});

function popupSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileDescription.textContent = popupDescription.value;
  popupContainer.classList.add('popup__hidden');
}

popupForm.addEventListener('submit', popupSubmit);
