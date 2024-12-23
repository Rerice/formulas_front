import React, { useState } from 'react';
import Auth from './components/Auth';
import Header from './components/Header';
import AdminPanel from './components/AdminPanel';
import UserPanel from './components/UserPanel';

const App = () => {
    const [user, setUser ] = useState(null);

    const handleLogout = () => {
        setUser (null);
    };

    const isAdmin = user && user.role === 'admin'

    const isUser = user &&  user.role === 'user'

    return (
        <div>
            <Header user={user} onLogout={handleLogout} />
            {user === null ? (
                <Auth setUser ={setUser } />
            ) : (
                <div>
                  {isAdmin && <AdminPanel />}
                  {isUser && <UserPanel user={user}/>}
                </div>
            )}
        </div>
    );
};

export default App;
