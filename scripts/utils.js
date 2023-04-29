function showPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener("keydown", closePopupEsc);
  }

  function closePopupEsc(e){
    if(e.code === "Escape"){
      closePopup(e);
    }
  }

  function closePopup(e) {
    const popup = document.querySelector('.popup_opened');
    if (popup){
        popup.classList.remove('popup_opened');
        popup.removeEventListener('click', showPopup);
        popup.removeEventListener('keydown', closePopupEsc);
    }
  }

export {showPopup, closePopup};