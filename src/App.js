import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FirstPage from './FirstPage';
import SignUp from './SignUp';
import EnterDeposit from './EnterDeposit';
import EnterWithdraw from './EnterWithdraw';
import CompleteDP from './CompleteDP';
import CompleteWD from './CompleteWD';
import CompleteTF from './CompleteTF';
import InquiryTrans from './InquiryTrans';



function App() {
  return (
      <div>
        <Router basename={process.env.PUBLIC_URL}> // 애플리케이션이 GitHub Pages의 프로젝트 이름을 기준으로 URL을 처리하도록 함
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/login" element={<FirstPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/enterDP" element={<EnterDeposit />} />
        <Route path="/enterWD" element={<EnterWithdraw />} />
        <Route path="/completeDP" element={<CompleteDP />} />
        <Route path="/completeWD" element={<CompleteWD />} />
        <Route path="/completeTF" element={<CompleteTF />} />
        <Route path="/inquiry" element={<InquiryTrans />} />
        {/* Default route to handle direct access to the root */}
      </Routes>
    </Router>
      </div>
  );
}

export default App;