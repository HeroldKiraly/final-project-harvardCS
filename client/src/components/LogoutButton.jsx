import React from 'react';

function LogoutButton(props) {
    return (
        <button onClick={props.removeAccessToken} id="logoutButton" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white transition ease-in-out hover:border-Ecru hover:text-Ecru hover:bg-Jet mt-0">Logout</button>
    )
}

export default LogoutButton