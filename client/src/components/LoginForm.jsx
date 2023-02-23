import React from 'react'
import { useState } from 'react'
import Login from '../components/Login'
import Register from '../components/Register'

function LoginForm(props) {
    let [form, changeForm] = useState(0)
    let text, textLink, verification
    let n = 1
    if (form == 0) {
        verification = <Login setAuthToken={props.setAuthToken} closeOpen={props.closeOpen}/>
        text = "Don't have an account?"
        textLink = "Register Here"
        n = 1
    } else if (form == 1) {
        verification = <Register />
        text = "Already have an account?"
        textLink = "Login Here"
        n = 0
    }
    
    return (
        <div className="bg-Jet h-[50%] w-[35%] fixed transform left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] scale-1 rounded-[1rem] flex flex-col text-center border border-11Gray z-10">
            {verification}
            <p className="my-auto mx-auto">
                {text}
                <button onClick={() => {changeForm(form = n)}} className="text-Myrtle decoration-underline">{textLink}</button>
            </p>
        </div>
    )
}

export default LoginForm