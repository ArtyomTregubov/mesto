import { popupImagePicture, popupImageTitle, minWidth, proportion, minHeight } from '../utils/constants';
import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(selector) {
      super(selector);
      this._picture = this._popup.querySelector(popupImagePicture);
      this._pictureTitle = this._popup.querySelector(popupImageTitle);
  }

  open(e) {
    this._picture.src = e.target.src;
    this._picture.alt = e.target.alt;
    this._pictureTitle.textContent = e.target.alt
    this._picture.onload = () => {
      if (e.target.naturalHeight > e.target.naturalWidth) {
        if (window.innerWidth > minWidth) {
          this._picture.style.height = '70vh';
        } else {
          const height = String((proportion / minHeight) * window.innerHeight)
          this._picture.style.height = height +'vh';
        }
        this._picture.style.width = '';
      } else {
        this._picture.style.height = '';
        this._picture.style.width = '70vw';
      }
      super.open();
    };
  }
}