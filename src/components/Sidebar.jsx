import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <aside className="fixed flex flex-col h-full w-64 bg-blue-900 text-white">
      <div className="flex flex-col flex-grow">
        <div className="flex items-center px-8 h-16 border-b border-gray-700">
          <span className="text-xl font-semibold">ReqFlow</span>
        </div>
        <nav className="flex-1 px-4 py-2 space-y-1">
          <Link to="/" className="block px-4 py-2 rounded hover:bg-blue-700">Home</Link>
          <Link to="/requests" className="block px-4 py-2 rounded hover:bg-blue-700">Requests</Link>
          <Link to="/approvals" className="block px-4 py-2 rounded hover:bg-blue-700">Approvals</Link>
          <Link to="/profile" className="block px-4 py-2 rounded hover:bg-blue-700">Profile</Link>
        </nav>
      </div>
      <div className="px-4 py-2 border-t border-gray-700">
        <button onClick={handleLogout} className="w-full text-left px-4 py-2 rounded hover:bg-blue-700">Sign Out</button>
      </div>
    </aside>
  );
};

export default Sidebar;
