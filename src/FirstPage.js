import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FirstPage.css';
import logo from "./img/logo.png";
import background from "./img/background.png";

function FirstPage() {
  // id, pw를 저장할 state 생성
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // useNavigate으로 페이지 이동 관리
  const navigate  = useNavigate();

  // 로그인 버튼 클릭 시 실행.
  const handleLogin = async  () => {
    try {
        const response = await fetch('/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: id, pw: password }),
        });
  
        if (response.ok) {
          navigate('/main');
        } else {
          setError('아이디와 비밀번호를 다시 입력하세요.');
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
      <div className="atm_header">로그인</div>
        <div className="input_container">
          <input type="text" value={id} onChange={(e) => setId(e.target.value)} placeholder="아이디" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호" />
        </div>
        {error && <div className="error_message">{error}</div>}
        <button className="login_button" onClick={handleLogin}>로그인</button>
        <div className="signup_link">
          <a href="/signup">회원가입</a>
        </div>
      </div>
    </div>
  );
}

export default FirstPage;