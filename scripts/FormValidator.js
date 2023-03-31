export class FormValidator {
  constructor(config, form) {
    this._form = form;
    this._formInputList = Array.from(this._form.querySelectorAll(config.inputListSelector));
    this._errorElement = config.errorElementSelector;
    this._errorClass = config.errorClassTemplate;
    this._errorClassActive = config.errorClassActive;
    this._submitButton = this._form.querySelector(config.submitButtonSelector);
    this._submitButtonDisabled = config.submitButtonDisabled;
  }

  _showError(input) {
    document.querySelector(`${this._errorClass}${input.name}`).textContent =
      input.validationMessage;
    document
      .querySelector(`${this._errorClass}${input.name}`)
      .classList.add(this._errorClassActive);
  }

  _hideError(input) {
    document.querySelector(`${this._errorClass}${input.name}`).textContent = '';
    document
      .querySelector(`${this._errorClass}${input.name}`)
      .classList.remove(this._errorClassActive);
  }

  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showError(input);
    } else {
      this._hideError(input);
    }
  }

  _disableButton() {
    this._submitButton.classList.add(this._submitButtonDisabled);
  }

  _enableButton() {
    this._submitButton.classList.remove(this._submitButtonDisabled);
  }

  _hasInvalidInput() {
    return this._formInputList.some(input => !input.validity.valid);
  }

  _toggleButtonState() {
    if (!this._hasInvalidInput()) {
      this._enableButton();
    } else {
      this._disableButton();
    }
  }

  _resetErrorElements() {
    const errors = Array.from(document.querySelectorAll(this._errorElement));
    errors.forEach(error => {
      error.textContent = '';
    });
  }

  _setEventListeners() {
    this._formInputList.forEach(input => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
    this._resetErrorElements();
    this._toggleButtonState();
  }
}
