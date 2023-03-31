export class Card {
  constructor(name, image, alt, template) {
    this._name = name;
    this._image = image;
    this._alt = alt;
    this._template = template;
  }

  _getTemplate() {
    const newCard = this._template.querySelector('.element').cloneNode(true);
    return newCard;
  }

  _setEventListeners() {
    this._element.querySelector('.element__like-button').addEventListener('click', () => {
      this._addLikeButton();
    });
    this._element.querySelector('.element__delete').addEventListener('click', () => {
      this._addDeleteButton();
    });
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._openBigImage();
    });
  }

  _addLikeButton() {
    this._element
      .querySelector('.element__like-button')
      .classList.toggle('element__like-button_active');
  }

  _addDeleteButton() {
    this._element.querySelector('.element__delete').parentElement.remove();
  }

  _openBigImage() {
    const imagePopup = document.querySelector('.popup-image');
    const bigImage = imagePopup.querySelector('.popup-image__picture');
    const imageCaption = imagePopup.querySelector('.popup-image__caption');
    imagePopup.classList.add('popup_opened');
    bigImage.setAttribute('src', this._image);
    imageCaption.textContent = this._name;
    imageCaption.setAttribute('alt', this._alt);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.element__image').src = this._image;
    this._element.querySelector('.element__image').alt = this._alt;
    this._element.querySelector('.element__title').textContent = this._name;
    return this._element;
  }
}
