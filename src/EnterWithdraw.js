import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EnterWithdraw.css';
import logo from "./img/logo.png";


function EnterWithdraw() {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const navigate  = useNavigate();

  
  const isNaturalNumber = (num) => {
    const number = Number(num);
    return Number.isInteger(number) && number > 0;
  };


  const handleWithdraw = async  () => {

    if (!isNaturalNumber(amount)) {
        setError('올바른 형식이 아닙니다');
        return;
    }

    try {
        const response = await fetch('/accounts/1/withdraw', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ amount : amount }),
        });
  
        if (response.ok) {
            navigate('/completeWD');
        } else {
          setError('금액을 다시 입력해주세요.');
        }
    } catch (error) {
        setError('서버 오류. 잠시 후 다시 시도해주세요.');
    }
  };


  return (
    <div className="background">
      <div className="withdraw_container">
      <img className="logo" src={logo} alt="ReAction Bank" />
      <div className="bank_header">ReAction Bank</div>
        <div className="withdraw_header">출금하기</div>
        <br></br>
        <div className="input_container">
          <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="출금할 금액을 입력하세요" />
        </div>
        {error && <div className="error_message">{error}</div>}
        <br></br>
        <button className="withdraw_button" onClick={handleWithdraw}>출금하기</button>
      </div>
    </div>
  );
}

export default EnterWithdraw;
