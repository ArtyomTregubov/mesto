import './index.css';
import {
    addCardButtonDOM,
    CONF_VALIDATOR,
    editButtonDOM,
    gallery,
    galleryElementId,
    popupAddNewCardDOM,
    popupChangeAvatarDOM,
    popupCardCls,
    popupImageCls,
    popupProfileCls,
    popupProfileDOM,
    profileDescription,
    profileName,
    avatarDOM,
    popupAvatarCls,
    penDOM,
    popupDeleteCardCls, myUserId,
} from '../scripts/utils/constants';
import Card from "../scripts/components/Card";
import Section from "../scripts/components/Section";
import PopupWithImage from "../scripts/components/PopupWithImage";
import PopupWithForm from "../scripts/components/PopupWithForm";
import PopupWitAvatar from "../scripts/components/PopupWithAvatar";
import PopupWithDelete from "../scripts/components/PopupWithDelete";
import FormValidator from "../scripts/utils/FormValidator";
import UserInfo from "../scripts/components/UserInfo";
import Api from "../scripts/utils/Api";


function createCard(item) {
    const card = new Card(item, galleryElementId, (e) => popupWithImage.open(e), popupDeleteCard);
    return card.generateCard();
}

function renderer(item) {
    const cardElement = createCard(item);
    cardList.addItem(cardElement);
}

async function submitChangeUserInfo(data) {
    await Api.updateUserInfo(data)
    userInfo.setUserInfo(data);
    popupProfile.close();
}

async function submitAddNewCard(data) {
    const payload = {name: data["name"], link: data["about"], alt: data["name"]}
    const req = await Api.addNewCard({ name: payload.name, link: payload.link })
    renderer(req);
    popupAddNewCard.close();
}

async function submitChangeAvatar(data) {
    await Api.changeAvatar(data);
    setAvatar(data.avatar);
    popupChangeAvatar.close();
}

async function submitDeleteCard(data) {
    await Api.deleteCard(data)
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
    const { name, about, avatar } = await Api.getUserInfo();
    setAvatar(avatar);
    userInfo.setUserInfo({"name": name, "about": about});
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
addListeners();
setUserInfo();

