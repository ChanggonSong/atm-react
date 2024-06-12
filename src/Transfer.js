import React, { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import "./Transfer.css";
import logo from "./img/logo.png";
import background from "./img/background.png";

function Transfer() {
    const navigate = useNavigate();
    const location = useLocation();
    const { id, accountNum, balance } = location.state || {};
    const [receiverAccountNum, setReceiverAccountNum] = useState('');
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');

    const handleTransfer = async () => {
        try {
            const response = await fetch(`/accounts/${localStorage.getItem('id')}/transfer`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({receiverAccountNum : receiverAccountNum, amount : amount}),
            });
      
            if (response.ok) {
              const data = await response.json();
              navigate('/completeTF', {state : data.data.balance});
            } else {
              setError('금액을 다시 입력해주세요.');
            }
        } catch (error) {
            setError('서버 오류. 잠시 후 다시 시도해주세요.');
        }
    };

    return (
        <div className="background">
            <div className="transfer_container">
                <img className="logo" src={logo} alt="ReAction Bank" />
                <div className="bank_header">ReAction Bank</div>
                <div className="transfer_header">이체하기</div>
                <br />
                <div className="input_container">
                    <input
                        type="text"
                        placeholder="받을 계좌번호를 입력하세요"
                        value={receiverAccountNum}
                        onChange={(e) => setReceiverAccountNum(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="이체할 금액을 입력하세요"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>
                <br />
                {error && <div className="error-message">{error}</div>}
                <button className="transfer_button" onClick={handleTransfer}>이체하기</button>
            </div>
        </div>
    );
}

export default Transfer;
