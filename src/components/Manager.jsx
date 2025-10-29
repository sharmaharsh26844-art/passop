import { ToastContainer, toast } from 'react-toastify';
import React, { useRef, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const BASE_URL = "https://passop-backend-k1ru.onrender.com";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  const getPassword = async () => {
    let req = await fetch(`${BASE_URL}/`);
    let passwords = await req.json();
    setPasswordArray(passwords);
  };

  useEffect(() => {
    getPassword();
  }, []);

  const showPassword = () => {
    if (ref.current.src.includes("/transparent_icon.png")) {
      alert("hide the password");
      ref.current.src = "https://www.svgrepo.com/show/380010/eye-password-show.svg";
      passwordRef.current.type = "password";
    } else {
      alert("show the password");
      ref.current.src = "transparent_icon.png";
      passwordRef.current.type = "text";
    }
  };

  const savePassword = async () => {
    const newPassword = { ...form, id: uuidv4() };
    setPasswordArray([...passwordArray, newPassword]);
    await fetch(`${BASE_URL}/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPassword),
    });
    setform({ site: "", username: "", password: "" });
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
  };

  const deletePassword = async (id) => {
    let c = confirm("do really want to delete this password?");
    if (c) {
      setPasswordArray(passwordArray.filter(item => item.id !== id));
      await fetch(`${BASE_URL}/`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });
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
  };

  const editPassword = (id) => {
    setform({ ...passwordArray.filter(i => i.id === id)[0], id: id });
    setPasswordArray(passwordArray.filter(item => item.id !== id));
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

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
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <ToastContainer />
      <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>

      <div className="bg-purple-100 p-3 md:p-10">
        <h1 className="text-3xl md:text-4xl font-bold text-center">
          <span>&lt;</span>pass_<span className="text-purple-900">OP /&gt;</span>
        </h1>
        <p className="text-purple-950 font-bold text-lg text-center">
          Your own password manager
        </p>

        {/* ✅ FORM SECTION */}
        <div className="flex flex-col gap-6 p-4 text-black items-center">
          <input
            onChange={handleChange}
            value={form.site}
            placeholder="Enter website URL"
            className="rounded-full border border-y-purple-900 w-full max-w-md p-3 md:p-4"
            type="text"
            name="site"
          />

          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
            <input
              onChange={handleChange}
              value={form.username}
              placeholder="Enter Username"
              className="rounded-full border border-y-purple-900 flex-1 p-3 md:p-4"
              type="text"
              name="username"
            />

            <div className="relative flex-1">
              <input
                ref={passwordRef}
                onChange={handleChange}
                value={form.password}
                placeholder="Enter Password"
                className="rounded-full border border-y-purple-900 w-full p-3 md:p-4"
                type="password"
                name="password"
              />
              <span className="absolute right-3 top-2.5 md:top-3 cursor-pointer">
                <img
                  className="h-6 w-6"
                  ref={ref}
                  onClick={showPassword}
                  src="https://www.svgrepo.com/show/380010/eye-password-show.svg"
                  alt=""
                />
              </span>
            </div>
          </div>

          <button
            onClick={savePassword}
            className="flex justify-center items-center bg-fuchsia-700 rounded-3xl px-4 py-2 w-fit hover:bg-fuchsia-300 gap-2 border-2 border-fuchsia-700 font-semibold"
          >
            <lord-icon
              src="https://cdn.lordicon.com/vjgknpfx.json"
              trigger="hover"
              stroke="bold"
              colors="primary:#000000,secondary:#4f1091"
            ></lord-icon>
            Save Password
          </button>
        </div>

        {/* ✅ TABLE SECTION */}
        <div className="passwords mt-6 overflow-x-auto">
          <h2 className="font-bold text-2xl py-4">Your Passwords</h2>

          {passwordArray.length === 0 && (
            <div className="text-center text-gray-700">No passwords to show</div>
          )}

          {passwordArray.length !== 0 && (
            <div className="overflow-x-auto w-full">
              <table className="table-auto w-full min-w-[600px] rounded-xl overflow-hidden">
                <thead className="bg-purple-600 text-white text-sm md:text-base">
                  <tr>
                    <th className="py-2 px-2">Site</th>
                    <th className="py-2 px-2">Username</th>
                    <th className="py-2 px-2">Password</th>
                    <th className="py-2 px-2">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-purple-200 text-sm md:text-base">
                  {passwordArray.map((item, index) => (
                    <tr key={index} className="text-center">
                      <td className="border border-white py-2 px-2">
                        <div className="flex items-center justify-center gap-2">
                          <a href={item.site} target="_blank" rel="noreferrer" className="truncate max-w-[100px] md:max-w-[200px]">{item.site}</a>
                          <div onClick={() => copyText(item.site)} className="cursor-pointer">
                            <lord-icon
                              style={{ width: "22px", height: "22px" }}
                              src="https://cdn.lordicon.com/byupthur.json"
                              trigger="hover"
                              stroke="bold"
                              colors="primary:#000000,secondary:#4f1091"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="border border-white py-2 px-2">
                        <div className="flex items-center justify-center gap-2">
                          <span className="truncate max-w-[100px] md:max-w-[200px]">{item.username}</span>
                          <div onClick={() => copyText(item.username)} className="cursor-pointer">
                            <lord-icon
                              style={{ width: "22px", height: "22px" }}
                              src="https://cdn.lordicon.com/byupthur.json"
                              trigger="hover"
                              stroke="bold"
                              colors="primary:#000000,secondary:#4f1091"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="border border-white py-2 px-2">
                        <div className="flex items-center justify-center gap-2">
                          <span>{"*".repeat(item.password.length)}</span>
                          <div onClick={() => copyText(item.password)} className="cursor-pointer">
                            <lord-icon
                              style={{ width: "22px", height: "22px" }}
                              src="https://cdn.lordicon.com/byupthur.json"
                              trigger="hover"
                              stroke="bold"
                              colors="primary:#000000,secondary:#4f1091"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="border border-white py-2 px-2">
                        <div className="flex items-center justify-center gap-2">
                          <span onClick={() => editPassword(item.id)} className="cursor-pointer">
                            <lord-icon
                              src="https://cdn.lordicon.com/exymduqj.json"
                              trigger="hover"
                              stroke="bold"
                              state="hover-line"
                              colors="primary:#000000,secondary:#4f1091"
                              style={{ width: "22px", height: "22px" }}
                            ></lord-icon>
                          </span>
                          <span onClick={() => deletePassword(item.id)} className="cursor-pointer">
                            <lord-icon
                              src="https://cdn.lordicon.com/jzinekkv.json"
                              trigger="morph"
                              stroke="bold"
                              state="morph-trash-in"
                              colors="primary:#000000,secondary:#4f1091"
                              style={{ width: "22px", height: "22px" }}
                            ></lord-icon>
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
