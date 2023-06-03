class UserInfo{
    constructor({profileName, profileDescription, profileAvatar}){
        this._name = document.querySelector(profileName);
        this._description = document.querySelector(profileDescription);
        this._avatar = document.querySelector(profileAvatar);
    }

    getUserInfo() {
        const userInfo = {
            username: this._name.textContent,
            description: this._description.textContent
        }
        return userInfo;
    }

    setUserInfo(data) {
        this._name.textContent = data.name;
        this._description.textContent = data.about;
    }

    setAvatar(data){
        this._avatar.style.backgroundImage = `url(${data.avatar})`;
    }
}

export default UserInfo;
