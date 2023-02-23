import React from 'react'

function Hero() {
    let image = 'http://localhost:5000/image/hero_image'
    return (
        <section id="hero" className="container mx-auto items-center justify-between h-fit w-full mt-4 flex p-5">
            <div className="w-[100%] p-1 bg-gradient-to-r from-Ecru to-Myrtle rounded-[6rem]">
                <div className="relative text-white rounded-[6rem] w-[100%] bg-Fogra/90">
                    <div className="w-[100%] h-[30rem]">
                        <img src={image} className="rounded-l-[6rem] rounded-r-[6rem] w-[100%] h-[100%] object-cover"/>
                        <div className="absolute bottom-0 top-0 text-center text-white shadow-xl shadow-Myrtle/65 bg-Fogra/75 rounded-[6rem] p-[3.5rem] z-3">
                            <h1 className="text-5xl mt-[4rem] lg:text-7xl">Leading in the Time Piece Market</h1>
                            <p className="mx-16 mt-8 lg:text-[1.5rem]">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet labore ratione excepturi numquam! Exercitationem hic velit nisi minus laboriosam omnis. Tempore ipsum ab, consectetur impedit illum quidem veniam natus numquam.</p>
                        </div>
                    </div>
                </div>  
            </div>
        </section>
    )
}

export default Hero;