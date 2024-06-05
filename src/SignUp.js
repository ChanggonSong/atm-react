import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';
import logo from "./img/logo.png";
import background from "./img/background.png";

function SignUp() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [accountNum, setAccountNum] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  // 계좌번호 양식
  const validateAccountNum = (num) => {
    const regex = /^\d{3}-\d{3}-\d{4}$/;
    return regex.test(num);
  };

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
        setError('입력하신 비밀번호가 일치하지 않습니다.');
        return;
    }

    if (!validateAccountNum(accountNum)) {
        setError('계좌번호 형식이 올바르지 않습니다. 형식: xxx-xxx-xxxx');
        return;
    }
  
    try {
        const response = await fetch('/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: id, pw: password, name, accountNum }),
        });
  
        if (response.ok) {
          navigate('/login');
        } else {
            const responseData = await response.json();
            if (response.status === 409) {
                setError('이미 회원가입된 사용자입니다.');
              } else {
                setError(responseData.message || '회원가입 실패. 입력한 정보를 다시 확인하세요.');
              }
        }
    } catch (error) {
        setError('서버 오류. 잠시 후 다시 시도해주세요.');
    }
  };

  return (
    <div className="background">
      <div className="login_container">
      <img className="logo" src={logo} alt="ReAction Bank" />
      <div className="bank_header">ReAction Bank</div>
        <div className="atm_header">정보를 입력해주세요</div>
        <br></br>
        <div className="input_container">
          <input type="text" value={id} onChange={(e) => setId(e.target.value)} placeholder="아이디를 입력하세요." />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호를 입력하세요." />
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="비밀번호 확인" />
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="이름을 입력하세요." />
          <input type="text" value={accountNum} onChange={(e) => setAccountNum(e.target.value)} placeholder="계좌번호를 입력하세요." />
        </div>
        {error && <div className="error_message">{error}</div>}
        <br></br>
        <button className="login_button" onClick={handleSignUp}>회원가입</button>
      </div>
    </div>
  );
}

export default SignUp;