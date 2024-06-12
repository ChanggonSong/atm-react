import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Complete.css';
import logo from "./img/logo.png";


function CompleteDP({ balance }) {

    const navigate = useNavigate();

    const backHomeClick = () => {
        navigate('/main');
      };
    

    return (
      <div className="background">
          <div className="complete_container">
              <img className="logo" src={logo} alt="ReAction Bank" />
              <div className="bank_header">ReAction Bank</div>
              <h2>입금 완료되었습니다</h2>
              <h3>이용해주셔서 감사합니다</h3>
              <h3>잔고 : {balance}</h3>
              <button className="backhome_button" onClick={backHomeClick}>홈으로 돌아가기</button>
          </div>
      </div>
    );
    
}

export default CompleteDP;
