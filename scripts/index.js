import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { showPopup, closePopup } from './utils.js';

const DOM = {
  gallery: document.querySelector('.gallery'),
  editButton: document.querySelector('.profile__info-button-edit'),
  infoName: document.querySelector('.profile__info-name'),
  descriptionProfile: document.querySelector('.profile__info-description'),
  popupProfile: document.querySelector('.popup-profile'),
  popupCard: document.querySelector('.popup-card'),
  popupImage: document.querySelector('.popup-image'),
  addNewCard: document.querySelector('.profile__add-button'),
}
DOM.formNameProfile = DOM.popupProfile.querySelector('.popup__input_form_name');
DOM.formDescriptionProfile = DOM.popupProfile.querySelector('.popup__input_form_description');
DOM.formNameCard = DOM.popupCard.querySelector('.popup__input_form_name');
DOM.formDescriptionCard = DOM.popupCard.querySelector('.popup__input_form_description');
DOM.closeButtonProfile = DOM.popupProfile.querySelector('.popup__close');
DOM.closeButtonCard = DOM.popupCard.querySelector('.popup__close');
DOM.saveButtonCard = DOM.popupCard.querySelector('.popup__save-button');

const CONF = {
  popupMain: '.popup__main',
  popupSaveButton: '.popup__save-button',
  popupInput: '.popup__input',
  popupInputErrorIsActive: 'popup__input-error_is-active',
  popupInputError: 'popup__input_error'
}

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    alt: 'Архыз',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    alt: 'Челябинская область'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    alt: 'Иваново'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    alt: 'Камчатка'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    alt: 'Холмогорский район'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    alt: 'Байкал'
  }
];

function handleCardClick(popupImage){
    showPopup(popupImage);
  }

function renderGallery(data) {
  const card = new Card(data, '#gallery__element', handleCardClick)
  DOM.gallery.append(card.generateCard());
}

  function openProfileInfoPopup() {
    DOM.formNameProfile.value = DOM.infoName.textContent;
    DOM.formDescriptionProfile.value = DOM.descriptionProfile.textContent;
    formValidatorProfile.resetValidation();
    showPopup(DOM.popupProfile);
  }
  
  function saveInfoProfile(e) {
    e.preventDefault();
    DOM.infoName.textContent = DOM.formNameProfile.value;
    DOM.descriptionProfile.textContent = DOM.formDescriptionProfile.value;
    closePopup(e);
  }

  function saveCard(e) {
    e.preventDefault();
    const newCard = {
      name: DOM.formNameCard.value,
      link: DOM.formDescriptionCard.value,
      alt: DOM.formNameCard.value
    }
    const card = new Card(newCard, '#gallery__element', handleCardClick)
    DOM.gallery.prepend(card.generateCard());
    closePopup(e);
    DOM.formNameCard.value = '';
    DOM.formDescriptionCard.value = '';
  }
  
  function openAddNewPlacePopup() {
    formValidatorCard.resetValidation()
    showPopup(DOM.popupCard);
  }

  function addListeners() {

    DOM.popupProfile.addEventListener('submit', saveInfoProfile);

    DOM.popupCard.addEventListener('submit', saveCard);
    
    DOM.editButton.addEventListener('click', openProfileInfoPopup);  

    DOM.addNewCard.addEventListener('click', openAddNewPlacePopup);

    DOM.popupProfile.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
        closePopup(DOM.popupProfile);
      }});

    DOM.popupCard.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
        closePopup(DOM.popupProfile);
      }});

    DOM.popupImage.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
        closePopup(DOM.popupImage);
      }});

  }

  initialCards.map(renderGallery);
  addListeners();
  const formValidatorProfile = new FormValidator(CONF, DOM.popupProfile);
  formValidatorProfile.setEventListeners();

  const formValidatorCard = new FormValidator(CONF, DOM.popupCard);
  formValidatorCard.setEventListeners();
  