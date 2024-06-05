import React from 'react';
import './ErrorMSG.css';
import logo from "./img/logo.png";

function ErrorMSG({ message }) {
  return (
    <div className="background">
        <div className="error_container">
            <img className="logo" src={logo} alt="ReAction Bank" />
            <div className="bank_header">ReAction Bank</div>
            <h2>에러 발생</h2>
            <p>{message}</p>
        </div>
    </div>
  );
}

export default ErrorMSG;