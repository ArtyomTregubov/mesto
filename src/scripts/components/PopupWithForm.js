import Popup from "./Popup";
import {popupMain} from "../utils/constants";

export default class PopupWithForm extends Popup {
    constructor(selector, submitForm) {
        super(selector);
        this._submitForm = submitForm;
        this._inputList = this._popup.querySelectorAll('.popup__input');
    }

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });

        return this._formValues;
    }

    setEventListeners() {
        this._popupForm = this._popup.querySelector(popupMain);
        super.setEventListeners()
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitForm(this._getInputValues());
        });
    }

    close() {
        super.close()
        this._popupForm.reset()
    }

    setInputValues(data) {
        this._inputList.forEach((input) => {
            input.value = data[input.name];
        });
    }
}
