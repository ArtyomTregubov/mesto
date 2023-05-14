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

    _toggleLike(e) {
        e.target.classList.toggle(galleryLikeActive)
    }

    _deleteElement(e) {
        galleryDOM.removeChild(e.target.closest(galleryElement));
    }

    _setEventListeners() {
        this._cardImage.addEventListener('click', this._handleCardClick)
        this._cardLike.addEventListener('click', this._toggleLike)
        this._cardTrash.addEventListener('click', (e) => this._deleteElement(e))
    }

    generateCard() {
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector(galleryPicture);
        this._cardTitle =  this._element.querySelector(galleryTitle);
        this._cardTrash = this._element.querySelector(galleryTrash);
        this._cardLike = this._element.querySelector(galleryLike);

        this._cardImage.src = this._link;
        this._cardImage.alt = this._alt;
        this._cardTitle.textContent = this._name;

        this._setEventListeners();

        return this._element;
    }
}
