const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-24',
  headers: {
    authorization: '5a5e5fbd-ddc1-439f-931b-7b08a3cbb998',
    'Content-Type': 'application/json'
  }
};


const handleResponse = (res, errorText) => { 
  if (res.ok) {
      return res.json();
  }
    return Promise.reject(`${errorText}: ${res.status}`);
};



export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: config.headers
  })
    .then(handleResponse)
};  

    // метод отправки созданной карточки на сервер
export const addNewCard = (newCardData) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(newCardData)
  })
    .then(handleResponse)
};

// Метод получения данных пользователя с сервера
export const getUserData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: config.headers
    // По умолчанию fetch — это GET, можно не указывать
  })
  .then(handleResponse)
};

//Метод отправки данных пользователя на сервер
export const sendUserData = (profileName, profileDescription) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method:"PATCH",
    headers: config.headers,
    body: JSON.stringify({ name: profileName, about: profileDescription })
  })
  .then(handleResponse);
};

// Метод отправки лайка на сервер
export const putCardLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}/likes`, {
    headers: config.headers,
    method: 'PUT',
  })
  .then(handleResponse)
};

// Метод удаления лайка с сервера
export const deleteCardLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}/likes`, {
    headers: config.headers,
    method: 'DELETE',
  })
  .then(handleResponse)
};

// Метод отправки данных о новом аватаре на сервер!
export const sendAvatarData = (avatarLink) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    headers: config.headers,
    method: 'PATCH',
    body: JSON.stringify({ avatar: avatarLink })
  })
  .then(handleResponse)
};

//Метод удаления карточки с сервера!
export const deleteCardApi = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    headers: config.headers,
    method: 'DELETE',
  })
  .then(handleResponse)
};
