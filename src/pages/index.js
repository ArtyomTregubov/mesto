import './index.css';
import {
    addCardButtonDOM,
    CONF_VALIDATOR,
    editButtonDOM,
    gallery,
    galleryElementId,
    items,
    popupAddNewCardDOM,
    popupCardCls,
    popupImage,
    popupProfileCls,
    popupProfileDOM,
    profileDescription,
    profileName,
} from '../scripts/utils/constants';
import Card from "../scripts/components/Card";
import Section from "../scripts/components/Section";
import PopupWithImage from "../scripts/components/PopupWithImage";
import PopupWithForm from "../scripts/components/PopupWithForm";
import FormValidator from "../scripts/utils/FormValidator";
import UserInfo from "../scripts/components/UserInfo";

function createCard(item) {
    const card = new Card(item, galleryElementId, (e) => popupWithImage.open(e));
    return card.generateCard();
}

function renderer(item) {
    const cardElement = createCard(item);
    cardList.addItem(cardElement);
}

function submitChangeUserInfo(data) {
    userInfo.setUserInfo(data);
    popupProfile.close();
}

function submitAddNewCard(data) {
    renderer({name: data["form-name"], link: data["form-description"], alt: data["form-name"]});
    popupAddNewCard.close();
}

function openProfile() {
    formValidatorProfile.resetValidation();
    const userData = userInfo.getUserInfo();
    popupProfile.setInputValues(userData);
}

function openAddNewCard() {
    formValidatorAddCard.resetValidation()
}

const cardList = new Section({items, renderer}, gallery);
const popupWithImage = new PopupWithImage(popupImage);
const popupProfile = new PopupWithForm(popupProfileCls, submitChangeUserInfo);
const popupAddNewCard = new PopupWithForm(popupCardCls, submitAddNewCard);
const formValidatorProfile = new FormValidator(CONF_VALIDATOR, popupProfileDOM);
const formValidatorAddCard = new FormValidator(CONF_VALIDATOR, popupAddNewCardDOM);
const userInfo = new UserInfo(profileName, profileDescription)

function addListeners() {
    popupProfile.setEventListeners();
    popupAddNewCard.setEventListeners();
    editButtonDOM.addEventListener('click', () => popupProfile.open(() => openProfile()));
    addCardButtonDOM.addEventListener('click', () => popupAddNewCard.open(() => openAddNewCard()));
    formValidatorProfile.setEventListeners();
    formValidatorAddCard.setEventListeners();
}

addListeners();
cardList.renderItems();
