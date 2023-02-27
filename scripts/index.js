const editButton = document.querySelector('.profile__edit-button');
const popupEditContainer = document.querySelector('.popup_edit-profile');
const popupAddContainer = document.querySelector('.popup-add');
const popupForm = document.querySelector('.popup__form');
const popupAddForm = document.querySelector('.popup-add__form');
const popupCloseButton = document.querySelector('.popup__close');
const popupAddCloseButton = document.querySelector('.popup-add__close');
const popupName = popupForm.querySelector('.popup__form-input_profile_name');
const popupDescription = popupForm.querySelector('.popup__form-input_profile_description');
const popupCardName = popupAddForm.querySelector('.popup-add__form-input_card_name');
const popupCardImage = popupAddForm.querySelector('.popup-add__form-input_card_image');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__subtitle');
const addButton = document.querySelector('.profile__add-button');
const imagePopup = document.querySelector('.popup-image');
const bigImage = imagePopup.querySelector('.popup-image__picture');
const imageCaption = imagePopup.querySelector('.popup-image__caption');
const imagePopupClose = imagePopup.querySelector('.popup-image__close');
const cardTemplate = document.querySelector('#cardTemplate').content;

const cardsGallery = document.querySelector('.elements');

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
    imagePopup.classList.add('popup-image_opened');
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

function popupSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileDescription.textContent = popupDescription.value;
  popupClose(popupEditContainer);
}

function popupAddSubmit(evt) {
  evt.preventDefault();
  const card = new Object();
  card.name = popupCardName.value;
  card.src = popupCardImage.value;
  card.alt = popupCardName.value;
  addCard(card);
  popupClose(popupAddContainer);
}

function popupClose(popup) {
  popup.classList.remove('popup_opened');
}

function popupOpen(popup) {
  popup.classList.add('popup_opened');
}

initialCards.forEach(addCard);

editButton.addEventListener('click', function () {
  popupOpen(popupEditContainer);
  popupName.value = profileName.textContent;
  popupDescription.value = profileDescription.textContent;
});

addButton.addEventListener('click', function () {
  popupAddContainer.classList.add('popup_opened');
  popupAddForm.reset();
});

imagePopupClose.addEventListener('click', function () {
  imagePopup.classList.remove('popup-image_opened');
});

popupCloseButton.addEventListener('click', function () {
  popupClose(popupEditContainer);
});

popupAddCloseButton.addEventListener('click', function () {
  popupClose(popupAddContainer);
});

popupForm.addEventListener('submit', popupSubmit);

popupAddForm.addEventListener('submit', popupAddSubmit);
