import React from 'react'
import Watch from '../assets/watch.svg'
import LoginButton from '../components/LoginButton'
import LogoutButton from '../components/LogoutButton'
import CartButton from '../components/CartButton'

function Header(props) {
    const logoColor = "text-Ecru"

    const cart = <CartButton authToken={props.authToken} openCart={props.openCart}/>
    const login = <LoginButton openLogin={props.openLogin}/>
    const logout = <LogoutButton removeAccessToken={props.removeAccessToken}/>

    let cartButton = cart
    let logButton = login

    if (props.authToken != null) {
        logButton = logout
    } else {
        logButton = login
        cartButton = null
    }
    return (
        <section id="header" className="container mx-auto">
            <nav className="flex items-center justify-between flex-wrap p-6">
                <div className="flex items-center flex-shrink-0 text-white mr-6">
                    <img src={Watch} height="50" width="50" />
                    <h1 className="font-bold text-3xl tracking-tight">
                        <span className={logoColor}>T</span>ime 
                        <span className={logoColor}>P</span>iece 
                        <span className={logoColor}>B</span>rokerage</h1>
                </div>
                <div className="flex w-auto">
                    <div>
                        {cartButton}
                        {logButton}
                    </div>
                </div>
            </nav>
        </section>
    )
}

export default Header