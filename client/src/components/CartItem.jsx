import React from 'react'

function CartItem(props) {
    let url = `http://localhost:5000/image/${props.imagePath}`
    let priceStyled = `$${props.price}`

    return (
        <div className="w-[100%] h-[10rem] border-2 border-Myrtle mb-5 flex rounded">
            <img className="border-r-2 border-Myrtle w-[240px] object-cover" src={ url }/>
            <div className="m-5 text-[1.5rem]">
                <h1 className="">{ props.name }</h1>
                <p>{ priceStyled }</p>
                <button onClick={() => {
                    props.RemoveFromCart(props.id);
                    props.updateCounter(props.counter + 1)
                }} className="border p-1 mt-4 text-[1rem] transition ease-in-out hover:border-red-500 hover:text-red-500">Remove</button>
            </div>
        </div>
    )
}

export default CartItem