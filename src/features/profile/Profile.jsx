import React from 'react';
import { useSelector } from 'react-redux';


const Profile = () => {
  const user = useSelector((state) => state.auth.user.user);

  return (    
    <div
      className=" rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-xl transition"
    >
      <div className="flex flex-col items-center rounded-[10px] bg-white p-4 !pt-20 sm:p-6">
        <h3 className="mt-0.5 text-lg font-medium text-gray-900">
          {user.first_name} {user.last_name}
        </h3>

        <p className="block text-xs text-gray-500">{user.email}</p>
        <span
          className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 my-2 text-xs text-purple-600"
        >
          Clearance level {user.clearance_level}
        </span>
      </div>
    </div>
  );
};

export default Profile;
