import Popup from './Popup.js';

class PopupWithForm extends Popup {
    constructor(popupSelector, handleSubmit){
        super(popupSelector);
        this._handleSubmit = handleSubmit;
        this._popupForm = this.popup.querySelector('.popup__form');
        this._buttonSubmit = this.popup.querySelector('.popup__button');
        this._buttonText = this._buttonSubmit.textContent;
        this._inputList = Array.from(this._popupForm.querySelectorAll('.popup__input'));

    }

    _getInputValues() {
        const inputValues ={};

        this._inputList.forEach(inputElem => {
            inputValues[inputElem.name] = inputElem.value;
        });

        return inputValues;

    }

    setEventListeners () {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSubmit(this._getInputValues());
        });
    }

    close() {
        super.close();
        this._popupForm.reset();
    }

    changeButtonText(){
        this._buttonSubmit.textContent = 'Сохранение...';
    }

    resetButtonText(){
        this._buttonSubmit.textContent = this._buttonText
    }
}


export default PopupWithForm;
