import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import reportWebVitals from './reportWebVitals'

//provider
import {AuthProvider} from './context/AuthContext'

ReactDOM.render(
    //Wanted to use React.StrictMode, but material ui has compatibility issues
    <>
        <AuthProvider>
            <App/>
        </AuthProvider>
    </>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
