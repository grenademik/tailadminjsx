export const setAttemptedRoute = route => ({
  type: "SET_ATTEMPTED_ROUTE",
  payload: route
})

// redux/reducers/authReducer.js

const initialState = {
  isAuthenticated: false,
  attemptedRoute: null // Store the attempted route
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ATTEMPTED_ROUTE":
      return {
        ...state,
        attemptedRoute: action.payload
      }
    // Other reducer cases...
    default:
      return state
  }
}

export default authReducer
