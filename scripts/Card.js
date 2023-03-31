class Card {
  constructor(name, image, alt, template, handleCardClick) {
    this._name = name;
    this._image = image;
    this._alt = alt;
    this._template = template;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const newCard = this._template.querySelector('.element').cloneNode(true);
    return newCard;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._addLikeButton();
    });
    this._deleteButton.addEventListener('click', () => {
      this._addDeleteButton();
    });
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._image);
    });
  }

  _addLikeButton() {
    this._likeButton.classList.toggle('element__like-button_active');
  }

  _addDeleteButton() {
    this._deleteButton.closest('.element').remove();
  }

  generateCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.element__like-button');
    this._deleteButton = this._element.querySelector('.element__delete');
    this._cardImage = this._element.querySelector('.element__image');
    this._setEventListeners();
    this._cardImage.src = this._image;
    this._cardImage.alt = this._alt;
    this._element.querySelector('.element__title').textContent = this._name;
    return this._element;
  }
}

export { Card };
