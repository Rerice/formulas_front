import React from 'react';
import './Header.css';

const Header = ({ user, onLogout }) => {
    return (
        <header className="header">
            <h1 className="header-title">Калькулятор формул</h1>
            {user && <button className="logout-button" onClick={onLogout}>Выйти</button>}
        </header>
    );
};

export default Header;