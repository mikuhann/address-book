import React, {useReducer} from "react";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS
} from "../Constants";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem('token'),
    user: null,
    isAuthenticated: null,
    loading: true,
    error: null
  };

  const [state, dispatch] = useReducer(authReducer, initialState);
  const {token, isAuthenticated, loading, error, user} = state;
  //load user
  //register user
  //login user
  //logout
  //clear errors
  return (
    <AuthContext.Provider
      value = {{
        token,
        user,
        isAuthenticated,
        loading,
        error
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
