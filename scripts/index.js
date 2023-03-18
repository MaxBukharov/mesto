const popupContainers = document.querySelectorAll('.popup');
const buttonOpenEditProfileForm = document.querySelector('.profile__edit-button');
const popupEditContainer = document.querySelector('.popup_edit-profile');
const popupAddContainer = document.querySelector('.popup-add');
const formEditProfile = document.querySelector('.popup__form');
const formAddCard = document.querySelector('.popup-add__form');
const buttonCloseEditProfilePopup = document.querySelector('.popup__close');
const buttonCloseAddCardPopup = document.querySelector('.popup-add__close');
const popupName = formEditProfile.querySelector('.popup__form-input_profile_name');
const popupDescription = formEditProfile.querySelector('.popup__form-input_profile_description');
const popupCardName = formAddCard.querySelector('.popup__form-input_card_name');
const popupCardImage = formAddCard.querySelector('.popup__form-input_card_image');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__subtitle');
const buttonOpenAddCardForm = document.querySelector('.profile__add-button');
const imagePopup = document.querySelector('.popup-image');
const bigImage = imagePopup.querySelector('.popup-image__picture');
const imageCaption = imagePopup.querySelector('.popup-image__caption');
const buttonCloseImagePopup = imagePopup.querySelector('.popup-image__close');
const cardTemplate = document.querySelector('#cardTemplate').content;
const cardsGallery = document.querySelector('.elements');
const closeButtons = document.querySelectorAll('.popup__close');

const createCard = card => {
  const newCard = cardTemplate.cloneNode(true);
  const cardName = newCard.querySelector('.element__title');
  const deleteButton = newCard.querySelector('.element__delete');
  const likeButton = newCard.querySelector('.element__like-button');
  cardName.textContent = card.name;
  const cardImage = newCard.querySelector('.element__image');
  cardImage.setAttribute('src', card.src);
  cardImage.setAttribute('alt', card.alt);
  cardImage.addEventListener('click', function () {
    openPopup(imagePopup);
    bigImage.setAttribute('src', cardImage.src);
    imageCaption.textContent = card.name;
    imageCaption.setAttribute('alt', card.name);
  });
  deleteButton.addEventListener('click', function (evt) {
    evt.target.parentElement.remove();
  });
  likeButton.addEventListener('click', function (evt) {
    evt.target.classList.add('element__like-button_active');
  });
  return newCard;
};

const addCard = card => {
  cardsGallery.prepend(createCard(card));
};

function submitEditProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileDescription.textContent = popupDescription.value;
  closePopup(popupEditContainer);
}

function submitAddCardForm(evt) {
  evt.preventDefault();
  const card = new Object();
  card.name = popupCardName.value;
  card.src = popupCardImage.value;
  card.alt = popupCardName.value;
  addCard(card);
  closePopup(popupAddContainer);
  formAddCard.reset();
  const addCardSaveButton = formAddCard.querySelector('.popup__form-save');
  addCardSaveButton.classList.add('popup__form-save_type_disabled');
  addCardSaveButton.disabled = true;
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

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupOnEscape);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupOnEscape);
}

initialCards.forEach(addCard);

buttonOpenEditProfileForm.addEventListener('click', function () {
  openPopup(popupEditContainer);
  popupName.value = profileName.textContent;
  popupDescription.value = profileDescription.textContent;
});

buttonOpenAddCardForm.addEventListener('click', function () {
  openPopup(popupAddContainer);
});

formEditProfile.addEventListener('submit', submitEditProfileForm);

formAddCard.addEventListener('submit', submitAddCardForm);

closeButtons.forEach(button => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => {
    closePopup(popup);
  });
});

closePopupOnClick(popupContainers);
