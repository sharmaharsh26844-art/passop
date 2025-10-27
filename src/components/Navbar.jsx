import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-purple-400 '>
            <div className="mycontainer flex  items-center content-between px-4 justify-between h-14 py-5">

                <div className="logo bg-purple-100 h-10 w-25 rounded-4xl flex justify-center items-center  ">
                    <div className="font-bold ">
                        <span>&lt;</span>
                        pass_<span className='text-purple-900'>OP /&gt;</span>


                    </div>
                </div>
               
                <button className='bg-purple-700 text-white my-5 rounded-xl flex justify-between items-center ring-white ring-1'>
                    <img className='invert w-8 p-1 rounded-4xl' src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="" />
                    <span className='font-bold px-2 '>GitHub</span>
                </button>

            </div>
        </nav>
    )
}

export default Navbar