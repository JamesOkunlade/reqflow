import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Sidebar from './Sidebar';
import AuthForm from '../features/auth/AuthForm';
import RequestList from '../features/requests/RequestList';
import RequestDetail from '../features/requests/RequestDetail';
import Approvals from '../features/approvals/Approvals';
import PrivateRoute from '../features/auth/PrivateRoute';
import Home from '../features/home/Home';
import Profile from '../features/profile/Profile';

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Router>
      <ToastContainer
         position="top-center"
         autoClose={2000}
         hideProgressBar={true}
      />
      {isAuthenticated ? (
        <div className="flex">
          <Sidebar />
          <div className="ml-64 flex-1 p-6 bg-gray-100 overflow-auto h-screen">
            <Routes>
              <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
              <Route path="/requests" element={<PrivateRoute><RequestList /></PrivateRoute>} />
              <Route path="/requests/:id" element={<PrivateRoute><RequestDetail /></PrivateRoute>} />
              <Route path="/approvals" element={<PrivateRoute><Approvals /></PrivateRoute>} />
              <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
              <Route path="/login" element={<AuthForm type="login" />} />
              <Route path="/signup" element={<AuthForm type="signup" />} />
            </Routes>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <Routes>
            <Route path="/login" element={<AuthForm type="login" />} />
            <Route path="/signup" element={<AuthForm type="signup" />} />
            <Route path="*" element={<AuthForm type="login" />} />
          </Routes>
        </div>
      )}
    </Router>
  );
};

export default App;