import React from 'react'

function CatalogItem(props) {
    function AddToCart() {
        fetch('http://localhost:5000/cartadd', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + props.authToken,
            },
            body: JSON.stringify({
                itemID: props.id 
            })
        })
        .then((response) => response.json())
        .then((result) => console.log(result))
        .catch(error => console.error('error', error))
    }

    // Comment test

    let url = `http://localhost:5000/image/${props.imagePath}`
    let priceStyled = `$${props.price}`
    let skuStyled = `#${props.sku}`
    return (
        <div className="">
            <div className="mx-[4rem] mt-10 h-[20rem] w-[15rem] rounded-[2rem] transition ease-in-out hover:-translate-y-1 hover:shadow-xl hover:shadow-Ecru">
                <div className="h-[50%]">
                    <img className="rounded-t-[2rem] h-[100%] w-[100%] object-cover" src={ url } alt="" />
                </div>
                <div className="bg-Ecru/10 rounded-b-[2rem] h-[50%] text-[1rem]">
                    <h1 className="text-[1.5rem]">{ props.name }</h1>
                    <hr className="w-[75%] m-auto"></hr>
                    <h2 className="inline float-left ml-10">{ skuStyled }</h2>
                    <p className="inline float-right mr-10">{ priceStyled }</p>
                    <button onClick={() => {
                    AddToCart();
                    props.updateCounter(props.counter + 1)
                }} className="border-Ecru text-Ecru mt-10 text-sm rounded-md border p-2">Add to Cart</button>
                </div>
            </div>
        </div>
    )
}

export default CatalogItem