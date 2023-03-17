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
  console.log(errorTextElement);
  if (!formInput.validity.valid) {
    showError(errorTextElement, formInput.validationMessage, errorClassActive);
    console.log('Invalid input');
  } else {
    hideError(errorTextElement, errorClassActive);
  }
};

const hasInvalidInput = inputList => {
  console.log(Array.from(inputList).every(input => input.validity.valid));
  console.log(Array.from(inputList).some(input => !input.validity.valid));
  return Array.from(inputList).some(input => !input.validity.valid);
};

const toggleButtonState = (submitButton, submitButtonDisabled, formInputList) => {
  if (!hasInvalidInput(formInputList)) {
    enableButton(submitButton, submitButtonDisabled);
    console.log('Enabled');
  } else {
    disableButton(submitButton, submitButtonDisabled);
    console.log('Disabled');
  }
  console.log(submitButton);
};

const setEventListeners = (
  formList,
  formInputlist,
  errorClassTemplate,
  errorClassActive,
  submitButtonDisabled,
  submitButton
) => {
  formList.forEach(form => {
    form.addEventListener('submit', evt => {
      evt.preventDefault();
      console.log('Submit is listened!');
    });
  });

  formInputlist.forEach(input => {
    input.addEventListener('input', function (evt) {
      console.log('Input is listened!');
      toggleButtonState(submitButton, submitButtonDisabled, formInputlist);
      checkInputValidity(
        evt.target,
        errorClassTemplate,
        errorClassActive,
        submitButtonDisabled,
        submitButton
      );
    });
  });
};

const enableFormEditValidation = config => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  const formInputList = Array.from(document.querySelectorAll(config.inputListSelector));
  console.log(formInputList);
  const submitButton = document.querySelector(config.submitButtonSelector);

  setEventListeners(
    formList,
    formInputList,
    config.errorClassTemplate,
    config.errorClassActive,
    config.submitButtonDisabled,
    submitButton
  );
};

enableFormEditValidation({
  formSelector: '.form',
  inputListSelector: '.popup__form-input',
  errorClassTemplate: '.popup__form-input-error_type_',
  errorClassActive: 'popup__form-input-error_type_active',
  submitButtonSelector: '.popup__button',
  submitButtonDisabled: 'popup__form-save_type_disabled'
});
