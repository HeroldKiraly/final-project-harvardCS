import React from 'react';

function LoginButton(props) {
    return (
        <button onClick={props.openLogin} id="loginButton" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white transition ease-in-out hover:border-Ecru hover:text-Ecru hover:bg-Jet mt-0">Log In/Register</button>
    )
}

export default LoginButton