import React, {useReducer} from "react";
import axios from "axios"
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
  const register = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const res = await axios.post('/api/users', formData, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
    } catch (e) {
      dispatch({
        type: REGISTER_FAIL,
        payload: e.response.data.msg
      });
    }
  };
  //login user
  //logout
  //clear errors
  const clearErrors = () => dispatch({
    type:CLEAR_ERRORS
  });
  return (
    <AuthContext.Provider
      value = {{
        token,
        user,
        isAuthenticated,
        loading,
        error,
        register,
        clearErrors
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
