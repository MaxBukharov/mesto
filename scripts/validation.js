const setEventListeners = (
  formInputlist,
  errorClassTemplate,
  errorClassActive,
  editButtonDisabled
) => {
  formInputList.forEach(input => {
    input.addEventListener('input', function (evt) {
      checkInputValidity(evt.target, errorClassTemplate, errorClassActive, editButtonDisabled);
    });
  });
};

const showError = (errorTextElement, errorMessage, errorClassActive) => {
  errorTextElement.textContent = errorMessage;
  errorTextElement.classList.add(errorClassActive);
};

const hideError = (errorTextElement, errorClassActive) => {
  errorTextElement.classList.remove(errorClassActive);
  errorTextElement.textContent = '';
};

const editButtonStateDisabled = editButtonDisabled => {
  document.querySelector(submitButtonSelector).classList.add(editButtonDisabled);
  document.querySelector(submitButtonSelector).classList.remove('popup__form-save');
};

const checkInputValidity = (
  formInput,
  errorClassTemplate,
  errorClassActive,
  editButtonDisabled
) => {
  const errorTextElement = document.querySelector(`${errorClassTemplate}${formInput.name}`);
  console.log(errorTextElement);
  if (!formInput.validity.valid) {
    showError(errorTextElement, formInput.validationMessage, errorClassActive);
    editButtonStateDisabled(editButtonDisabled);
  } else {
    hideError(errorTextElement, errorClassActive);
  }
};

const enableFormEditValidation = config => {
  const form = document.querySelectorAll(config.formSelector);
  const formInputList = form.querySelectorAll(config.inputListSelector);

  setEventListeners(
    formInputList,
    config.errorClassTemplate,
    config.errorClassActive,
    config.editButtonDisabled
  );
};

enableFormEditValidation({
  formSelector: '.form',
  inputListSelector: '.popup__form-input',
  errorClassTemplate: '.popup__form-input-error_type_',
  errorClassActive: 'popup__form-input-error_type_active',
  submitButtonSelector: '.popup__button',
  editButtonDisabled: 'popup__form-save_type_disabled'
});
