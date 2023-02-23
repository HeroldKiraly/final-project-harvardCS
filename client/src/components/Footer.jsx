import React from 'react'
import Watch from '../assets/watch.svg'

function Footer() {
    const logoColor = "text-Ecru"
    return (
        <section id="footer" className="flex flex-col justify-center container mt-[5rem] mx-auto text-center text-white h-[15rem]">
            <div className="text-[2rem]">
                <hr className="my-4 mx-auto w-[65%] h-1 bg-Jet rounded border-0" />
            </div>
            <div className="flex justify-center mt-[1.5rem]">
                <div className="m-auto">
                    <div className="flex items-center flex-shrink-0 text-white mr-6">
                        <img src={Watch} height="50" width="50" />
                        <h1 className="font-bold text-3xl tracking-tight ">
                            <span className={logoColor}>T</span> 
                            <span className={logoColor}>P</span> 
                            <span className={logoColor}>B</span>
                            <span className="text-Jet text-[1rem]">@TM</span></h1>
                    </div>
                </div>
                {/* <div className="m-auto">
                    <form>
                        <input type="text"></input>
                        <input type="submit" value="Enroll"></input>
                    </form>
                </div> */}
                <div className="m-auto text-11Gray/95">
                    <p>Phone# +1 (555) 555-5555</p>
                    <p>55th Never Gonna Give Street</p>
                    <p>You up City, 11110</p>
                    <p>Copyright @ Time Piece Brokerage</p>
                </div>
            </div>
        </section>
    )
}

export default Footer