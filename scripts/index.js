
const DOM = {
  gallery: document.querySelector('.gallery'),
  galleryElement: document.querySelector('#gallery__element'),
  editButton: document.querySelector('.profile__info-button-edit'),
  infoName: document.querySelector('.profile__info-name'),
  description: document.querySelector('.profile__info-description'),
  popupProfile: document.querySelector('.popup-profile'),
  popupCard: document.querySelector('.popup-card'),
  popupImage: document.querySelector('.popup-image'),
  add: document.querySelector('.profile__add-button')
}

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

initialCards.map(renderGallery);

function createNewPicture(item) {
  const galleryTemplate = DOM.galleryElement.content;
  const galleryElement = galleryTemplate.querySelector('.gallery__element').cloneNode(true);

  galleryElement.querySelector('.gallery__picture').src = item.link;
  galleryElement.querySelector('.gallery__title').textContent = item.name;

  galleryElement.querySelector('.gallery__picture').addEventListener('click', showImage)
  galleryElement.querySelector('.gallery__like').addEventListener('click', likeCard)
  galleryElement.querySelector('.gallery__trash').addEventListener('click', deleteElement)

  return galleryElement

}

function setFirstInitialCards(newElement) {
  if (newElement) return initialCards.unshift(newElement);
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
    DOM.gallery.removeChild(e.target.parentElement);
  }

  function showImage(e) {
    DOM.popupImage.querySelector('.popup-image__picture').src = e.target.src;
    DOM.popupImage.querySelector('.popup-image__picture').onload = () => {
      if (e.target.naturalHeight > e.target.naturalWidth) {
        if (window.innerWidth > 635) {
          DOM.popupImage.querySelector('.popup-image__picture').style.height = '75vh';
        } else {
          const height = String((63 / 568) * window.innerHeight)
          DOM.popupImage.querySelector('.popup-image__picture').style.height = height +'vh';
        }
        DOM.popupImage.querySelector('.popup-image__picture').style.width = '';
      } else {
  
        DOM.popupImage.querySelector('.popup-image__picture').style.height = '';
        DOM.popupImage.querySelector('.popup-image__picture').style.width = '75vw';
      }
      DOM.popupImage.querySelector('.popup-image__title').textContent = e.target.parentNode.children[2].children[0].innerText
      DOM.popupImage.querySelector('.popup-image__close').onclick = (e) => {
        closePopup(e.target.parentNode)
      };
      showPopup(DOM.popupImage);
    };
  }
  
  function openProfileInfoPopup() {
    const formName = DOM.popupProfile.querySelector('.popup__input_form_name');
    const formDescription = DOM.popupProfile.querySelector('.popup__input_form_description');
    formName.value = DOM.infoName.textContent;
    formDescription.value = DOM.description.textContent;
    DOM.popupProfile.querySelector('.popup__close').onclick = (e) => {
      closePopup(e.target.parentNode.parentNode)
    };
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
      setFirstInitialCards(newCard)
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
    DOM.popupCard.querySelector('.popup__close').onclick = (e) => {
      closePopup(e.target.parentNode.parentNode)
    };
    showPopup(DOM.popupCard);
  }

  
  function addListeners() {

    DOM.popupProfile.addEventListener('submit', saveInfoProfile);

    DOM.popupCard.addEventListener('submit', saveCard);
    
    DOM.editButton.addEventListener('click', openProfileInfoPopup);  

    DOM.add.addEventListener('click', openAddNewPlacePopup);
  
  }
  
  addListeners();

  const welcomeMessages = { 
    russian: 'Добро пожаловать',
    english: 'Welcome',
    french: 'Bienvenue',
    italian: 'Benvenuto',
    spanish: 'bienvenido',
    chinese: '歡迎',
    finnish: 'Tervetuloa'
  };
  
  function countLanguages(obj, propsArr) {
    // ваш код здесь
    return propsArr.reduce(
      (accumulator, currentValue) => {
        if(currentValue in obj){
          accumulator += 1
        }
        return accumulator
      }
        , 0);
    }
  
  console.log(countLanguages(welcomeMessages, ['english', 'french', 'mandarin'])); // 2
  console.log(countLanguages(welcomeMessages, ['russian', 'czech'])); // 1