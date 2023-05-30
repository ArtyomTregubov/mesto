import PopupWithForm from "./PopupWithForm";
import {popupMain, popupSaveButton} from "../utils/constants";

export default class PopupWithAvatar extends PopupWithForm {
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
            this.renderLoading();
            evt.preventDefault();
            this._submitForm(this._getInputValues());

        });
    }

    close() {
        super.close()
        this._popupForm.reset()
    }
}
