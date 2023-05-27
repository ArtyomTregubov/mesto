import {
    galleryDOM,
    galleryElement,
    galleryLike,
    galleryLikeActive, galleryLikeCount,
    galleryNumber,
    galleryPicture,
    galleryTitle,
    galleryTrash,
    myUserId
} from '../utils/constants';
import Api from "../../scripts/utils/Api";

export default class Card {
    constructor(data, templateSelector, handleCardClick, handleOpenDeletePopup) {
        this._id = data._id
        this._owner_id = data.owner._id;
        this._name = data.name;
        this._link = data.link;
        this._alt = data.name;
        this._like_count = data.likes.length;
        this._templateSelector = templateSelector;
        this._element = null;
        this._handleCardClick = handleCardClick;
        this._handleOpenDeletePopup = handleOpenDeletePopup;
        this._cardTrash = null;
    }

    _getTemplate() {
        return document
            .querySelector(this._templateSelector)
            .content
            .querySelector(galleryElement)
            .cloneNode(true);
    }

    async _toggleLike(e) {
        let req = e.target.classList.contains(galleryLikeActive)
                ? await Api.deleteLike(this._id)
                : await Api.addLike(this._id);
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
                this._handleOpenDeletePopup.delete_card_id = this._id;
                this._handleOpenDeletePopup.delete_callback = () => this._deleteElement(e)
                this._handleOpenDeletePopup.open()
            })
    }

    _generateTrash() {
        if (this._owner_id === myUserId)
            this._cardTrash = this._element.querySelector(galleryTrash);
        else {
            this._element.removeChild(this._element.querySelector(galleryTrash))
        }
    }

    generateCard() {
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector(galleryPicture);
        this._cardTitle =  this._element.querySelector(galleryTitle);
        this._cardLike = this._element.querySelector(galleryLike);
        this._cardLikeCount = this._cardLike.closest(galleryNumber).querySelector(galleryLikeCount);
        this._cardLikeCount.innerHTML = this._like_count;
        this._generateTrash()

        this._cardImage.src = this._link;
        this._cardImage.alt = this._alt;
        this._cardTitle.textContent = this._name;

        this._setEventListeners();

        return this._element;
    }
}
