import React, { useState } from 'react'

function Login(props) {
    const [loginForm, setloginForm] = useState({
        username: "",
        password: ""
    })
    const loginUser = (event) => {
        fetch('http://localhost:5000/login', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: loginForm.username,
                password: loginForm.password
            })
        })
        .then((response) => response.json())
        .then(result => props.setAuthToken(result.access_token))
        .catch(error => console.error('error', error))

        setloginForm(({
            username: "",
            password: ""
        }))
        props.closeOpen()
        setTimeout(() => {
            location.reload()
        }, 1000)
        event.preventDefault()
    }
    const handleChange = (event) => {
        const {value, name} = event.target
        setloginForm(prevNote => ({
            ...prevNote, [name]: value})   
    )}
    return (
        <div>
            <h1 className="my-auto mx-auto mt-8 text-Ecru font-semibold text-[2.5rem]">Login</h1>
            <form className="mb-auto mx-auto flex flex-col">
                <input onChange={handleChange} text={loginForm.username} className="bg-white/0 text-white border mb-8 m-10 rounded p-2 placeholder-11Gray" name="username" type="text" placeholder="Username"></input>
                <input onChange={handleChange} text={loginForm.password} className="bg-white/0 text-white border rounded mx-10 p-2 placeholder-11Gray" name="password" type="password" placeholder="Password"></input>
                <button onClick={loginUser} className="m-10 border rounded mx-auto text-white p-2 w-[50%] transition ease-in-out hover:border-Ecru hover:text-Ecru">Login</button>
            </form>
        </div>
    )
}

export default Login