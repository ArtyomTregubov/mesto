export const gallery = '.gallery';
export const galleryLikeActive = 'gallery__like_active';
export const galleryElement = '.gallery__element';
export const galleryElementId = '#gallery__element';
export const galleryLike = '.gallery__like';
export const galleryTrash = '.gallery__trash';
export const galleryTitle = '.gallery__title';
export const galleryPicture = '.gallery__picture';
export const galleryNumber = '.gallery__number';
export const galleryLikeCount = '.gallery__like-count';

export const popup = 'popup';
export const popupProfileCls = '.popup-profile';
export const popupCardCls = '.popup-card';
export const popupAvatarCls = '.popup-avatar';
export const popupDeleteCardCls = '.popup-delete';
export const popupOpened = 'popup_opened';
export const popupClose = 'popup__close';
export const popupImageCls = '.popup-image';
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
const profileAvatar = '.profile__avatar';

const penCls = '.pen-overlay'

export const galleryDOM = document.querySelector(gallery);
export const editButtonDOM = document.querySelector(profileButtonEdit);
export const addCardButtonDOM = document.querySelector(profileAddCardButton);
export const popupProfileDOM = document.querySelector(popupProfileCls);
export const popupAddNewCardDOM = document.querySelector(popupCardCls);
export const popupChangeAvatarDOM = document.querySelector(popupAvatarCls);
export const avatarDOM = document.querySelector(profileAvatar);
export const penDOM = document.querySelector(penCls);

export const CONF_VALIDATOR = {
  popupMain,
  popupSaveButton,
  popupInput,
  popupInputErrorIsActive,
  popupInputError
};

const TOKEN = '85f45188-40df-476e-9439-a079efcb1c8d';
export const HEADERS = {
    headers: {
    authorization: TOKEN,
    'Content-Type': 'application/json'
    }
};
const cohortId = 'cohort-66';
export const cardsURL = `https://mesto.nomoreparties.co/v1/${cohortId}/cards`;
export const userURL = `https://nomoreparties.co/v1/${cohortId}/users/me`;
export const changeAvatarUrl = `${userURL}/avatar`
export const myUserId = "9ac69d79eceb5617e13a41e7";

export const minWidth = 635;
export const proportion = 63;
export const minHeight = 568;
