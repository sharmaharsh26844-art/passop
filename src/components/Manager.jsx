
import { ToastContainer, toast } from 'react-toastify';
import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])

    const getPassword = async () => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        console.log(passwords)
        setPasswordArray(passwords)
    }

    useEffect(() => {
        getPassword()

    }, [])



    const showPassword = (params) => {

        if (ref.current.src.includes("transparent_icon.png")) {
            alert("hide the password")
            ref.current.src = "https://www.svgrepo.com/show/380010/eye-password-show.svg"
            passwordRef.current.type = "password"
        }
        else {
            alert("show the password")
            ref.current.src = "transparent_icon.png"

            passwordRef.current.type = "text"
        }

    }

    const savePassword = async () => {
        await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id:form.id }) })
        setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
        await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, id: uuidv4() }) })
        // localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
        // console.log(...passwordArray, form)
        setform({ site: "", username: "", password: "" })
        toast('Password Save Successfully !!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",

        });
    }


    const deletePassword = async (id) => {
        console.log("deleting password with id", id)
        let c = confirm("do really want to delete this password?")
        if (c) {

            setPasswordArray(passwordArray.filter(item => item.id !== id))
            // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
            let res = await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })
        }
        toast('Password deleted successfully !!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",

        });
    }


    const editPassword = (id) => {
        console.log("editing password with id")
        setform({...passwordArray.filter(i => i.id === id)[0], id: id})
        setPasswordArray(passwordArray.filter(item => item.id !== id))
    }



    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }


    const copyText = (text) => {
        toast('copied to clipboard', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",

        });
        navigator.clipboard.writeText(text)
    }


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            <ToastContainer />

            <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>

            <div className=" bg-purple-100 p-3 md:mycontainer md:p-10 ">
                <h1 className='text-4xl font-bold text-center'> <span>&lt;</span>
                    pass_<span className='text-purple-900'>OP /&gt;</span></h1>
                <p className='text-purple-950 font-bold text-lg text-center'>Your own password manager </p>

                <div className=" flex flex-col p-4 text-black gap-8 items-center">
                    <input onChange={handleChange} value={form.site} placeholder='Enter website URL' className="rounded-full border border-y-purple-900 w-full p-4 md:w-1/2 py-1" type="text" name="site" />

                    <div className="flex flex-row w-full gap-8 justify-between md:flex-row md:w-1/2">

                        <input onChange={handleChange} value={form.username} placeholder='Enter Username' className="rounded-full border border-y-purple-900 w-full p-4 py-1" type="text" name="username" />

                        <div className="relative">
                            <input ref={passwordRef} onChange={handleChange} value={form.password} placeholder='Enter Password  ' className="rounded-full border border-y-purple-900 w-full p-4 py-1" type="password" name="password" />
                            <span className='absolute right-0'><img className="h-7 w-5 mx-1 my-0.5 cursor-pointer" ref={ref} onClick={showPassword} src="https://www.svgrepo.com/show/380010/eye-password-show.svg" alt="" /></span></div>

                    </div>
                    <button onClick={savePassword} className='flex justify-center items-center bg-fuchsia-700 rounded-3xl px-4 py-2 w-fit hover:bg-fuchsia-300 gap-2 border-2 border-fuchsia-700 font-semibold'>
                        <lord-icon
                            src="https://cdn.lordicon.com/vjgknpfx.json"
                            trigger="hover"
                            stroke="bold"
                            colors="primary:#000000,secondary:#4f1091">
                        </lord-icon>
                        Save Password</button>
                </div>



                <div className='passwords'>
                    <h2 className='font-bold text-2xl py-4'>Your Passwords </h2>

                    {passwordArray.length === 0 && <div>No passwords to show  </div>}
                    {passwordArray.length != 0 &&

                        <table className="table-auto w-full rounded-xl overflow-hidden ">
                            <thead className='bg-purple-600 text-white'>
                                <tr>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Action</th>
                                </tr>
                            </thead>
                            <tbody className='bg-purple-200'>
                                {passwordArray.map((item, index) => {

                                    return <tr key={index}>

                                        <td className='border border-white py-2 text-center flex items-center justify-center'><a href={item.site} target='_blank'>{item.site}</a> <div className='flex items-center justify-center'>
                                            <div className='size-7 cursor-pointer ' onClick={() => copyText(item.site)}> <lord-icon
                                                style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                src="https://cdn.lordicon.com/byupthur.json"
                                                trigger="hover"
                                                stroke="bold"
                                                colors="primary:#000000,secondary:#4f1091"
                                            >
                                            </lord-icon></div>
                                        </div>
                                        </td>
                                        <td className='border border-white py-2 text-center'>
                                            <div className='  flex items-center justify-center'>

                                                <span>{item.username}</span>
                                                <div className='size-7 cursor-pointer ' onClick={() => { copyText(item.username) }}> <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/byupthur.json"
                                                    trigger="hover"
                                                    stroke="bold"
                                                    colors="primary:#000000,secondary:#4f1091"
                                                >
                                                </lord-icon></div>
                                            </div>
                                        </td>
                                        <td className='border border-white py-2 text-center  '>
                                            <div className='flex items-center justify-center'>

                                                <span>{"*".repeat(item.password.length)}</span>
                                                <div className='size-7 cursor-pointer ' onClick={() => { copyText(item.password) }}> <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/byupthur.json"
                                                    trigger="hover"
                                                    stroke="bold"
                                                    colors="primary:#000000,secondary:#4f1091"
                                                >
                                                </lord-icon></div>

                                            </div>
                                        </td>
                                        <td className='border border-white py-2 text-center  '>
                                            <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }} ><lord-icon
                                                src="https://cdn.lordicon.com/exymduqj.json"
                                                trigger="hover"
                                                stroke="bold"
                                                state="hover-line"
                                                colors="primary:#000000,secondary:#4f1091"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                            </span>
                                            <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }} >
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/jzinekkv.json"
                                                    trigger="morph"
                                                    stroke="bold"
                                                    state="morph-trash-in"
                                                    colors="primary:#000000,secondary:#4f1091"
                                                    style={{ "width": "25px", "height": "25px" }}>
                                                </lord-icon>
                                            </span>
                                        </td>
                                    </tr>

                                })}

                            </tbody>
                        </table>
                    }
                </div>
            </div>

        </>
    )
}

export default Manager