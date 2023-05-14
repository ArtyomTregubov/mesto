export const items = [
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


export const gallery = '.gallery';
export const galleryLikeActive = 'gallery__like_active';
export const galleryElement = '.gallery__element';
export const galleryElementId = '#gallery__element';
export const galleryLike = '.gallery__like';
export const galleryTrash = '.gallery__trash';
export const galleryTitle = '.gallery__title';
export const galleryPicture = '.gallery__picture';

export const popup = 'popup';
export const popupProfileCls = '.popup-profile';
export const popupCardCls = '.popup-card';
export const popupOpened = 'popup_opened';
export const popupClose = 'popup__close';
export const popupImage = '.popup-image';
export const popupImageTitle = '.popup-image__title';
export const popupImagePicture = '.popup-image__picture';
export const popupMain ='.popup__main';
export const popupSaveButton = '.popup__save-button';
export const popupInput = '.popup__input';
export const popupInputErrorIsActive = 'popup__input-error_is-active';
export const popupInputError = 'popup__input_error';

export const profileName = '.profile__info-name';
export const profileDescription = '.profile__info-description';
export const profileButtonEdit = '.profile__info-button-edit';
export const profileAddCardButton = '.profile__add-button';

export const galleryDOM = document.querySelector(gallery);
export const editButtonDOM = document.querySelector(profileButtonEdit);
export const addCardButtonDOM = document.querySelector(profileAddCardButton);
export const popupProfileDOM = document.querySelector(popupProfileCls);
export const popupAddNewCardDOM = document.querySelector(popupCardCls);

export const CONF_VALIDATOR = {
  popupMain,
  popupSaveButton,
  popupInput,
  popupInputErrorIsActive,
  popupInputError
};
