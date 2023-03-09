const closeButtonPopup = document.querySelector('.popup__close')
const editButton = document.querySelector('.profile__info-button-edit')
const infoName = document.querySelector('.profile__info-name')
const description = document.querySelector('.profile__info-description')
const popup = document.querySelector('.popup')
const form = document.querySelector('.popup__main')
const formName = document.querySelector('.popup__input_form_name')
const formDescription = document.querySelector('.popup__input_form_description')
  

  function closePopup(popup) {
    popup.classList.remove('popup_opened');
  }
  
  function showPopup(popup) {
    popup.classList.add('popup_opened');
  }

  
  function openProfileInfoPopup() {
    formName.value = infoName.textContent;
    formDescription.value = description.textContent;
    showPopup(popup);
  }
  
  function saveInfo(e) {
    e.preventDefault();
    infoName.textContent = formName.value;
    description.textContent = formDescription.value;
    closePopup(popup);
  }
  
  
  
  
  function addListeners() {
      
    closeButtonPopup.addEventListener('click', () => {
      closePopup(popup);
    });
  
  
    editButton.addEventListener('click', openProfileInfoPopup);  

    form.addEventListener('submit', saveInfo);
  
  }
  
  addListeners();