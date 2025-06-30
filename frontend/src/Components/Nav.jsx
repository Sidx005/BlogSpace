import { Button, Flex } from '@radix-ui/themes/dist/cjs/index.js';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Context';
import { MdMenu } from 'react-icons/md';
import Profile from './Profile';

const Nav = () => {
  const { token, logout } = useAuth();
  const [openMenu, setOpenMenu] = useState(false);

  const openBar = (e) => {
    const isMobile = window.innerWidth <= 768;
    if (e.ctrlKey && e.key.toLowerCase() === 'd' && isMobile) {
      e.preventDefault();
      setOpenMenu((prev) => !prev);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', openBar);
    return () => window.removeEventListener('keydown', openBar);
  }, []);

  return (
    <>
      <Flex justify="between" align="center" className="w-full z-50 backdrop-blur-md p-2 sticky top-0 bg-transparent
      ">
        <Link to="/">
          <img className="h-12 w-auto object-contain" src="/Logo.png" alt="Logo" />
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex bg-white/10 border-2 border-white/30 shadow-md rounded-xl px-4 py-2">
          <Flex gap="4" align="center" justify="center">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/analytics">Analytics</Link>
            <Link to="/blogs">Blogs</Link>
          </Flex>
        </div>

        {/* Desktop Auth Button */}
        <div className="hidden md:flex items-center gap-3">
          {token ? <Profile /> : (
            <Button variant="classic" className="text-base">
              <Link to="/login">Login</Link>
            </Button>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div onClick={() => setOpenMenu(!openMenu)} className="md:hidden cursor-pointer">
          <MdMenu size={30} />
        </div>
      </Flex>

      {/* Mobile Sidebar */}
      <div
        title="Ctrl + D to close"
        className={`fixed md:hidden top-0 left-0 min-h-screen w-2/3 sm:w-1/2 bg-black/80 backdrop-blur-sm text-white text-lg p-6 pt-20 transition-transform duration-300 ease-in-out z-40
        ${openMenu ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <nav className="flex flex-col gap-6">
          <Link onClick={() => setOpenMenu(false)} to="/">Home</Link>
          <Link onClick={() => setOpenMenu(false)} to="/about">About</Link>
          <Link onClick={() => setOpenMenu(false)} to="/analytics">Analytics</Link>
          <Link onClick={() => setOpenMenu(false)} to="/blogs">Blogs</Link>

          {token ? (
            <>
              <Profile />
              <Button variant="classic" onClick={logout}>Logout</Button>
            </>
          ) : (
            <Button variant="classic">
              <Link to="/login">Login</Link>
            </Button>
          )}
        </nav>
      </div>
    </>
  );
};

export default Nav;
