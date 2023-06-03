class Card {
    constructor(templateSelector, {data, userId, handleCardClick, handleCardDelete, handleCardLike}) {
        this._name = data.name;
        this._image = data.link;
        this._likes = data.likes;
        this._userId = userId;
        this._ownerId = data.owner._id;
        this._id = data._id;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleCardDelete = handleCardDelete;
        this._handleCardLike = handleCardLike;
    }

    _getTemplate() {
        this._card = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.card')
            .cloneNode(true);
        return this._card;
    }

    _setEventListeners() {
        this._cardImage = this._element.querySelector('.card__image');
        this._cardImage.addEventListener('click',() => {
            this._handleCardClick(this._name, this._image)
        });

        this._cardTitle = this._element.querySelector('.card__title');

        this._cardLikeButton = this._element.querySelector('.card__like-button');
        this._cardLikeButton.addEventListener('click', () => {
            this._handleCardLike(this._id);
        });

        this._cardDeleteButton = this._element.querySelector('.card__delete-button');
        this._cardDeleteButton.addEventListener('click', () => {
            this._handleCardDelete(this._id)
        });

    }

    createCardNode(){
        this._element = this._getTemplate();
        this._setEventListeners();

        this._cardImage.src = this._image;
        this._cardTitle.textContent = this._name;
        this._cardImage.alt = this._name;

        if(this._ownerId !== this._userId){
            this._cardDeleteButton.remove();
        }

        this.setLikes(this._likes)

        return this._element;
    }

    isLiked(){
        return this._likes.find(user=>user._id===this._userId)
    }

    setLikes(likes){
        this._likes = likes
        this._card.querySelector('.card__like-count').textContent = this._likes.length;
        if(this.isLiked()){
            this._cardLikeButton.classList.add('card__like-button_active');
        }else{
            this._cardLikeButton.classList.remove('card__like-button_active');
        }
    }

    handleDeleteCard() {
        this._card.remove();
        this._card = null;
    }
}

export default Card;
