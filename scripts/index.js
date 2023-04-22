const DOM = {
  gallery: document.querySelector('.gallery'),
  editButton: document.querySelector('.profile__info-button-edit'),
  infoName: document.querySelector('.profile__info-name'),
  description: document.querySelector('.profile__info-description'),
  popupProfile: document.querySelector('.popup-profile'),
  popupCard: document.querySelector('.popup-card'),
  add: document.querySelector('.profile__add-button'),
}
DOM.formName = DOM.popupProfile.querySelector('.popup__input_form_name');
DOM.formDescription = DOM.popupProfile.querySelector('.popup__input_form_description');
DOM.formNameCard = DOM.popupCard.querySelector('.popup__input_form_name');
DOM.formDescriptionCard = DOM.popupCard.querySelector('.popup__input_form_description');
DOM.closeButtonProfile = DOM.popupProfile.querySelector('.popup__close');
DOM.closeButtonCard = DOM.popupCard.querySelector('.popup__close');
DOM.saveButtonCard = DOM.popupCard.querySelector('.popup__save-button');

const popupOpened = '.popup_opened';

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

function renderGallery(data) {
  const card = new Card(data, '#gallery__element')
  DOM.gallery.append(card.generateCard());
}

  function closePopup(popup) {
    popup.classList.remove(popupOpened.split('.')[1]);
    document.removeEventListener("keydown", closePopupEsc);
  }
  
  function showPopup(popup) {
    popup.classList.add(popupOpened.split('.')[1]);
    document.addEventListener("keydown", closePopupEsc);
  }

  function openProfileInfoPopup() {
    DOM.formName.value = DOM.infoName.textContent;
    DOM.formDescription.value = DOM.description.textContent;
    showPopup(DOM.popupProfile);
  }
  
  function saveInfoProfile(e) {
    e.preventDefault();
    DOM.infoName.textContent = DOM.formName.value;
    DOM.description.textContent = DOM.formDescription.value;
    closePopup(DOM.popupProfile);
  }

  function saveCard(e) {
    e.preventDefault();
    const newCard = {
      name: DOM.formNameCard.value,
      link: DOM.formDescriptionCard.value,
      alt: DOM.formNameCard.value
    }
    const card = new Card(newCard, '#gallery__element')
    DOM.gallery.insertBefore(card.generateCard(), DOM.gallery.firstChild);
    closePopup(DOM.popupCard);
    DOM.formNameCard.value = '';
    DOM.formDescriptionCard.value = '';
  }
  
  function openAddNewPlacePopup() {
    DOM.saveButtonCard.disabled = true;
    showPopup(DOM.popupCard);
  }

  function closePopupByOverlayMouse(e){
    closePopup(e.target);
  }

  function closePopupEsc(e){
    if(e.code === "Escape"){
      closePopup(document.querySelector(popupOpened));
    }
  }

  function addListeners() {

    DOM.popupProfile.addEventListener('submit', saveInfoProfile);

    DOM.popupCard.addEventListener('submit', saveCard);
    
    DOM.editButton.addEventListener('click', openProfileInfoPopup);  

    DOM.add.addEventListener('click', openAddNewPlacePopup);

    DOM.closeButtonCard.addEventListener('click', (e) => {
      closePopup(e.target.closest(popupOpened))
    });

    DOM.closeButtonProfile.addEventListener('click', (e) => {
      closePopup(e.target.closest('.popup-profile'))
    });

    DOM.popupProfile.addEventListener('click', closePopupByOverlayMouse)
    DOM.popupCard.addEventListener('click', closePopupByOverlayMouse)
    
  }
  const enableValidation = (conf) => {
    const formList = Array.from(document.querySelectorAll(conf.popupMain));
  
    formList.forEach((formElement) => {
      const formValidator = new FormValidator(conf, formElement)
      formValidator.setEventListeners(conf, formElement);
    });
  };
  
enableValidation({
    popupMain: '.popup__main',
    popupSaveButton: '.popup__save-button',
    popupInput: '.popup__input',
    popupInputErrorIsActive: 'popup__input-error_is-active',
    popupInputError: 'popup__input_error'
  });

  initialCards.map(renderGallery);
  addListeners();

  