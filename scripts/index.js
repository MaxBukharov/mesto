const popupContainers = document.querySelectorAll('.popup');
const buttonOpenEditProfileForm = document.querySelector('.profile__edit-button');
const popupEditContainer = document.querySelector('.popup_edit-profile');
const popupAddContainer = document.querySelector('.popup-add');
const formEditProfile = document.querySelector('.popup__form');
const formAddCard = document.querySelector('.popup-add__form');
const popupName = formEditProfile.querySelector('.popup__form-input_profile_name');
const popupDescription = formEditProfile.querySelector('.popup__form-input_profile_description');
const popupCardName = formAddCard.querySelector('.popup__form-input_card_name');
const popupCardImage = formAddCard.querySelector('.popup__form-input_card_image');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__subtitle');
const buttonOpenAddCardForm = document.querySelector('.profile__add-button');
const cardTemplate = document.querySelector('#cardTemplate').content;
const cardsGallery = document.querySelector('.elements');
const closeButtons = document.querySelectorAll('.popup__close');
const imagePopup = document.querySelector('.popup-image');
const bigImage = imagePopup.querySelector('.popup-image__picture');
const imageCaption = imagePopup.querySelector('.popup-image__caption');
const profileForm = document.querySelector('.popup__form');
const addCardForm = document.querySelector('.popup-add__form');
const config = {
  inputListSelector: '.popup__form-input',
  errorElementSelector: '.popup__form-input-error',
  errorClassTemplate: '.popup__form-input-error_type_',
  errorClassActive: 'popup__form-input-error_type_active',
  submitButtonSelector: '.popup__button',
  submitButtonDisabled: 'popup__form-save_type_disabled',
  formSelector: '.form'
};

import { initialCards } from './constants.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import Section from './Section.js';
import { containerSelector } from './constants.js';
import Popup from './Popup.js';
import { popupSelector } from './constants.js';



function handleCardClick(name, link) {
  bigImage.setAttribute('src', link);
  bigImage.setAttribute('alt', name);
  imageCaption.textContent = name;
  openPopup(imagePopup);
}

const createCardsSection =  new Section ({items: initialCards, renderer: (item) => {
  const card = new Card(item.name, item.src, item.alt, cardTemplate, handleCardClick);
  const initialCardElement = card.generateCard();
  createCardsSection.addItem(initialCardElement);}}, containerSelector);

  createCardsSection.renderItems();




const createNewCard = (name, link) => {
  const card = new Card(name, link, name, cardTemplate, handleCardClick);
  const newCardElement = card.generateCard();
  return newCardElement;
};

const formValidators = {};

const enableValidation = config => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach(formElement => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(config);

// initialCards.forEach(item => {
//   cardsGallery.prepend(createInitialCard(item));
// });

function submitEditProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileDescription.textContent = popupDescription.value;
  closePopup(popupEditContainer);
}

function submitAddCardForm(evt) {
  evt.preventDefault();
  cardsGallery.prepend(createNewCard(popupCardName.value, popupCardImage.value));
  closePopup(popupAddContainer);
  formAddCard.reset();
}

const closePopupOnClick = popupContainers => {
  popupContainers.forEach(container => {
    container.addEventListener('click', function (evt) {
      if (evt.target === container) {
        closePopup(container);
      }
    });
  });
};

const closePopupOnEscape = evt => {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  }
};

// function closePopup(popup) {
//   popup.classList.remove('popup_opened');
//   document.removeEventListener('keydown', closePopupOnEscape);
// }

// function openPopup(popup) {
//   popup.classList.add('popup_opened');
//   document.addEventListener('keydown', closePopupOnEscape);
// }

buttonOpenEditProfileForm.addEventListener('click', function () {
  const newPopup = new Popup (popupSelector);
  newPopup.open();
  newPopup.setEventListeners();
  // openPopup(popupEditContainer);
  // popupName.value = profileName.textContent;
  // popupDescription.value = profileDescription.textContent;
  // formValidators[profileForm.getAttribute('name')].resetValidation();
});

buttonOpenAddCardForm.addEventListener('click', function () {
  openPopup(popupAddContainer);
  formValidators[addCardForm.getAttribute('name')].resetValidation();
});

formEditProfile.addEventListener('submit', submitEditProfileForm);

formAddCard.addEventListener('submit', submitAddCardForm);

// closeButtons.forEach(button => {
//   const popup = button.closest('.popup');
//   button.addEventListener('click', () => {
//     closePopup(popup);
//   });
// });

// closePopupOnClick(popupContainers);
