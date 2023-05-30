import Popup from "./Popup";
import {popupMain} from "../utils/constants";

export default class PopupWithDelete extends Popup {
    constructor(selector, submitForm) {
        super(selector);
        this._submitForm = submitForm;
        this._inputList = this._popup.querySelectorAll('.popup__input');
        this.deleteCallback = null;
        this.deleteCardId = null
    }

    setEventListeners() {
        this._popupForm = this._popup.querySelector(popupMain);
        super.setEventListeners()
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitForm(this.deleteCardId)
            this.deleteCallback();
        });
    }

    close() {
        super.close()
        this._popupForm.reset()
    }
}
