import { useState } from 'react'

const auth = () => {
    const getAccessToken =() => {
        const userToken = localStorage.getItem('auth')
        return userToken && userToken
    }

    const [authToken, setAuthToken] = useState(getAccessToken())

    // Sets the access token
    const saveAccessToken = (userToken) => {
        localStorage.setItem('auth', userToken)
        setAuthToken(userToken)
    }

    // Removes access token from local browser storage
    const removeAccessToken = () => {
        localStorage.removeItem('auth')
        setAuthToken(null)
        setTimeout(() => {
            location.reload()
        }, 500)
    }

    return {
        setAuthToken: saveAccessToken,
        authToken,
        removeAccessToken
    }
}

export default auth