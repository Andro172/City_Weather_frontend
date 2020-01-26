import React from 'react';
import LoginForm from '../components/forms/LoginForm';

function Login() {
  return (
    <div className="login">
      <h4 className="text-center font-weight-bold mb-5">
        Check the current weather in any city!
      </h4>
      <LoginForm />
    </div>
  );
}

export default Login;
