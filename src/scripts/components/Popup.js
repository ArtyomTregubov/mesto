import {popup, popupClose, popupOpened} from '../utils/constants';

export default class Popup {
  constructor(selector) {
      this._popup = document.querySelector(selector);
      this._handleEscClose = this._handleEscClose.bind(this);
  }

  open(callback=null) {
    if (callback) callback();
    this._popup.classList.add(popupOpened);
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove(popupOpened);
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(e) {
    if(e.code === "Escape"){
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener('click', (e) => {
      if (e.target.classList.contains(popup) || e.target.classList.contains(popupClose)) {
        this.close();
      }});
  }
}
