import React, { useState, useEffect } from 'react';
import './InquiryTrans.css';
import logo from './img/logo.png';

const InquiryTrans = async (setError) => {
    try {
        const response = await fetch('/statements', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const original = await response.json();
            const { statementInfos } = original.data;
            return statementInfos;
        } else {
            setError('Failed to load data');
            return null;
        }
    } catch (error) {
        setError('Server error. Please try again later.');
        return null;
    }
};

const StatementList = () => {
    const [statementInfos, setStatementInfos] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const data = await InquiryTrans(setError);
            if (data) {
                setStatementInfos(data);
            }
            setLoading(false);
        };

        fetchData();
    }, []);

    return (
        <div className="background">
            <div className="inquiry_container">
                <img className="logo" src={logo} alt="ReAction Bank" />
                <div className="bank_header">ReAction Bank</div>
                <h2>거래 내역</h2>
                {error && <div className="error_message">{error}</div>}
                <table className="inquiryTable">
                    <thead>
                      <tr>
                          <th>날짜</th>
                          <th>변동금액</th>
                          <th>유통</th>
                      </tr>
                    </thead>
                    <tbody>
                        {statementInfos.map((statement, index) => (
                            <tr key={index}>
                                <td>{statement.date}</td>
                                <td>{statement.amount}</td>
                                <td>{statement.type}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default StatementList;
