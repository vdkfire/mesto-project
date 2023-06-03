import '../pages/index.css';
import {
    profileName,
    profileDescription,
    profileAvatar,
    popupEditAvatar,
    nameInput,
    jobInput,
    popupImage,
    popupEditProfile,
    popupNewCard,
    validationConfig} from "./utils.js";
import {openPopup, setEventListenersPopup} from "./modal.js";
import {addNewCard, renderCards} from "./card.js";
import {enableValidation} from "./validate.js";
import {getAllCards, getUserInfo} from './api.js';
import {handleAvatarFormSubmit, handleProfileFormSubmit} from "./profile";


let userId = null;
export const getUserId = () => {
    return userId;
};

export const updateUserInfo = ({name, about, avatar, _id}) => {
    userId = _id;
    profileName.textContent = name;
    profileDescription.textContent = about;
    profileAvatar.style.backgroundImage = `url(${avatar})`;
};

//Добавление слушателей попапу изображения карточки
setEventListenersPopup(popupImage);

//реализация работы попапа с формой изменения профиля
const buttonEditProfile = document.querySelector('.profile__edit-button');
buttonEditProfile.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
    openPopup(popupEditProfile)
});
setEventListenersPopup(popupEditProfile);



//форма изменения профиля
const profileForm = popupEditProfile.querySelector('.popup__form')
profileForm.addEventListener('submit', handleProfileFormSubmit);


//реализация работы попапа с формой изменения аватара
profileAvatar.addEventListener('click', () => {
    openPopup(popupEditAvatar)
});
setEventListenersPopup(popupEditAvatar);




//форма изменения аватара
const avatarForm = popupEditAvatar.querySelector('.popup__form')
avatarForm.addEventListener('submit', handleAvatarFormSubmit);

//реализация работы попапа с формой добавления новой карточки
const newCardButton = document.querySelector('.profile__add-button');
newCardButton.addEventListener('click', () => {
    openPopup(popupNewCard)
});
setEventListenersPopup(popupNewCard);


//форма добавления новой карточки
const formNewCard = popupNewCard.querySelector('.popup__form');
formNewCard.addEventListener('submit', addNewCard);

//активация валидации
enableValidation(validationConfig);

Promise.all([getAllCards(), getUserInfo()])
    .then(([cards, userData]) => {
        updateUserInfo(userData);
        renderCards(cards);
    })
    .catch((err) => {
        console.log(err)
    });
