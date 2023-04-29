export default class FormValidator{
  constructor(conf, formElement) {
    this._formElement = formElement;
    this._popupInput = conf.popupInput;
    this._popupSaveButton = conf.popupSaveButton;
    this._popupInputError = conf.popupInputError;
    this._popupInputErrorIsActive = conf.popupInputErrorIsActive;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._popupInput));
    this._buttonElement = this._formElement.querySelector(this._popupSaveButton);
  }

  setEventListeners = () => {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(this._conf, this._formElement, inputElement)
        if (this._hasInvalidInput(this._inputList)) {
            this._buttonElement.disabled = true;
        }
        else {
            this._buttonElement.disabled = false;
        }
      });
    });
  }; 

  resetValidation(){
    this._inputList.forEach((inputElement) => {
        this._hideInputError(this._conf, this._formElement, inputElement);
        if (this._hasInvalidInput(this._inputList)) {
            this._buttonElement.disabled = true;
        }
        else {
            this._buttonElement.disabled = false;
        }
    });
  }
  
  _hasInvalidInput(inputList) {
    return inputList.some((item) => {
      if (item.validity.valid) {
        return false;
      }
      else {
        return true;
      }
    })
}

_showInputError = (conf, formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._popupInputError);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._popupInputErrorIsActive);
  };
  
  _hideInputError = (conf, formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._popupInputError);
    errorElement.classList.remove(this._popupInputErrorIsActive);
    errorElement.textContent = '';
  }; 

_isValid = (conf, formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(conf, formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(conf, formElement, inputElement);
    }
  }; 
}