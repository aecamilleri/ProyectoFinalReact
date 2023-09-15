import React from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header id="header" className=' bg-black'>
      <div className="header flex justify-between py-8 px-2 mx-auto max-w-screen-xl bg-black text-slate-800">
        <Link to={"/"} className='mx-6'>
          <img src="https://static.wixstatic.com/media/5dcbc4_ad103981fdda4afbbd21c7ffffe933cb.png/v1/fill/w_629,h_107,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/5dcbc4_ad103981fdda4afbbd21c7ffffe933cb.png" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
        </Link>
        <Navbar />
      </div>
    </header>
  );
}

export default Header;
