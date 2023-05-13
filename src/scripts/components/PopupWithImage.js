import { popupImagePicture, popupImageTitle } from '../utils/constants';
import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(selector) {
      super(selector);
  }

  open(e) {
    const picture = this._popup.querySelector(popupImagePicture)
    picture.src = e.target.src;
    picture.alt = e.target.alt;
    picture.onload = () => {
      if (e.target.naturalHeight > e.target.naturalWidth) {
        if (window.innerWidth > 635) {
          picture.style.height = '70vh';
        } else {
          const height = String((63 / 568) * window.innerHeight)
          picture.style.height = height +'vh';
        }
        picture.style.width = '';
      } else {
        picture.style.height = '';
        picture.style.width = '70vw';
      }
      this._popup.querySelector(popupImageTitle).textContent = e.target.alt
      super.open();
    };
  }
}