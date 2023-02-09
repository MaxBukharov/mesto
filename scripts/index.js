let editButton = document.querySelector('.profile__edit-button');
let popupContainer = document.querySelector('.popup');
let popupForm = document.querySelector('.popup__form');
let popupCloseButton = document.querySelector('.popup__close');
let popupName = popupForm.querySelector('.popup__form-input_profile_name');
let popupDescription = popupForm.querySelector('.popup__form-input_profile_description');
let profileName = document.querySelector('.profile__title');
let profileDescription = document.querySelector('.profile__subtitle');

function popupSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileDescription.textContent = popupDescription.value;
  popupContainer.classList.add('popup_hidden');
}

function popupClose() {
  popupContainer.classList.add('popup_hidden');
}

editButton.addEventListener('click', function () {
  popupContainer.classList.remove('popup_hidden');
  popupName.value = profileName.textContent;
  popupDescription.value = profileDescription.textContent;
});

popupCloseButton.addEventListener('click', popupClose);

popupForm.addEventListener('submit', popupSubmit);
