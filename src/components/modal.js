
//функция закрытия попапа по клавиши Esc
export const closePopupEsc = (event) => {
    if (event.key === 'Escape') {
        const isOpenedPopup = document.querySelector('.popup_opened');
        closePopup(isOpenedPopup);
    }
}

//функция открытия попапа
export function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keyup', closePopupEsc);
}

//функция закрытия попапа
export function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keyup', closePopupEsc)
}

//закрытие попапа кликом на оверлэй и кнопку закрытия
export const setEventListenersPopup = (popup) => {
    popup.addEventListener('click', (event) => {
        if (event.target.classList.contains('popup') ||
            event.target.classList.contains('popup__close-button')) {
            closePopup(popup);
        }
    })
}



