const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-23',
    headers: {
        authorization: '66648773-9ee0-4bd2-8e80-6912fe526da9',
        'Content-Type': 'application/json'
    }
}

const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}


export const getUserInfo = () => {
    return fetch(`${config.baseUrl}/users/me`,{
        headers: config.headers
    })
        .then(checkResponse);
}

export const setUserInfo = ({name, about}) => {
    return fetch(`${config.baseUrl}/users/me`,{
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: `${name}`,
            about: `${about}`
        })
    })
        .then(checkResponse);
}

export const setUserAvatar = (link) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: link.avatar
        })
    })
        .then(checkResponse);
}

export const getAllCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
        .then(checkResponse);
}

export const addCard = ({name, link}) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({name: name, link: link})
    })
        .then(checkResponse);
}

export const toggleLikeStatus = (cardId, like) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: like? 'PUT': 'DELETE',
        headers: config.headers
    })
        .then(checkResponse);
}

export const deleteCard = (id) => {
    return fetch(`${config.baseUrl}/cards/${id}`, {
        method: 'DELETE',
        headers: config.headers,
    })
        .then(checkResponse);
}



