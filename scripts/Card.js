import { showPopup } from './utils.js'

export default class Card {
  constructor(data, templateSelector) { 
      this._name = data.name;
      this._link = data.link;
      this._alt = data.alt;
      this._templateSelector = templateSelector; 
      this._element = null;
  }

  _getTemplate() {
  const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.gallery__element')
    .cloneNode(true);

  return cardElement;
  }

  _showImage(e) {
    const picture = document.querySelector('.popup-image').querySelector('.popup-image__picture')
    picture.src = e.target.src;
    picture.alt = e.target.alt;
    picture.onload = () => {
      if (e.target.naturalHeight > e.target.naturalWidth) {
        if (window.innerWidth > 635) {
          picture.style.height = '75vh';
        } else {
          const height = String((63 / 568) * window.innerHeight)
          picture.style.height = height +'vh';
        }
        picture.style.width = '';
      } else {
  
        picture.style.height = '';
        picture.style.width = '75vw';
      }
      document.querySelector('.popup-image').querySelector('.popup-image__title').textContent = e.target.alt 
      showPopup(document.querySelector('.popup-image'));
    };
  }

  _likeCard(e) {
    e.target.classList.toggle('gallery__like_active')
  }

  _deleteElement(e) {
    document.querySelector('.gallery').removeChild(e.target.closest('.gallery__element'));
  }

  _setEventListeners() {
    this._element.querySelector('.gallery__picture').addEventListener('click', (e) => {
      this._showImage(e)
  } )
    this._element.querySelector('.gallery__like').addEventListener('click', this._likeCard)
    this._element.querySelector('.gallery__trash').addEventListener('click', this._deleteElement)
  }

  generateCard() {
    this._element = this._getTemplate();

    this._element.querySelector('.gallery__picture').src = this._link;
    this._element.querySelector('.gallery__picture').alt = this._alt;
    this._element.querySelector('.gallery__title').textContent = this._name;

    this._setEventListeners();

    return this._element;
  }
}
