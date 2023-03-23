
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

const pictureSelector = '.gallery__picture'
const bigPictureSelector = '.popup-image__picture'

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
  const galleryPicture = galleryElement.querySelector(pictureSelector)
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
    const picture = DOM.popupImage.querySelector(bigPictureSelector)
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
      DOM.popupImage.querySelector('.popup-image__title').textContent = e.target.parentNode.children[2].children[0].innerText
      const closeButton = DOM.popupImage.querySelector('.popup__close')
      // const closeButton = DOM.popupImage.querySelector('.popup-image__close')
      closeButton.addEventListener('click', (e) => {
        closePopup(e.target.closest('.popup-image'))
      });
      showPopup(DOM.popupImage);
    };
  }
  
  function openProfileInfoPopup() {
    const formName = DOM.popupProfile.querySelector('.popup__input_form_name');
    const formDescription = DOM.popupProfile.querySelector('.popup__input_form_description');
    formName.value = DOM.infoName.textContent;
    formDescription.value = DOM.description.textContent;
    DOM.popupProfile.querySelector('.popup__close').addEventListener('click', (e) => {
      // closePopup(e.target.parentNode.parentNode)
      closePopup(e.target.closest('.popup-profile'))
    });
    showPopup(DOM.popupProfile);
  }
  
  function saveInfoProfile(e) {
    e.preventDefault();
    const formName = DOM.popupProfile.querySelector('.popup__input_form_name');
    const formDescription = DOM.popupProfile.querySelector('.popup__input_form_description');
    if (formName.value && formDescription.value) {
      DOM.infoName.textContent = formName.value;
      DOM.description.textContent = formDescription.value;
    }
    closePopup(DOM.popupProfile);
  }

  function saveCard(e) {
    e.preventDefault();
    const formName = DOM.popupCard.querySelector('.popup__input_form_name');
    const formDescription = DOM.popupCard.querySelector('.popup__input_form_description');
    if (formName.value && formDescription.value) {
      const newCard = {
        name: formName.value,
        link: formDescription.value
      }
      DOM.gallery.insertBefore(createNewPicture(newCard), DOM.gallery.firstChild);
    } 
    closePopup(DOM.popupCard);
  }
  
  function likeCard(e) {
    if (!e.target.style.backgroundImage) {
      e.target.style.backgroundImage = 'url(./images/heart-black.svg)';
    } else if (e.target.style.backgroundImage.indexOf('heart-black') !== -1) {
      e.target.style.backgroundImage = 'url(./images/heart-white.svg)';
    } else {
      e.target.style.backgroundImage = 'url(./images/heart-black.svg)';
    }
  }
  
  function openAddNewPlacePopup() {
    const formName = DOM.popupCard.querySelector('.popup__input_form_name');
    const formDescription = DOM.popupCard.querySelector('.popup__input_form_description');
    formName.value = '';
    formDescription.value = '';
    DOM.popupCard.querySelector('.popup__close').addEventListener('click', (e) => {
      // closePopup(e.target.parentNode.parentNode)
      closePopup(e.target.closest('.popup-card'))
    });
    showPopup(DOM.popupCard);
  }

  
  function addListeners() {

    DOM.popupProfile.addEventListener('submit', saveInfoProfile);

    DOM.popupCard.addEventListener('submit', saveCard);
    
    DOM.editButton.addEventListener('click', openProfileInfoPopup);  

    DOM.add.addEventListener('click', openAddNewPlacePopup);
  
  }
  
  addListeners();
