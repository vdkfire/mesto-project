class Api {
    constructor({url, headers}) {
        this._baseUrl = url;
        this._headers = headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getUserInfo(){
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,
        })
            .then((response) => {
                return this._checkResponse(response)
            });

    }

    setUserInfo({name, about}) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name,
                about,
            }),
        })
            .then((response) => {
                return this._checkResponse(response)
            });
    }

    setUserAvatar(avatar) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar

            }),
        })
            .then((response) => {
                return this._checkResponse(response)
            });
    }

    getAllCards() {
        return fetch(`${this._baseUrl}/cards`, {
            method: "GET",
            headers: this._headers
        })
            .then((response) => {
                return this._checkResponse(response)
            });
    }

    addNewCard({name, link}) {
        return fetch(`${this._baseUrl}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({name, link})
        })
            .then((response) => {
                return this._checkResponse(response)
            });
    }

    addLike(id){
        return fetch(`${this._baseUrl}/cards/likes/${id}`, {
            method: "PUT",
            headers: this._headers,
        })
            .then((response) => {
                return this._checkResponse(response)
            });
    }

    deleteLike(id){
        return fetch(`${this._baseUrl}/cards/likes/${id}`, {
            method: "DELETE",
            headers: this._headers,
        })
            .then((response) => {
                return this._checkResponse(response)
            });
    }

    deleteCard(id){
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: "DELETE",
            headers: this._headers,
        })
            .then((response) => {
                return this._checkResponse(response)
            });
    }
}


export default Api;
