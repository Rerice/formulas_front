import React, { useState } from 'react';
import { login } from '../services/api';
import './Auth.css';

const Auth = ({ setUser  }) => {
    const [username, setUsername] = useState('user2');
    const [password, setPassword] = useState('password2');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        const userData = await login({ username, password });
        if (userData) {
            setUser (userData);
            setError('');
        } else {
            setError('Неверные учетные данные');
        }
    };

    return (
        <form onSubmit={handleLogin} className="auth-form">
            <h2 className="form-title">Вход в систему</h2>
            <input
                type="text"
                placeholder="Имя пользователя"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input-field"
                required
            />
            <input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                required
            />
            <button type="submit" className="submit-button">Войти</button>
            {error && <p className="error-message">{error}</p>}
        </form>
    );
};

export default Auth;
