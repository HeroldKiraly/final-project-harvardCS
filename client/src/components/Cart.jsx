import React, { useState, useEffect } from 'react'
import CartItem from './CartItem'

function Cart(props) {
    if (props.authToken == null) {
        return
    }
    const [ cartData, updateCartData ] = useState(null)
    let totalPrice = 0
    if (cartData != null) {
        for (let i = 0; i < cartData.length; i++) {
            totalPrice += cartData[i][0]["price"]
        }
    }
    async function getCartData() {
        try {
            const response = await fetch('http://localhost:5000/updatecart', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Authorization': 'Bearer ' + props.authToken
                },
            }, [])
            const data = await response.json()
            return data
        } catch (error) {
            return console.error('error', error)   
        }
    }
    useEffect(() => {
        getCartData().then((data) => {
            if (data != cartData) {
                updateCartData(data)
            }
        })
    }, [props.counter])

    async function RemoveFromCart(id) {
        try {
            const response = await fetch('http://localhost:5000/cartremove', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + props.authToken
                },
                body: JSON.stringify({
                    itemID: id
                })
            }, [])
            const status = await response.json()
            // updateCartData(prev => prev.filter(item => item.id !== id))
            return status
        } catch (error) {
            return console.error('error', error)       
        }
    }
  
    return (
        <section className="bg-Jet h-[100vh] w-[45rem] fixed rounded-r-[1rem] flex flex-col overflow-auto z-10">
            <h1 className="text-white text-[3rem] ml-10 mt-5">Your Cart</h1>
            <hr className="m-5"></hr>
            <div className="w-[89%] h-fit ml-10 text-white">

            {cartData != null ? cartData.map(arr => arr.map(item => (
                        <CartItem
                            authToken={props.authToken}
                            RemoveFromCart={RemoveFromCart}
                            updateCounter={props.updateCounter}
                            counter={props.counter}
                            id={item.id}
                            name={item.name}
                            price={item.price}
                            imagePath={item.imagePath}
                        />
                ))): <p>Loading cart information...</p> }

                <h1 className="text-[2rem] float-right m-5">Total: ${ totalPrice }</h1>
            </div>
        </section>
    )
}

export default Cart
