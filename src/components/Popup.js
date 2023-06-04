class Popup {
    constructor(popupSelector){
        this.popup = document.querySelector(popupSelector);
    }

    open(){
        this.popup.classList.add('popup_opened');
        document.addEventListener('keyup', this._handleEscClose);
    }

    close(){
        this.popup.classList.remove('popup_opened');
        document.removeEventListener('keyup', this._handleEscClose);
    }

    _handleEscClose=(event) => {
        if (event.key === 'Escape') {
            this.close()
        }
    }

    setEventListeners(){
        this.popup.addEventListener('click', (event) => {
            if (event.target.classList.contains('popup') ||
                event.target.classList.contains('popup__close-button')) {
                this.close()
            }
        })
    }
}

export default Popup;
