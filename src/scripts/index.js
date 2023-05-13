import '../pages/index.css';
import { items, gallery, galleryElementId, editButtonDOM, addCardButtonDOM, CONF_VALIDATOR,
    popupProfileDOM, popupAddNewCardDOM, popupImage, popupProfileCls, popupCardCls,  profileName,
    profileDescription, popupInputName, popupInputDescription,
} from './utils/constants';
import Card from "./components/Card";
import Section from "./components/Section";
import PopupWithImage from "./components/PopupWithImage";
import PopupWithForm from "./components/PopupWithForm";
import FormValidator from "./utils/FormValidator";
import UserInfo from "./components/UserInfo";


function renderer(item) {
    const card = new Card(item, galleryElementId, (e) => popupWithImage.open(e));
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
}

function submitChangeUserInfo(e) {
    e.preventDefault();
    const data = popupProfile._getInputValues();
    userInfo.setUserInfo(data);
    popupProfile.close();
}

function submitAddNewCard(e) {
    e.preventDefault();
    const data = popupAddNewCard._getInputValues();
    const item = { name: data.name, link: data.description, alt: data.name };
    renderer(item);
    popupAddNewCard.close();
}

function openProfile() {
    formValidatorProfile.resetValidation();
    const userData = userInfo.getUserInfo();
    document.querySelector(popupInputName).value = userData.name;
    document.querySelector(popupInputDescription).value = userData.description;
}

function openAddNewCard() {
    formValidatorAddCard.resetValidation()
}

const cardList = new Section({ items, renderer}, gallery);
const popupWithImage = new PopupWithImage(popupImage);
const popupProfile = new PopupWithForm(popupProfileCls, submitChangeUserInfo);
const popupAddNewCard = new PopupWithForm(popupCardCls, submitAddNewCard);
const formValidatorProfile = new FormValidator(CONF_VALIDATOR, popupProfileDOM);
const formValidatorAddCard = new FormValidator(CONF_VALIDATOR, popupAddNewCardDOM);
const userInfo = new UserInfo(profileName, profileDescription)

function addListeners() {
    editButtonDOM.addEventListener('click', () => popupProfile.open(()=>openProfile()));
    addCardButtonDOM.addEventListener('click', () => popupAddNewCard.open(()=>openAddNewCard()));
    formValidatorProfile.setEventListeners();
    formValidatorAddCard.setEventListeners();
}

addListeners();
cardList.renderItems();
