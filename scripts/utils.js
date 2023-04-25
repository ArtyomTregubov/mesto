function showPopup(popup) {
    popup.classList.add('.popup_opened'.split('.')[1]);
    document.addEventListener("keydown", (e) => {
      closePopupEsc(e)
    });
    const closeButtonImage = document.querySelector('.popup-image').querySelector('.popup__close')
    closeButtonImage.addEventListener('click', (e) => {
      const closest = e.target.closest('.popup_opened');
      if (closest)
        closePopup(closest)
    });
    document.querySelector('.popup-image').addEventListener('click', (e) => {
      closePopupByOverlayMouse(e)
    });
  }

  function closePopupEsc(e){
    if(e.code === "Escape"){
      const popup_opened = document.querySelector('.popup_opened');
      if (popup_opened) {
        closePopup(popup_opened);
      }
    }
  }

  function closePopup(popup) {
    popup.classList.remove('popup_opened');
  }

  function closePopupByOverlayMouse(e){
    closePopup(e.target);
  }

export {showPopup, closePopupByOverlayMouse, closePopupEsc};
