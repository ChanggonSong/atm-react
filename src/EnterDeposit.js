import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './EnterDeposit.css';
import logo from "./img/logo.png";


function EnterDeposit() {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const navigate  = useNavigate();

  
  const isNaturalNumber = (num) => {
    const number = Number(num);
    return Number.isInteger(number) && number > 0;
  };


  const handleDeposit = async  () => {

    if (!isNaturalNumber(amount)) {
        setError('올바른 형식이 아닙니다');
        return;
    }

    try {
        const response = await fetch(`/accounts/${localStorage.getItem('id')}/deposit`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ amount : amount }),
        });
  
        if (response.ok) {
          navigate('/completeDP');
        } else {
          setError('금액을 다시 입력해주세요.');
        }
    } catch (error) {
        setError('서버 오류. 잠시 후 다시 시도해주세요.');
    }
  };


  return (
    <div className="background">
      <div className="deposit_container">
      <img className="logo" src={logo} alt="ReAction Bank" />
      <div className="bank_header">ReAction Bank</div>
        <div className="deposit_header">입금하기</div>
        <br></br>
        <div className="input_container">
          <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="입금할 금액을 입력하세요" />
        </div>
        {error && <div className="error_message">{error}</div>}
        <br></br>
        <button className="deposit_button" onClick={handleDeposit}>입금하기</button>
      </div>
    </div>
  );
}

export default EnterDeposit;
