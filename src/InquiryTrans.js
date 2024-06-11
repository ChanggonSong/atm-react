import React, { useEffect, useState } from 'react';
import './InquiryTrans.css';
import logo from "./img/logo.png";


const fetchStatements = async (setError) => {

    try {
        const response = await fetch('/statements', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } 
        else {
            setError('데이터 불러오기 실패');
            return null;
        }
    } 
    
    catch (error) {
        setError('서버 오류. 잠시 후 다시 시도해주세요.');
        return null;
    }
};


const InquiryTrans = () => {

    const [statements, setStatements] = useState([]);
    const [balance, setBalance] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');


    useEffect(() => {
        const getStatements = async () => {
            const data = await fetchStatements(setError);
            if (data) {
                // 데이터 형식에 맞게 statements 배열을 생성
                const combinedStatements = data.date.map((date, index) => ({
                    date,
                    amount: data.amount[index],
                    type: data.type[index],
                }));
                setStatements(combinedStatements);
                setBalance(data.balance);
            }
            setLoading(false);
        };

        getStatements();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
    <div className="background">
      <div className="inquiry_container">
      <img className="logo" src={logo} alt="ReAction Bank" />
      <div className="bank_header">ReAction Bank</div>
            <h2>거래 내역</h2>
            {error && <div className="error_message">{error}</div>}
            <table>
                <thead>
                    <tr>
                        <th>날짜</th>
                        <th>변동금액</th>
                        <th>유형</th>
                    </tr>
                </thead>
                <tbody>
                    {statements.map((statement, index) => (
                        <tr key={index}>
                            <td>{statement.date}</td>
                            <td>{statement.amount}</td>
                            <td>{statement.type}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h3>잔액: {balance}</h3>
     </div>
    </div>
    );
};

export default InquiryTrans
