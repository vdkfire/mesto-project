import {
    templateCard,
    cardsContainer,
    popupImage,
    cardImage,
    descriptionImageCard, renderLoading, popupNewCard, newPlaceName, newPlaceLink, newPlaceSubmit, validationConfig
} from "./utils.js";
import {closePopup, openPopup} from "./modal.js";
import {addCard, deleteCard, toggleLikeStatus} from "./api.js";
import {getUserId} from "./index.js";
import {disableButton} from "./validate";


//функция удаления карточки
export function handleTrashCard(card, cardId) {
    deleteCard(cardId)
        .then(() => {
            card.remove();
        })
        .catch((err) => {
            console.log(err);
        });

}

export function addNewCard(event) {
    event.preventDefault();
    renderLoading(popupNewCard, true, 'Cоздать');
    addCard({name: newPlaceName.value, link: newPlaceLink.value})
        .then((newCard) => {
            renderNewCard(newCard);
            closePopup(popupNewCard);
            event.target.reset();
            disableButton(newPlaceSubmit, validationConfig);
        }).catch((err) => {
        console.log(err)
    })
        .finally(() => {
            renderLoading(popupNewCard, false, 'Cоздать');
        })
}

//функция лайка карточки
const updateLikes = (card, likes, currentUserId) => {
    const likeButton = card.querySelector('.card__like-button');
    const likeCounter = card.querySelector('.card__like-count');
    likeCounter.textContent = likes.length.toString();
    const isLiked = Boolean(likes.find((item) => item._id === currentUserId));
    likeButton.classList.toggle('card__like-button_active', isLiked)
};

export function handleLikeButton(card, cardId, currentUserId) {
    const likeButton = card.querySelector('.card__like-button');
    const isLiked = likeButton.classList.contains('card__like-button_active');
    toggleLikeStatus(cardId, !isLiked)
        .then((cardData) => {
            updateLikes(card, cardData.likes, currentUserId);
        })
        .catch((err) => {
            console.log(err);
        });
}

// Функция получения шаблона карточки
function cloneTemplateCard() {
    return templateCard.content.querySelector('.card').
    cloneNode(true);
}

//функция открытия попапа изображения карточки
export function openCardImage(place) {
    cardImage.alt = place.name;
    cardImage.src = place.link;
    descriptionImageCard.textContent = place.name;
    openPopup(popupImage);
}



// функция создания карточки
export function createCard({name, link, likes, owner, _id}) {
    const card = cloneTemplateCard();
    const cardTitle = card.querySelector('.card__title');
    const cardImage = card.querySelector('.card__image');
    const likeButton = card.querySelector('.card__like-button');
    const deleteButton = card.querySelector('.card__delete-button');

    const currentUserId = getUserId();

    cardTitle.textContent = name;
    cardImage.src = link;
    cardImage.alt = name;

    if (owner._id !== currentUserId) {
        deleteButton.remove();
    }

    updateLikes(card, likes, currentUserId);

    likeButton.addEventListener('click', () => {
        handleLikeButton(card, _id, currentUserId)
    });

    deleteButton.addEventListener('click', () => {
        handleTrashCard(card, _id)
    });

    cardImage.addEventListener('click', () => {
        openCardImage({name, link})
    });

    return card
}


//функция отрисовка карточек в контейнере
export function renderCards(cardsList) {
    cardsList.forEach((card) => {
        cardsContainer.append(createCard(card));
    });
}

export function renderNewCard(card) {
    cardsContainer.prepend(createCard(card));
}


