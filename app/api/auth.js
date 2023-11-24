import { BaseAPI } from "./_constant"

function login(username, password) {
  return fetch(BaseAPI + "/app/auth/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: username,
      password: password
    })
  })
    .then(response => response.json())
    .then(data => {
      return data
    })
}

function getUserData() {
  const jwt = localStorage.getItem("accessToken")

  if (!jwt) {
    const refreshToken = localStorage.getItem("refreshToken")
    if (!refreshToken) {
      return Promise.reject()
    }
  }
  return fetch(BaseAPI + "/app/whoami/", {
    headers: {
      Authorization: `${jwt}`
    }
  })
    .then(response => {
      return response.json()
    })
    .catch(error => {
      console.error(
        "There was a problem with the getUserData operation:",
        error
      )
    })
}

export { login, getUserData }
