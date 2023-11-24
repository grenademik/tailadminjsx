import { createSlice, configureStore } from "@reduxjs/toolkit"
import { login, getUserData } from "../api/auth"

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    isLoading: true,
    user: null
  },
  reducers: {
    initialize(state, action) {
      const user = action.payload
      state.isAuthenticated = !!user
      state.isLoading = false
      state.user = user || null
    },
    signIn(state, action) {
      const user = action.payload
      state.isAuthenticated = true
      state.user = user
    },
    signOut(state) {
      state.isAuthenticated = false
      state.user = null
    }
  }
})

export const { initialize, signIn, signOut } = authSlice.actions

export const authReducer = authSlice.reducer

// Async action creators
export const initializeAuth = () => async dispatch => {
  let user = null

  try {
    const res = await getUserData()
    if (res.status) {
      user = {
        ...res.data
      }
    }
  } catch (err) {
    console.error("Error fetching user data:", err.message)
  }
  dispatch(initialize(user))
}

export const signInAsync = (email, password) => async dispatch => {
  console.log("here")
  const response = await login(email, password)
  console.log(response)
  if (response.status) {
    // Store tokens in local storage
    console.log(response.tokens.access)
    localStorage.setItem("accessToken", response.tokens.access)
    localStorage.setItem("refreshToken", response.tokens.refresh)

    const user = {
      id: response.user_details.id,
      avatar: response.user_details.profile_image,
      name:
        response.user_details.first_name +
        " " +
        response.user_details.last_name,
      email: email,
      isVerified: response.user_details.is_verified,
      isStaff: response.user_details.is_staff,
      uuid: response.user_details.uuid
    }
    dispatch(signIn(user))
  } else {
    // Return a rejected promise with an error message
    return Promise.reject("Invalid credentials")
  }
  return true
}

export const signOutAsync = () => async dispatch => {
  localStorage.removeItem("accessToken")
  localStorage.removeItem("refreshToken")
  window.sessionStorage.setItem("authenticated", "false")
  dispatch(signOut())
}
// Configure Redux store
const store = configureStore({
  reducer: {
    auth: authReducer
  }
})

export default store
