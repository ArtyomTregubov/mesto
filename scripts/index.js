
const DOM = {
  gallery: document.querySelector('.gallery'),
  galleryElement: document.querySelector('#gallery__element'),
  editButton: document.querySelector('.profile__info-button-edit'),
  infoName: document.querySelector('.profile__info-name'),
  description: document.querySelector('.profile__info-description'),
  popupProfile: document.querySelector('.popup-profile'),
  popupCard: document.querySelector('.popup-card'),
  popupImage: document.querySelector('.popup-image'),
  add: document.querySelector('.profile__add-button'),
}
DOM.popupImageTitle = DOM.popupImage.querySelector('.popup-image__title')
DOM.popupImagePicture = DOM.popupImage.querySelector('.popup-image__picture')
DOM.formName = DOM.popupProfile.querySelector('.popup__input_form_name');
DOM.formDescription = DOM.popupProfile.querySelector('.popup__input_form_description');
DOM.formNameCard = DOM.popupCard.querySelector('.popup__input_form_name');
DOM.formDescriptionCard = DOM.popupCard.querySelector('.popup__input_form_description');
DOM.closeButtonImage = DOM.popupImage.querySelector('.popup__close')
DOM.closeButtonProfile = DOM.popupProfile.querySelector('.popup__close')
DOM.closeButtonCard = DOM.popupCard.querySelector('.popup__close')

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

initialCards.map(renderGallery);

function createNewPicture(item) {
  const galleryTemplate = DOM.galleryElement.content;
  const galleryElement = galleryTemplate.querySelector('.gallery__element').cloneNode(true);
  const galleryPicture = galleryElement.querySelector('.gallery__picture')
  galleryPicture.src = item.link;
  galleryElement.querySelector('.gallery__title').textContent = item.name;
  galleryPicture.alt = item.alt;

  galleryPicture.addEventListener('click', showImage)
  galleryElement.querySelector('.gallery__like').addEventListener('click', likeCard)
  galleryElement.querySelector('.gallery__trash').addEventListener('click', deleteElement)

  return galleryElement

}

function renderGallery(item) {
  DOM.gallery.append(createNewPicture(item));
}

  function closePopup(popup) {
    popup.classList.remove('popup_opened');
  }
  
  function showPopup(popup) {
    popup.classList.add('popup_opened');
  }

  function deleteElement(e) {
    DOM.gallery.removeChild(e.target.closest('.gallery__element'));
  }

  function showImage(e) {
    const picture = DOM.popupImagePicture
    picture.src = e.target.src;
    picture.alt = e.target.alt;
    picture.onload = () => {
      if (e.target.naturalHeight > e.target.naturalWidth) {
        if (window.innerWidth > 635) {
          picture.style.height = '75vh';
        } else {
          const height = String((63 / 568) * window.innerHeight)
          picture.style.height = height +'vh';
        }
        picture.style.width = '';
      } else {
  
        picture.style.height = '';
        picture.style.width = '75vw';
      }
      DOM.popupImageTitle.textContent = e.target.alt
      
      showPopup(DOM.popupImage);
    };
  }
  
  function openProfileInfoPopup() {
    DOM.formName.value = DOM.infoName.textContent;
    DOM.formDescription.value = DOM.description.textContent;
    showPopup(DOM.popupProfile);
  }
  
  function saveInfoProfile(e) {
    e.preventDefault();
    if (DOM.formName.value && DOM.formDescription.value) {
      DOM.infoName.textContent = DOM.formName.value;
      DOM.description.textContent = DOM.formDescription.value;
    }
    closePopup(DOM.popupProfile);
  }

  function saveCard(e) {
    e.preventDefault();
    if (DOM.formNameCard.value && DOM.formDescriptionCard.value) {
      const newCard = {
        name: DOM.formNameCard.value,
        link: DOM.formDescriptionCard.value
      }
      DOM.gallery.insertBefore(createNewPicture(newCard), DOM.gallery.firstChild);
    } 
    closePopup(DOM.popupCard);
    DOM.formNameCard.value = '';
    DOM.formDescriptionCard.value = '';
  }
  
  function likeCard(e) {
    e.target.classList.toggle('gallery__like_active')
  }
  
  function openAddNewPlacePopup() {
    showPopup(DOM.popupCard);
  }

  
  function addListeners() {

    DOM.popupProfile.addEventListener('submit', saveInfoProfile);

    DOM.popupCard.addEventListener('submit', saveCard);
    
    DOM.editButton.addEventListener('click', openProfileInfoPopup);  

    DOM.add.addEventListener('click', openAddNewPlacePopup);

    DOM.closeButtonImage.addEventListener('click', (e) => {
      closePopup(e.target.closest("." + DOM.popupImage.classList[1]))
    });

    DOM.closeButtonProfile.addEventListener('click', (e) => {
      closePopup(e.target.closest('.popup-profile'))
    });

    DOM.closeButtonCard.addEventListener('click', (e) => {
      closePopup(e.target.closest('.popup-card'))
    });
  
  }
  
  addListeners();
