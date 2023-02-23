const editButton = document.querySelector('.profile__edit-button');
const popupContainer = document.querySelector('.popup');
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
const card = document.querySelector('#cardTemplate');
const imagePopup = document.querySelector('.image-popup');
const initialCards = [
  {
    name: 'Сортавала',
    src: 'https://images.unsplash.com/photo-1590079019458-0eb5b40a3371?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    alt: 'Поезд в лесу'
  },
  {
    name: 'Карелия',
    src: 'https://images.unsplash.com/photo-1548288242-d454d4648b55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1744&q=80',
    alt: 'Утка на причале'
  },
  {
    name: 'Эльбрус',
    src: 'https://images.unsplash.com/photo-1633400388065-e01e1f9cd4e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=654&q=80',
    alt: 'Горы'
  },
  {
    name: 'Казань',
    src: 'https://images.unsplash.com/photo-1584270692240-0411d322e4b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=816&q=80',
    alt: 'Солнце и месяц'
  },
  {
    name: 'Санкт-Петербург',
    src: 'https://images.unsplash.com/photo-1619866328625-a70d35ec49db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=830&q=80',
    alt: 'Вид на Лахта-центр'
  },
  {
    name: 'Рыбачий',
    src: 'https://images.unsplash.com/photo-1663245360704-0d23d90c993c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    alt: 'Остров'
  }
];

const cardsGallery = document.querySelector('.elements');

const createCard = card => {
  const newCard = document.querySelector('#cardTemplate').content.cloneNode(true);
  const cardName = newCard.querySelector('.element__title');
  const deleteButton = newCard.querySelector('.element__delete');
  const likeButton = newCard.querySelector('.element__like-button');
  cardName.textContent = card.name;
  const cardImage = newCard.querySelector('.element__image');
  cardImage.setAttribute('src', card.src);
  cardImage.setAttribute('alt', card.alt);
  cardsGallery.prepend(newCard);
  cardImage.addEventListener('click', function () {
    imagePopup.classList.add('image-popup_opened');
    const bigImage = imagePopup.querySelector('.image-popup__picture');
    bigImage.setAttribute('src', cardImage.src);
    const imageCaption = imagePopup.querySelector('.image-popup__caption');
    imageCaption.textContent = card.name;
    const imagePopupClose = imagePopup.querySelector('.image-popup__close');
    imagePopupClose.addEventListener('click', function () {
      imagePopup.classList.remove('image-popup_opened');
    });
  });
  deleteButton.addEventListener('click', function (evt) {
    evt.target.parentElement.remove();
  });
  likeButton.addEventListener('click', function (evt) {
    evt.target.classList.add('element__like-button_active');
  });
};

function popupSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileDescription.textContent = popupDescription.value;
  popupClose();
}

function popupAddSubmit(evt) {
  evt.preventDefault();
  const card = new Object();
  card.name = popupCardName.value;
  card.src = popupCardImage.value;
  initialCards.push(card);
  createCard(card);
  popupClose();
}

function popupClose() {
  popupContainer.classList.remove('popup_opened');
  popupAddContainer.classList.remove('popup_opened');
}

function popupOpen() {
  popupContainer.classList.add('popup_opened');
}

function imageDelete(card) {
  initialCards.splice(card);
}

initialCards.forEach(createCard);

editButton.addEventListener('click', function () {
  popupOpen();
  popupName.value = profileName.textContent;
  popupDescription.value = profileDescription.textContent;
});

addButton.addEventListener('click', function () {
  popupAddContainer.classList.add('popup_opened');
  popupCardName.value = '';
  popupCardImage.value = '';
});

popupCloseButton.addEventListener('click', popupClose);

popupAddCloseButton.addEventListener('click', popupClose);

popupForm.addEventListener('submit', popupSubmit);

popupAddForm.addEventListener('submit', popupAddSubmit);
