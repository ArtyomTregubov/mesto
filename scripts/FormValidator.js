class FormValidator{
    constructor(conf, formElement) { 
      this._conf = conf;
      this._formElement = formElement;
    }
  
    setEventListeners = () => {
      const inputList = Array.from(this._formElement.querySelectorAll(this._conf.popupInput));
      const buttonElement = this._formElement.querySelector(this._conf.popupSaveButton);
    
      inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
          this._isValid(this._conf, this._formElement, inputElement)
          if (this._hasInvalidInput(inputList)) {
              buttonElement.disabled = true;
          }
          else {
              buttonElement.disabled = false;
          }
        });
      });
    }; 
  
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
      inputElement.classList.add(conf.popupInputError);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(conf.popupInputErrorIsActive);
    };
    
    _hideInputError = (conf, formElement, inputElement) => {
      const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
      inputElement.classList.remove(conf.popupInputError);
      errorElement.classList.remove(conf.popupInputErrorIsActive);
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