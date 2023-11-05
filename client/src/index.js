import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AuthProvider from './context/authContext';
import ChatProvider from './context/chatContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthProvider>
        <ChatProvider>
            <App/>
        </ChatProvider>
    </AuthProvider>
);