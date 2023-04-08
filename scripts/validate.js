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

const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add('popup__input_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error_is-active');
  };
  
  const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_error');
    errorElement.classList.remove('popup__input-error_is-active');
    errorElement.textContent = '';
  }; 

const isValid = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  }; 


const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__save-button');
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement)
        if (hasInvalidInput(inputList)) {
            buttonElement.disabled = true;
        }
        else {
            buttonElement.disabled = false;
        }
      });
    });
  }; 

const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__main'));
  
    formList.forEach((formElement) => {
      setEventListeners(formElement);
    });
  };
  
  enableValidation();
