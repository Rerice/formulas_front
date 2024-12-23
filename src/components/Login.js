import React, { useState } from 'react';
import { login } from '../services/api';

const Login = ({ setUser  }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = await login({ username, password });
        if (user) {
            setUser (user);
            setError('');
        } else {
            setError('Неверные учетные данные');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder="Имя пользователя" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
            />
            <input 
                type="password" 
                placeholder="Пароль" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
            />
            <button type="submit">Войти</button>
            {error && <p>{error}</p>}
        </form>
    );
};

export default Login;
