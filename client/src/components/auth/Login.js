import React, {useState, useContext, useEffect} from 'react';
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";

const Login = (props) => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const {setAlert} = alertContext;
  const {login, error, clearErrors, isAuthenticated} = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/')
    }
    if (error) {
      setAlert(error, 'danger');
      clearErrors();
    }
  }, [error, isAuthenticated, props.history]);
  const [user, setUser] = useState({
    email: '',
    password: ''
  });
  const {email, password} = user;

  const onChange = (e) => setUser({...user, [e.target.name]: e.target.value});
  const onSubmit = (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      setAlert('Please enter all data', 'danger');
    } else {
      login({
        email,
        password
      });
    }
  };

  return (
    <div className="form-container">
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}/>
        </div>
        <input
          type="submit"
          value="Login"
          className="btn btn-primary btn-block"/>
      </form>
    </div>
  );
};

export default Login;