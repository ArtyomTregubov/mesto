const DOM = {
    closePopup: document.querySelector('.popup__close'),
    editButton: document.querySelector('.profile__info-button-edit'),
    name: document.querySelector('.profile__info-name'),
    description: document.querySelector('.profile__info-description'),
    popup: document.querySelector('.popup'),
    save: document.querySelector('.popup__save-button'),
    gallery: document.querySelector('.gallery'),
    form: document.querySelector('.popup'),
    formName: document.querySelector('.form-name'),
    formDescription: document.querySelector('.form-description'),
  }

  function closePopup(popup) {
    popup.classList.remove('popup_show');
    popup.classList.add('popup_hide');
  }
  
  function showPopup(popup) {
    popup.classList.remove('popup_hide');
    popup.classList.add('popup_show');
  }

  
  function openProfileInfoPopup() {
    DOM.popup.querySelector('.popup__title').textContent = 'Редактировать профиль';
    DOM.form.querySelector('.popup__save-button').textContent = 'Сохранить';
    DOM.formName.value = DOM.name.textContent;
    DOM.formDescription.value = DOM.description.textContent;
    showPopup(DOM.popup);
  }
  
  function saveInfo(e) {
    e.preventDefault();
    DOM.name.textContent = DOM.formName.value;
    DOM.description.textContent = DOM.formDescription.value;
    closePopup(DOM.popup);
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
  
  
  
  function addListeners() {


    for (let key in DOM.gallery.children) {
        if (key === 'length'){
            break
        }
        let elem = DOM.gallery.children[key]
        elem.querySelector('.gallery__like').addEventListener('click', likeCard)
      }
      
    DOM.closePopup.addEventListener('click', () => {
      closePopup(DOM.popup);
    });
  
  
    DOM.editButton.addEventListener('click', openProfileInfoPopup);  

    DOM.form.addEventListener('submit', saveInfo);
  
  }
  
  addListeners();