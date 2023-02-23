import { BrowserRouter, Routes, Route, Await } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import Header from './components/Header'
import Hero from './components/Hero'
import Catalog from './components/Catalog'
import Footer from './components/Footer'
import Cart from './components/Cart'
import auth from './components/auth/auth'
import buttons from './components/scripts/headerButtons'

const Router = () => {
    const { authToken, removeAccessToken, setAuthToken } = auth()
    buttons()
    const { openLogin, openCart, closeOpen} = buttons()
    const [ counter, updateCounter ] = useState(0)

    return (
        <BrowserRouter>
            <div className="App h-fit bg-Fogra/95">
                <div>
                    <div onClick={closeOpen} id="formBkg" className="bg-black/40 h-screen w-screen fixed hidden z-10"></div>
                    <div id="LoginForm" className="hidden z-10">
                        <LoginForm 
                            setAuthToken={setAuthToken} 
                            closeOpen={closeOpen}
                        />
                    </div>
                    <div id="cartWin" className="hidden">
                        <Cart 
                            authToken={authToken}
                            counter={counter}
                            updateCounter={updateCounter}
                        />
                    </div>
                    <Header 
                        authToken={authToken} 
                        removeAccessToken={removeAccessToken} 
                        openLogin={openLogin} 
                        openCart={openCart}
                    />
                    <Hero />
                    <Catalog 
                        authToken={authToken}
                        counter={counter}
                        updateCounter={updateCounter}
                    />
                    <Footer />
                </div>
            </div>
        </BrowserRouter>
    )
}

export default Router