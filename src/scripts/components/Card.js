import {
    galleryDOM,
    galleryElement,
    galleryLike,
    galleryLikeActive,
    galleryPicture,
    galleryTitle,
    galleryTrash
} from '../utils/constants';

export default class Card {
    constructor(data, templateSelector, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._alt = data.alt;
        this._templateSelector = templateSelector;
        this._element = null;
        this._handleCardClick = handleCardClick
    }

    _getTemplate() {
        return document
            .querySelector(this._templateSelector)
            .content
            .querySelector(galleryElement)
            .cloneNode(true);
    }

    _likeCard(e) {
        e.target.classList.toggle(galleryLikeActive)
    }

    _deleteElement(e) {
        this._element.removeEventListener('click', this._handleCardClick);
        this._element.removeEventListener('click', this._likeCard);
        this._element.removeEventListener('click', this._deleteElement);
        galleryDOM.removeChild(e.target.closest(galleryElement));
    }

    _setEventListeners() {
        this._element.querySelector(galleryPicture).addEventListener('click', this._handleCardClick)
        this._element.querySelector(galleryLike).addEventListener('click', this._likeCard)
        this._element.querySelector(galleryTrash).addEventListener('click', (e) => this._deleteElement(e))
    }

    generateCard() {
        this._element = this._getTemplate();

        this._element.querySelector(galleryPicture).src = this._link;
        this._element.querySelector(galleryPicture).alt = this._alt;
        this._element.querySelector(galleryTitle).textContent = this._name;

        this._setEventListeners();

        return this._element;
    }
}
