function hasInvalidInput(inputList) {
    return inputList.some((item) => {
      if (item.validity.valid) {
        return false;
      }
      else {
        return true;
      }
    })
}

const showInputError = (conf, formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(conf.popupInputError);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(conf.popupInputErrorIsActive);
  };
  
  const hideInputError = (conf, formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(conf.popupInputError);
    errorElement.classList.remove(conf.popupInputErrorIsActive);
    errorElement.textContent = '';
  }; 

const isValid = (conf, formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(conf, formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(conf, formElement, inputElement);
    }
  }; 


const setEventListeners = (conf, formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(conf.popupInput));
    const buttonElement = formElement.querySelector(conf.popupSaveButton);
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        isValid(conf, formElement, inputElement)
        if (hasInvalidInput(inputList)) {
            buttonElement.disabled = true;
        }
        else {
            buttonElement.disabled = false;
        }
      });
    });
  }; 

const enableValidation = (conf) => {
    const formList = Array.from(document.querySelectorAll(conf.popupMain));
  
    formList.forEach((formElement) => {
      setEventListeners(conf, formElement);
    });
  };
  
  enableValidation({
    popupMain: '.popup__main',
    popupSaveButton: '.popup__save-button',
    popupInput: '.popup__input',
    popupInputErrorIsActive: 'popup__input-error_is-active',
    popupInputError: 'popup__input_error'
  });
