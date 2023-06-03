class FormValidator {
    constructor(config, formElement) {
        this._formElement = formElement;
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;

        this._inputList = Array.from(this._formElement.querySelectorAll(`.${this._inputSelector}`));
        this._submitButton = this._formElement.querySelector(`.${this._submitButtonSelector}`);
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    }

    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    }

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _disableButton() {
        this._submitButton.setAttribute('disabled', true)
        this._submitButton.classList.add(this._inactiveButtonClass);
    }

    _toggleButtonState() {
        if (this._hasInvalidInput(this._inputList)) {
            this._disableButton(this._submitButton, this._inactiveButtonClass);
        } else {
            this._submitButton.removeAttribute('disabled')
            this._submitButton.classList.remove(this._inactiveButtonClass);
        }
    }

    _checkInputValidity(inputElement) {
        if (inputElement.validity.patternMismatch) {
            inputElement.setCustomValidity(inputElement.dataset.errorMessage);
        } else {
            inputElement.setCustomValidity("");
        }
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage, /*config*/);
        } else {
            this._hideInputError(inputElement);
        }
    };

    _setEventListeners() {
        this._toggleButtonState(this._inputList, this._submitButton);

        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState(this._inputList, this._submitButton);
            });
        });
    }

    enableValidation() {
        this._setEventListeners();
    }

    resetValidation() {
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });
        this._toggleButtonState()
    };
}

export default FormValidator;
