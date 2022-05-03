// import React from "react";

// import CurrentUserContext from "../contexts/CurrentUserContext";

// class Api {
//   constructor (config) {
//       URL = config.url;
//       this._headers = config.headers;
//   }

// const URL = "http://localhost:3005/";
//const URL = "https://api.15dev.students.nomoredomains.icu/";
const URL = "https://smirnova-mesto-api.netlify.app/";



export function getInitialCards(headers) {
    return fetch(URL + 'cards', {
      headers: {
        authorization: `Bearer ${headers}`,
        "Content-Type": "application/json",
      },

  })
      .then(res => returnData(res));
  }

  export function addNewCard (name, link, headers) {
    return fetch(URL + 'cards', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${headers}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then((res) => {
      return returnData(res)});
}

export function editUserInfo (name, about, headers) {
    return fetch(URL + 'users/me', {
    method: 'PATCH',
    headers: {
      authorization: `Bearer ${headers}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
  .then((res) => returnData(res));
}

export function getUserInfo (headers) {
    return fetch(URL + 'users/me', {
      headers: {
        authorization: `Bearer ${headers}`,
        "Content-Type": "application/json",
      },
      })
      .then((res) => returnData(res));
    }


    export function deleteCard(id, headers) {
      return fetch(URL + `cards/${id}`, {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${headers}`,
            "Content-Type": "application/json",
          },
      }).then((res) => returnData(res))
  }


  export  function likeCard(id,headers) {
    return fetch(URL + `cards/${id}/likes`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${headers}`,
        "Content-Type": "application/json",
      },
  }).then((res) => returnData(res))
  }

  export function deleteLikeCard(id, headers) {
    return fetch(URL + `cards/${id}/likes`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${headers}`,
        "Content-Type": "application/json",
      },
  }).then((res) => returnData(res))
  }

  export function getLikesCard(id, headers) {
    return fetch(URL + `cards/${id}/likes`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${headers}`,
        "Content-Type": "application/json",
      },
  }).then((res) => returnData(res))
  }

  export function setUserAvatar(avatar, headers) {
    return fetch(URL + 'users/me/avatar', {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${headers}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: avatar
      })
    })
    .then((res) => returnData(res));
  }

function returnData (res) {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Ошибка: ${res.status}`);
}



// const api = new Api({
//   url: "https://mesto.nomoreparties.co/v1/cohort-20/",
//   headers: {
// 		authorization: '4b126959-9593-4c1c-9c1d-30d3e8eeddbf',
//     "content-type": "application/json",
//   }
// });

// const api = new Api({
//   url: "http://localhost:3005/",
//   headers: {
//         "content-type": "application/json"
//       }
// });
