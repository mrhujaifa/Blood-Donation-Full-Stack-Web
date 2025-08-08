import React from 'react';
import { Outlet } from 'react-router';
import NavbarSwitcher from '../../Components/NavbarSwitcher/NavbarSwicher';
import Navbar from '../../Components/Header/Header';

const AuthLaout = () => {
    return (
        <div>
            <header className='relative z-20'>
                <Navbar></Navbar>
                <NavbarSwitcher></NavbarSwitcher>
            </header>
            <main className='absolute top-0 left-0 right-0'>
                <Outlet></Outlet>
            </main>
        </div>
    );
};

export default AuthLaout;