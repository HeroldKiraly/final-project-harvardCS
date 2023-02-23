import React, { useState, useEffect} from 'react';
import CatalogItem from './CatalogItem'

function Catalog(props) {
    let userToken = props.authToken
    const [ catalogData, updateCatalogData ] = useState(null)
    async function getCatalogData() {
        try {
            const response = await fetch('http://localhost:5000/main', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
            }, [])
            const data = await response.json()
            return data
        } catch (error) {
            return console.error('error', error)
        }
    }
    useEffect(() => {
        getCatalogData().then((data) => {
            updateCatalogData(data)
        })
    }, [])
    
    return (
        <section className="container mx-auto text-white">
            <div className="text-center flex flex-wrap justify-center mt-4">

                {catalogData != null ? catalogData.map(item => (
                        <CatalogItem
                            authToken={userToken}
                            updateCounter={props.updateCounter}
                            counter={props.counter}
                            id={item.id}
                            name={item.name}
                            sku={item.sku}
                            price={item.price}
                            imagePath={item.imagePath}
                        />
                )): <p>Loading catalog...</p> }
            
            </div>
        </section>
    )
}

export default Catalog;