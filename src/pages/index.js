import './index.css';
import {
    addCardButtonDOM, avatarDOM, CONF_VALIDATOR, editButtonDOM, gallery,
    galleryElementId, galleryLikeActive, HEADERS, cardsURL, userURL,
    changeAvatarUrl, penDOM, popupAddNewCardDOM, popupAvatarCls,
    popupCardCls, popupChangeAvatarDOM, popupDeleteCardCls, popupImageCls,
    popupProfileCls, popupProfileDOM, profileDescription, profileName,
} from '../scripts/utils/constants';
import Card from "../scripts/components/Card";
import Section from "../scripts/components/Section";
import PopupWithImage from "../scripts/components/PopupWithImage";
import PopupWithForm from "../scripts/components/PopupWithForm";
import PopupWithDelete from "../scripts/components/PopupWithDelete";
import FormValidator from "../scripts/components/FormValidator";
import UserInfo from "../scripts/components/UserInfo";
import Api from "../scripts/components/Api";

const API = new Api(HEADERS, cardsURL, userURL, changeAvatarUrl)

function createCard(item) {
    const card = new Card(item, galleryElementId, (e) => popupWithImage.open(e),
        popupDeleteCard, handleLike, myUserId);
    return card.generateCard();
}

async function handleLike(e) {
    try{
        return e.target.classList.contains(galleryLikeActive)
        ? await API.deleteLike(this._id)
        : await API.addLike(this._id);
    } catch (err) {
        console.log(err);
    }
}

function renderer(item) {
    const cardElement = createCard(item);
    cardList.addItem(cardElement);
}

async function submitChangeUserInfo(data) {
    try {
        await API.updateUserInfo(data)
        userInfo.setUserInfo(data);
        popupProfile.close();
    } catch (err){
        console.log(err)
    }
}

async function submitAddNewCard(data) {
    try {
        const payload = {name: data["name"], link: data["about"], alt: data["name"]}
        const req = await API.addNewCard({ name: payload.name, link: payload.link })
        renderer(req);
        popupAddNewCard.close();
    } catch (err){
        console.log(err)
    }
}

async function submitChangeAvatar(data) {
    try {
        await API.changeAvatar(data);
        setAvatar(data.avatar);
        popupChangeAvatar.close();
    } catch (err){
        console.log(err)
    }
}

async function submitDeleteCard(data) {
    try {
        await API.deleteCard(data);
        popupDeleteCard.close();
    } catch (err){
        console.log(err)
    }
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
        const { _id, name, about, avatar } = await API.getUserInfo();
        setAvatar(avatar);
        userInfo.setUserInfo({"name": name, "about": about});
        return _id;
    } catch (err){
        console.log(err)
    }
}

const popupDeleteCard = new PopupWithDelete(popupDeleteCardCls, submitDeleteCard);
const popupWithImage = new PopupWithImage(popupImageCls);
const popupProfile = new PopupWithForm(popupProfileCls, submitChangeUserInfo);
const popupAddNewCard = new PopupWithForm(popupCardCls, submitAddNewCard);
const popupChangeAvatar = new PopupWithForm(popupAvatarCls, submitChangeAvatar);

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

let myUserId = null;
let cardList = null;

try{
    myUserId = await setUserInfo();
    const items = await API.getInitialCards();
    cardList = new Section({items, renderer}, gallery);
    cardList.renderItems();
} catch (err) {
    console.log(err)
}

addListeners();
