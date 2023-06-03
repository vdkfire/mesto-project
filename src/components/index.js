import '../pages/index.css';
import Api from './Api.js'
import UserInfo from './UserInfo.js';
import Card from "./Card.js";
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js'
import FormValidator from './FormValidator.js';
import {
    validationConfig,
    buttonEditProfile,
    nameInput,
    jobInput,
    popupEditProfile,
    profileAvatar,
    popupEditAvatar,
    cardsContainer,
    newCardButton,
    popupNewCard
} from './utils.js';


const api = new Api({
    url: "https://nomoreparties.co/v1/plus-cohort-23",
    headers: {
        authorization: '66648773-9ee0-4bd2-8e80-6912fe526da9',
        'Content-Type': 'application/json'
    },
});

let userId = null;

const userInfo= new UserInfo({
    profileName: '.profile__name',
    profileDescription: '.profile__description',
    profileAvatar: '.profile__avatar'
})

//изменение информаци о пользователе
const changeProfileInfo = new PopupWithForm(
    '#popup-edit-profile',
    (inputValues) => {
        changeProfileInfo.changeButtonText()
        api.setUserInfo({
            name: inputValues.username,
            about: inputValues.userinfo
        })
            .then((data) => {
                userInfo.setUserInfo(data)
                changeProfileInfo.close()
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                changeProfileInfo.resetButtonText()
            })
    })
changeProfileInfo.setEventListeners()
//активация валидации формы профиля
const changeProfileInfoValidator = new FormValidator(validationConfig, popupEditProfile);
changeProfileInfoValidator.enableValidation();

buttonEditProfile.addEventListener("click", function(){
    const currentUserInfo = userInfo.getUserInfo();
    nameInput.value = currentUserInfo.username;
    jobInput.value = currentUserInfo.description;
    changeProfileInfo.open();
    changeProfileInfoValidator.resetValidation()
});


//изменение аватара пользователя
const changeProfileAvatar = new PopupWithForm(
    '#popup-edit-avatar',
    (inputLink) => {
        changeProfileAvatar.changeButtonText()
        api.setUserAvatar(
            inputLink.avatarurl
        )

            .then((inputLink)=>{
                userInfo.setAvatar(inputLink)
                changeProfileAvatar.close()
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                changeProfileAvatar.resetButtonText()
            })
    })
changeProfileAvatar.setEventListeners()
//активация валидации формы аватара
const changeAvatarValidator = new FormValidator(validationConfig, popupEditAvatar);
changeAvatarValidator.enableValidation();

profileAvatar.addEventListener('click', function(){
    changeProfileAvatar.open();
    changeAvatarValidator.resetValidation()
})

//функция создания карточки
const createCard = (cardsValues) => {
    const createdCard = new Card(
        '#card-template',
        {
            data: cardsValues,
            handleCardClick: (name, link) => {
                popupImageOpen.open(name, link);
            },

            userId,

            handleCardDelete: (id) => {
                api.deleteCard(id)
                    .then(() => {
                        createdCard.handleDeleteCard()
                    }).catch(console.log);
            },

            handleCardLike: (id) =>{
                if(createdCard.isLiked()) {
                    api.deleteLike(id)
                        .then((res)=>{
                            createdCard.setLikes(res.likes)
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                }else{
                    api.addLike(id)
                        .then((res)=>{
                            createdCard.setLikes(res.likes)
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                }
            }
        }
    );
    return createdCard.createCardNode();
}

//отрисовка карточек
const cardElement = new Section({
    renderer: (cardsValues)=>{
        cardElement.addItem(createCard(cardsValues));
    } }, cardsContainer);

//открытие изображения карточки
const popupImageOpen = new PopupWithImage('.popup_image-overlay');
popupImageOpen.setEventListeners();

//создание карточек через форму
const handleAddCard = new PopupWithForm('#popup-new-card',
    function callbackSubmit(inputValues){
        handleAddCard.changeButtonText()
        api.addNewCard({
            name: inputValues.cardname,
            link: inputValues.cardurl
        })
            .then((newCard)=>{
                cardElement.addItem(createCard(newCard))
                handleAddCard.close()
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                handleAddCard.resetButtonText()
            })
    }
)
handleAddCard.setEventListeners()

//активация валидации формы добавления карточки
const addCardValidator = new FormValidator(validationConfig, popupNewCard);
addCardValidator.enableValidation();

newCardButton.addEventListener("click", function(){
    handleAddCard.open();
    addCardValidator.resetValidation()
});



Promise.all([api.getUserInfo(), api.getAllCards()])
    .then(([userData, cards]) => {
        userId = userData._id;
        userInfo.setUserInfo(userData);
        userInfo.setAvatar(userData);
        cardElement.rendererItems(cards.reverse());
    })
    .catch((err) => {
        console.log(err)
    });

