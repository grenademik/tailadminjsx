import ThrowAlert from "../../components/alert"
import { BaseAPI } from "./_constant"

async function get(api) {
  const jwt = localStorage.getItem("accessToken")
  if (!jwt) {
    const refreshToken = localStorage.getItem("refreshToken")
    if (!refreshToken) {
    }
  }
  const get_link = BaseAPI + api
  return fetch(get_link, {
    headers: {
      Authorization: `${jwt}`
    },
    method: "GET"
  })
    .then(async response => {
      if (response.ok) {
        return response.json()
      } else {
        try {
          let res = await response.json()
          ThrowAlert.fire("", res["error"], "error")
        } catch (err) {
          ThrowAlert.fire(
            "Error",
            "Sorry! Something went wrong on our side.",
            "error"
          )
          return false
        }
      }
    })
    .catch(error => {
      ThrowAlert.fire({
        icon: "error",
        title: error["msg"]
      })
      return Promise.reject()
    })
}

async function deleteApi(api) {
  const jwt = localStorage.getItem("accessToken")
  if (!jwt) {
    const refreshToken = localStorage.getItem("refreshToken")
    if (!refreshToken) {
      return Promise.reject()
    }
  }
  const get_link = BaseAPI + api
  return fetch(get_link, {
    headers: {
      Authorization: `${jwt}`
    },
    method: "delete"
  })
    .then(async response => {
      if (response.ok) {
        return response.json()
      } else {
        try {
          let res = await response.json()
          ThrowAlert.fire("", res["error"], "error")
        } catch (err) {
          ThrowAlert.fire(
            "Error",
            "Sorry! Something went wrong on our side.",
            "error"
          )
          return false
        }
      }
    })
    .catch(error => {
      ThrowAlert.fire({
        icon: "error",
        title: error["msg"]
      })
      return Promise.reject()
    })
}

async function postApi(api, data) {
  const jwt = localStorage.getItem("accessToken")
  if (!jwt) {
    const refreshToken = localStorage.getItem("refreshToken")
    // if (!refreshToken) {
    //     // return Promise.reject();
    // }
  }
  const post_link = BaseAPI + api
  return fetch(post_link, {
    headers: {
      Authorization: `${jwt}`,
      "Content-Type": "application/json"
    },
    method: "post",
    body: JSON.stringify(data)
  })
    .then(async response => {
      if (response.ok) {
        return response.json()
      } else {
        try {
          let res = await response.json()
          ThrowAlert.fire("", res["error"], "error")
        } catch (err) {
          ThrowAlert.fire(
            "Error",
            "Sorry! Something went wrong on our side.",
            "error"
          )
          return false
        }
      }
    })
    .catch(error => {
      ThrowAlert.fire({
        icon: "error",
        title: error["msg"]
      })
      return Promise.reject()
    })
}

async function patchApi(api, data) {
  const jwt = localStorage.getItem("accessToken")
  if (!jwt) {
    const refreshToken = localStorage.getItem("refreshToken")
    if (!refreshToken) {
      return Promise.reject()
    }
  }
  const get_link = BaseAPI + api
  return fetch(get_link, {
    headers: {
      Authorization: `${jwt}`,
      "Content-Type": "application/json"
    },
    method: "PATCH",
    body: JSON.stringify(data)
  })
    .then(async response => {
      if (response.ok) {
        return response.json()
      } else {
        try {
          let res = await response.json()
          ThrowAlert.fire("", res["error"], "error")
        } catch (err) {
          ThrowAlert.fire(
            "Error",
            "Sorry! Something went wrong on our side.",
            "error"
          )
          return false
        }
      }
    })
    .catch(error => {
      ThrowAlert.fire({
        icon: "error",
        title: error["msg"]
      })
      return Promise.reject()
    })
}

export { get, deleteApi, postApi, patchApi }
