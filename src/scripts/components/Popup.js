import {popup, popupClose, popupOpened} from '../utils/constants';

export default class Popup {
  constructor(selector) {
      this._popup = document.querySelector(selector);
  }

  open(callback=null) {
    if (callback) callback();
    this._popup.classList.add(popupOpened);
    this.setEventListeners()
  }

  close() {
    this._popup.classList.remove(popupOpened);
    this._popup.removeEventListener('click', this.open);
    this._popup.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(e) {
    if(e.code === "Escape"){
      this.close();
    }
  }

  setEventListeners() {
    document.addEventListener("keydown", (e) => this._handleEscClose(e));
    this._popup.addEventListener('click', (e) => {
      if (e.target.classList.contains(popup) || e.target.classList.contains(popupClose)) {
        this.close();
      }});
  }
}
