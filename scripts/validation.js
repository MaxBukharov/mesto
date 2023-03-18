const showError = (errorTextElement, errorMessage, errorClassActive) => {
  errorTextElement.textContent = errorMessage;
  errorTextElement.classList.add(errorClassActive);
};

const hideError = (errorTextElement, errorClassActive) => {
  errorTextElement.classList.remove(errorClassActive);
  errorTextElement.textContent = '';
};

const disableButton = (submitButton, submitButtonDisabled) => {
  submitButton.classList.add(submitButtonDisabled);
  submitButton.disabled = true;
};
const enableButton = (submitButton, submitButtonDisabled) => {
  submitButton.classList.remove(submitButtonDisabled);
  submitButton.disabled = false;
};

const checkInputValidity = (formInput, errorClassTemplate, errorClassActive) => {
  const errorTextElement = document.querySelector(`${errorClassTemplate}${formInput.name}`);

  if (!formInput.validity.valid) {
    showError(errorTextElement, formInput.validationMessage, errorClassActive);
  } else {
    hideError(errorTextElement, errorClassActive);
  }
};

const hasInvalidInput = inputList => {
  return Array.from(inputList).some(input => !input.validity.valid);
};

const toggleButtonState = (submitButton, submitButtonDisabled, formInputList) => {
  if (!hasInvalidInput(formInputList)) {
    enableButton(submitButton, submitButtonDisabled);
  } else {
    disableButton(submitButton, submitButtonDisabled);
  }
};

const setEventListeners = (
  formElement,
  formInputlistSelector,
  errorClassTemplate,
  errorClassActive,
  submitButtonDisabled,
  submitButtonSelector
) => {
  const formInputList = formElement.querySelectorAll(formInputlistSelector);

  const submitButton = formElement.querySelector(submitButtonSelector);
  toggleButtonState(submitButton, submitButtonDisabled, formInputList);

  formInputList.forEach(input => {
    input.addEventListener('input', function (evt) {
      toggleButtonState(submitButton, submitButtonDisabled, formInputList);
      checkInputValidity(evt.target, errorClassTemplate, errorClassActive);
    });
  });
};

// const clearInputErrorMessages = errorClassActive => {
//   const errorInputList = document.querySelectorAll(`.${errorClassActive}`);
//   console.log(errorInputList);
//   errorInputList.forEach((input, errorClassActive) => {
//     hideError(input, errorClassActive);
//     console.log('Error hide');
//   });
// };

const enableFormEditValidation = config => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach(formElement => {
    setEventListeners(
      formElement,
      config.inputListSelector,
      config.errorClassTemplate,
      config.errorClassActive,
      config.submitButtonDisabled,
      config.submitButtonSelector
    );
  });
};

enableFormEditValidation({
  formSelector: '.form',
  inputListSelector: '.popup__form-input',
  errorClassTemplate: '.popup__form-input-error_type_',
  errorClassActive: 'popup__form-input-error_type_active',
  submitButtonSelector: '.popup__button',
  submitButtonDisabled: 'popup__form-save_type_disabled'
});
