import React, { useState } from 'react'

function Register() {
    const [registerForm, setRegisterForm] = useState({
        username: "",
        password: "",
        confirmation: ""
    })
    const registerUser = (event) => {
        fetch('http://localhost:5000/register', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: registerForm.username,
                password: registerForm.password,
                confirmation: registerForm.confirmation
            })
        })
        .then(response => response.json())
        .catch(error => console.error('error', error))

        setRegisterForm(({
            username: "",
            password: "",
            confirmation: ""
        }))
        event.preventDefault()
    }
    const handleChange = (event) => {
        const {value, name} = event.target
        setRegisterForm(prevNote => ({
            ...prevNote, [name]: value})   
    )}
    return (
        <div>
            <h1 className="my-auto mx-auto mt-8 text-Ecru font-semibold text-[2.5rem]">Register</h1>
            <form className="mb-auto mx-auto flex flex-col">
                <input onChange={handleChange} text={registerForm.username} value={registerForm.username} className="bg-white/0 text-white border mb-8 m-10 rounded p-2 placeholder-11Gray" type="text" name="username" placeholder="Username"></input>
                <input onChange={handleChange} text={registerForm.password} value={registerForm.password} className="bg-white/0 text-white border rounded mx-10 p-2 placeholder-11Gray" type="password" name="password" placeholder="Password"></input>
                <input onChange={handleChange} text={registerForm.confirmation} value={registerForm.confirmation} className="bg-white/0 text-white border rounded mx-10 mt-3 p-2 placeholder-11Gray" type="password" name="confirmation" placeholder="Password (Again)"></input>
                <button onClick={registerUser} className="m-10 border rounded mx-auto text-white p-2 w-[50%] transition ease-in-out hover:border-Ecru hover:text-Ecru">Register</button>
            </form>
        </div>
    )
}

export default Register