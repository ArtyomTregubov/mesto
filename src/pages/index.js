import './index.css';
import {
    addCardButtonDOM,
    avatarDOM,
    CONF_VALIDATOR,
    editButtonDOM,
    gallery,
    galleryElementId,
    galleryLikeActive,
    penDOM,
    popupAddNewCardDOM,
    popupAvatarCls,
    popupCardCls,
    popupChangeAvatarDOM,
    popupDeleteCardCls,
    popupImageCls,
    popupProfileCls,
    popupProfileDOM,
    profileDescription,
    profileName,
} from '../scripts/utils/constants';
import Card from "../scripts/components/Card";
import Section from "../scripts/components/Section";
import PopupWithImage from "../scripts/components/PopupWithImage";
import PopupWithForm from "../scripts/components/PopupWithForm";
import PopupWitAvatar from "../scripts/components/PopupWithAvatar";
import PopupWithDelete from "../scripts/components/PopupWithDelete";
import FormValidator from "../scripts/components/FormValidator";
import UserInfo from "../scripts/components/UserInfo";
import Api from "../scripts/components/Api";

function createCard(item) {
    const card = new Card(item, galleryElementId, (e) => popupWithImage.open(e), popupDeleteCard, handleLike);
    return card.generateCard();
}

async function handleLike(e) {
    return e.target.classList.contains(galleryLikeActive)
        ? await Api.deleteLike(this._id)
        : await Api.addLike(this._id)
}

function renderer(item) {
    const cardElement = createCard(item);
    cardList.addItem(cardElement);
}

async function submitChangeUserInfo(data) {
    try {
        await Api.updateUserInfo(data)
        userInfo.setUserInfo(data);
    } catch (err){
        console.log(err)
    }
    popupProfile.close();
}

async function submitAddNewCard(data) {
    try {
        const payload = {name: data["name"], link: data["about"], alt: data["name"]}
        const req = await Api.addNewCard({ name: payload.name, link: payload.link })
        renderer(req);
    } catch (err){
        console.log(err)
    }
    popupAddNewCard.close();
}

async function submitChangeAvatar(data) {
    try {
        await Api.changeAvatar(data);
        setAvatar(data.avatar);
    } catch (err){
        console.log(err)
    }
    popupChangeAvatar.close();
}

async function submitDeleteCard(data) {
    try {
        await Api.deleteCard(data)
    } catch (err){
        console.log(err)
    }
    popupDeleteCard.close();
}

function openProfile() {
    formValidatorProfile.resetValidation();
    const userData = userInfo.getUserInfo();
    popupProfile.setInputValues(userData);
}

function openAddNewCard() {
    formValidatorAddCard.resetValidation();
}

function openChangeAvatar() {
    formValidatorChangeAvatar.resetValidation();
}

function setAvatar(avatar) {
    avatarDOM.src = avatar;
}

async function setUserInfo() {
    try {
        const { name, about, avatar } = await Api.getUserInfo();
        setAvatar(avatar);
        userInfo.setUserInfo({"name": name, "about": about});
    } catch (err){
        console.log(err)
    }
}

const popupDeleteCard = new PopupWithDelete(popupDeleteCardCls, submitDeleteCard);
const popupWithImage = new PopupWithImage(popupImageCls);
const popupProfile = new PopupWithForm(popupProfileCls, submitChangeUserInfo);
const popupAddNewCard = new PopupWithForm(popupCardCls, submitAddNewCard);
const popupChangeAvatar = new PopupWitAvatar(popupAvatarCls, submitChangeAvatar);

const items = await Api.getInitialCards();
const cardList = new Section({items, renderer}, gallery);
const userInfo = new UserInfo(profileName, profileDescription);

const formValidatorProfile = new FormValidator(CONF_VALIDATOR, popupProfileDOM);
const formValidatorAddCard = new FormValidator(CONF_VALIDATOR, popupAddNewCardDOM);
const formValidatorChangeAvatar = new FormValidator(CONF_VALIDATOR, popupChangeAvatarDOM);

function addListeners() {
    popupProfile.setEventListeners();
    popupAddNewCard.setEventListeners();
    popupWithImage.setEventListeners();
    popupChangeAvatar.setEventListeners();
    popupDeleteCard.setEventListeners();

    editButtonDOM.addEventListener('click', () => popupProfile.open(() => openProfile()));
    addCardButtonDOM.addEventListener('click', () => popupAddNewCard.open(() => openAddNewCard()));
    penDOM.addEventListener('click', () => popupChangeAvatar.open(() => openChangeAvatar()));

    formValidatorProfile.setEventListeners();
    formValidatorAddCard.setEventListeners();
    formValidatorChangeAvatar.setEventListeners();
}

cardList.renderItems();
setUserInfo();
addListeners();
