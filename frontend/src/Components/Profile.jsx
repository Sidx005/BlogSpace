import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Context';
import { Button } from '@radix-ui/themes/dist/cjs/index.js';

const Profile = () => {
  const { token, user, logout } = useAuth();
  const [display, setDisplay] = useState(false);
  const id = user?._id;

  return (
    <div className="relative z-50">
      <img
        onClick={() => setDisplay(!display)}
        src={user?.profilePic || 'https://i.imgur.com/iiO1zZ2.png'}
        alt="Profile"
        className="cursor-pointer rounded-full h-10 w-10 object-cover"
      />

      {/* Dropdown */}
      <div
        className={`absolute right-0 mt-2 w-40 bg-white text-black rounded-md shadow-lg transition-all duration-200
        ${display ? 'block' : 'hidden'}`}
      >
        <div className="flex flex-col p-3 gap-2">
          <Link to={`/profile/${id}`} onClick={() => setDisplay(false)}>My Profile</Link>
          {token ? (
            <Button variant="classic" onClick={logout}>Logout</Button>
          ) : (
            <Button variant="classic">
              <Link to="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
