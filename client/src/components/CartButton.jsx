import React from 'react'

function CartButton(props) {
    return (
        <button onClick={() => {
            props.openCart();
        }} id="cartButton" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white transition ease-in-out hover:border-Ecru hover:text-Ecru hover:bg-Jet mt-0 mr-5">Cart</button>
    )
}

export default CartButton