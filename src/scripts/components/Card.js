import {
    galleryDOM,
    galleryElement,
    galleryLike,
    galleryLikeActive,
    galleryLikeCount,
    galleryNumber,
    galleryPicture,
    galleryTitle,
    galleryTrash,
} from '../utils/constants';

export default class Card {
    constructor(data, templateSelector, handleCardClick, handleOpenDeletePopup, handleLike, userId) {
        this._id = data._id;
        this._ownerId = data.owner._id;
        this._userId = userId;
        this._isCardLiked = this._isCardLiked(data);
        this._name = data.name;
        this._link = data.link;
        this._alt = data.name;
        this._likeCount = data.likes.length;
        this._templateSelector = templateSelector;
        this._element = null;
        this._handleCardClick = handleCardClick;
        this._handleOpenDeletePopup = handleOpenDeletePopup;
        this._handleLike = handleLike;
        this._cardTrash = null;
    }

    _getTemplate() {
        return document
            .querySelector(this._templateSelector)
            .content
            .querySelector(galleryElement)
            .cloneNode(true);
    }

    _isCardLiked(card) {
        const likes = card.likes;
        for (let i = 0; i < likes.length; i++) {
            if (likes[i]._id === this._userId)
                return true
        }
        return false
    }

    async _toggleLike(e) {
        const req = await this._handleLike(e);
        this._cardLikeCount.innerHTML = req.likes.length;
        e.target.classList.toggle(galleryLikeActive);
    }

    _deleteElement(e) {
        galleryDOM.removeChild(e.target.closest(galleryElement));
    }

    _setEventListeners() {
        this._cardImage.addEventListener('click', this._handleCardClick)
        this._cardLike.addEventListener('click', (e) => this._toggleLike(e))
        if (this._cardTrash)
            this._cardTrash.addEventListener('click', (e) => {
                this._handleOpenDeletePopup.deleteCardId = this._id;
                this._handleOpenDeletePopup.deleteCallback = () => this._deleteElement(e)
                this._handleOpenDeletePopup.open()
            })
    }

    _generateTrash() {
        if (this._ownerId === this._userId)
            this._cardTrash = this._element.querySelector(galleryTrash);
        else {
            this._element.removeChild(this._element.querySelector(galleryTrash))
        }
    }

    _setLike() {
        this._cardLike = this._element.querySelector(galleryLike);
        if (this._isCardLiked) {
            this._cardLike.classList.add(galleryLikeActive);
            return
        }
        this._cardLike.classList.remove(galleryLikeActive);
    }

    generateCard() {
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector(galleryPicture);
        this._cardTitle =  this._element.querySelector(galleryTitle);
        this._setLike()
        this._cardLikeCount = this._cardLike.closest(galleryNumber).querySelector(galleryLikeCount);
        this._cardLikeCount.innerHTML = this._likeCount;
        this._generateTrash()

        this._cardImage.src = this._link;
        this._cardImage.alt = this._alt;
        this._cardTitle.textContent = this._name;

        this._setEventListeners();

        return this._element;
    }
}
