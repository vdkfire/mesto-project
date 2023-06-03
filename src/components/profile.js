
import {
    jobInput,
    nameInput,
    newAvatarLink, newAvatarSubmit,
    popupEditAvatar,
    popupEditProfile,
    renderLoading, validationConfig
} from "./utils";
import {setUserAvatar, setUserInfo} from "./api";
import {closePopup} from "./modal";
import {updateUserInfo} from "./index";
import {disableButton} from "./validate";


export function handleProfileFormSubmit (evt) {
    evt.preventDefault();
    renderLoading(popupEditProfile, true);
    setUserInfo({
        name: nameInput.value,
        about: jobInput.value
    })
        .then((info) => {
            updateUserInfo(info);
            closePopup(popupEditProfile)
        })
        .catch((error) => {
            console.log(`Ошибка обновления данных пользователя: ${error}`)
        })
        .finally(() => {
            renderLoading(popupEditProfile);
        })
}

export function handleAvatarFormSubmit (evt) {
    evt.preventDefault();
    renderLoading(popupEditAvatar, true);
    setUserAvatar({avatar: newAvatarLink.value})
        .then((newAvatar) => {
            updateUserInfo(newAvatar);
            closePopup(popupEditAvatar)
            evt.target.reset();
            disableButton(newAvatarSubmit, validationConfig);
        })
        .catch((error) => {
            console.log(`Ошибка обновления аватара пользователя: ${error}`)
        })
        .finally(() => {
            renderLoading(popupEditAvatar);
        })
}
