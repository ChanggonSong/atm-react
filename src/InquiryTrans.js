import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import './InquiryTrans.css';
import logo from "./img/logo.png";

const headers = [
    {
        text: '일자',
        value: 'day'
    },
    {
        text: '변동사항',
        value: 'change'
    },
    {
        text: '유형',
        value: 'type'
    },
];


function ItemTable({ headers, items }) {

    return (
        <table>
            <thead>
            <tr>
                {headers.map(header => (
                    <th key={header.value}>{header.text}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {items.map(({ day, change, type }) => (
                <tr key={day}>
                    <td>{day}</td>
                    <td>{change}</td>
                    <td>{type}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

const InquiryTrans = () => {
    const items = useLocation().state;
    const navigate = useNavigate();

    const moveToFirst = () => {
        navigate('../');
    };

    return (
        <div className="background">
         <div className="inquiry_container">
          <img className="logo" src={logo} alt="ReAction Bank" />
          <div className="bank_header">ReAction Bank</div>
            <h1>거래내역조회</h1>
            <hr />
            <ItemTable className="ItemTable" headers={headers} items={items} />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <button onClick={moveToFirst}>처음으로 돌아가기</button>
         </div>
        </div>
    );
};

export default InquiryTrans;