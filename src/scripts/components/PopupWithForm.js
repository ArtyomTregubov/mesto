import Popup from "./Popup";
import {popupInputDescription, popupInputName, popupMain} from "../utils/constants";

export default class PopupWithForm extends Popup {
    constructor(selector, submitForm) {
        super(selector);
        this._submitForm = submitForm
    }

    _getInputValues() {
        let elem = this._popup.querySelector(popupInputName);
        const name = this._popup.querySelector(popupInputName).value;
        const description = this._popup.querySelector(popupInputDescription).value;
        return { name, description }
    }

    setEventListeners() {
        super.setEventListeners()
        this._popup.addEventListener('submit', this._submitForm);
    }

    close() {
        this._popup.removeEventListener('submit', this._submitForm);
        super.close()
        this._popup.querySelector(popupMain).reset()
    }
}
