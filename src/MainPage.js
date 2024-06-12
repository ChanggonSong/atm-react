import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import axios from "axios";
import styles from './MainPage.module.css';
import logo from "./img/logo.png";
import background from "./img/background.png";

function MainPage(){
    const navigate = useNavigate();
    const location = useLocation();
    const { id, accountNum, balance } = location.state || {};
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/accounts/own`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    const { id, accountNum, balance } = data.data;
                    // localStorage.setItem('accountInfo', JSON.stringify({ id, accountNum, balance }));
                    localStorage.setItem('id', id);
                    localStorage.setItem('accountNum', accountNum);
                    localStorage.setItem('balance', balance);
                    // Handle response data (e.g., update state with account info)
                } else {
                    setError('계정 정보를 가져올 수 없습니다.');
                }
            } catch (error) {
                setError('서버 오류. 잠시 후 다시 시도해주세요.');
            }
        };

        fetchData();
    }, [id]);

    const handleLogout = async () => {
        try {
            const response = await fetch('/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                navigate('/login');
            } else {
                setError('로그아웃에 실패했습니다.');
            }
        } catch (error) {
            setError('서버 오류. 잠시 후 다시 시도해주세요.');
        }
    };

    const handleNavigation = (path) => {
        navigate(path, { state: { id, accountNum, balance } });
    };

    return (
        <div className={styles.background}>
            <div className={styles.main_header}>
                <div className={styles.logo_header}>
                    <img className={styles.main_logo} src={logo} alt="ReAction Bank" />
                    <div className={styles.main_bank_name}>ReAction Bank</div>
                    <div className={styles.logout} onClick={handleLogout}>로그아웃</div>
                </div>
                <div className={styles.greeting}>좋은 하루 보내세요, {sessionStorage.getItem('loginUser')}님.</div>
            </div>
            
            <div className={styles.main_container}>
                <div className={styles.account_container}>
                    <div className={styles.account_number}>계좌번호 {localStorage.getItem('accountNum')}</div>
                    <div className={styles.balance}>{localStorage.getItem('balance')} 원</div>
                </div>
                <div className={styles.move_container}>
                    <div className={styles.enterDeposit} onClick={() => handleNavigation('/enterDP')}>입금하기</div>
                    <div className={styles.withdrawDeposit} onClick={() => handleNavigation('/enterWD')}>출금하기</div>
                    <div className={styles.transfer} onClick={() => handleNavigation('/transfer')}>이체하기</div>
                    <div className={styles.inquiryTrans} onClick={() => handleNavigation('/inquiry')}>거래내역확인하기</div>
                </div>
            </div>
        </div>
      );
}

export default MainPage;