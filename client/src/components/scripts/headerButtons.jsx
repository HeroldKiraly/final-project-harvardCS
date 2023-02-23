const buttons = () => {    
    // Login Func
    let isLoginOpen = false;
    const openLogin = () => {
        const formContainer = document.getElementById('LoginForm')
        const formBkg = document.getElementById('formBkg')
        if (isCartOpen) {
            closeCart()
        }
        formContainer.classList.toggle("hidden")
        formBkg.classList.toggle("hidden")
        isLoginOpen = true;
    }
    const closeLogin = () => {
        const formContainer = document.getElementById('LoginForm')
        const formBkg = document.getElementById('formBkg')
        formContainer.classList.toggle("hidden")
        formBkg.classList.toggle("hidden")
        isLoginOpen = false;
    }

    // Cart Func
    let isCartOpen = false;
    const openCart = () => {
        const cartContainer = document.getElementById('cartWin')

        if (isLoginOpen) {
            closeLogin()
        }
        cartContainer.classList.toggle("hidden")
        isCartOpen = true;
    }
    const closeCart = () => {
        const cartContainer = document.getElementById('cartWin')
        cartContainer.classList.toggle("hidden")
        isCartOpen = false;
    }

    // Background
    const closeOpen = () => {
        if (isLoginOpen) {
            closeLogin()
            return
        } else if (isCartOpen) {
            closeCart()
            return
        }
    }

    return {
        openLogin,
        closeLogin,
        openCart,
        closeCart,
        closeOpen
    }

}

export default buttons