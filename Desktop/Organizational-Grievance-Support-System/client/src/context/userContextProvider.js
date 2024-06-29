import React, { useState } from 'react';
import UserContext from './userContext';

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState({});

    console.log(user.role);
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;
