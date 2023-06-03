export const templateCard = document.querySelector('#card-template');
export const cardsContainer = document.querySelector('.cards__list');

export const popupEditProfile = document.querySelector('#popup-edit-profile');
export const profileName = document.querySelector('.profile__name');
export const profileDescription = document.querySelector('.profile__description');
export const nameInput = document.querySelector('.popup__input_text_name')
export const jobInput = document.querySelector('.popup__input_text_job')
//попап с формой изменения аватара
export const popupEditAvatar = document.querySelector('#popup-edit-avatar');
export const newAvatarLink = popupEditAvatar.querySelector('.popup__input_avatar_link');
export const newAvatarSubmit = popupEditAvatar.querySelector('.popup__button');
export const profileAvatar = document.querySelector('.profile__avatar');

//попап с формой добавления новой карточки
export const popupNewCard = document.querySelector('#popup-new-card');
export const newPlaceName = popupNewCard.querySelector('.popup__input_place_name');
export const newPlaceLink = popupNewCard.querySelector('.popup__input_place_link');
export const newPlaceSubmit = popupNewCard.querySelector('.popup__button');
//попап изображения карточки
export const popupImage = document.querySelector('#popup-image-open');
export const cardImage = popupImage.querySelector('.popup__image');
export const descriptionImageCard = popupImage.querySelector('.popup__image-description');

export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

export const renderLoading = (popup, isLoading = false, startText ='Сохранить') => {
    const button = popup.querySelector('.popup__button');
    if (isLoading) {
        button.textContent = 'Сохранение...';
    } else {
        button.textContent = startText;
    }
};
