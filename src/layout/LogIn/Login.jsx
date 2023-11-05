import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { useState, useContext } from "react"
// import { Link } from "react-router-dom"

import { ContextVariable } from '../../Context';

const Login = () => {

    const { alert, setalert, setauth } = useContext(ContextVariable)

    const FirebaseAuth = getAuth()
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')

    const handleLogIn = () => {
        signInWithEmailAndPassword(FirebaseAuth, email, password)
            .then((userCredential) => {

                // Signed in 
                const user = userCredential.user;
                setauth(user)

                setalert({
                    ...alert,
                    open: true,
                    message: `Sesion Iniciada`,
                    severity: 'success'
                });
            })
            .catch((error) => {
                const errorMessage = error.message;

                setalert({
                    ...alert,
                    open: true,
                    message: `${errorMessage}`,
                    severity: 'error'
                });

            });
    }

    return (
        <div className="mb-[20rem] mt-[10rem]">
            <div className="w-full lg:w-[30rem] md:w-[50%] px-4 mx-auto pt-6">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-[rgba(248,250,252)] border-0">
                    <div className="rounded-t mb-0 px-6 py-6">
                        <h1 className="hidden md:block font-bold text-sm md:text-[2rem] my-4 text-center">
                            Help Desk<span className="text-teal-600">.</span>
                        </h1>
                        <div className="text-center mb-3">
                            <h1 className="text-gray-500 text-md font-bold">
                                Log In with
                            </h1>
                        </div>
                        {/* <div className="btn-wrapper text-center">
                            <button className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150" type="button">
                                <img alt="..." className="w-5 mr-1" src="https://demos.creative-tim.com/notus-js/assets/img/github.svg" />Github</button>
                            <button className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150" type="button">
                                <img alt="..." className="w-5 mr-1" src="https://demos.creative-tim.com/notus-js/assets/img/google.svg" />Google </button>

                        </div> */}
                        <hr className="mt-6 border-b-1 border-blueGray-300" />
                    </div>
                    <div className="flex-auto px-4 lg:px-10 py-10 pt-2">
                        {/* <div className="text-blueGray-400 text-center mb-3 font-bold">
                            <small>Or sign in with credentials</small>
                        </div> */}
                        <div>
                            <div className="relative w-full mb-3">
                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">Email</label>
                                <input value={email} type="email" onChange={(e) => setemail(e.target.value)} className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="Email" />
                            </div>
                            <div className="relative w-full mb-3">
                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">Password</label>
                                <input value={password} type="password" onChange={(e) => setpassword(e.target.value)} className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="Password" />
                            </div>
                            {/* <div>
                                <label className="inline-flex items-center cursor-pointer"><input id="customCheckLogin" type="checkbox" className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150" /><span className="ml-2 text-sm font-semibold text-blueGray-600">Remember me</span></label>
                            </div> */}
                            <div className="text-center mt-6">
                                <button onClick={handleLogIn} className="group relative w-full px-6 py-3 overflow-hidden rounded shadow hover:shadow-lg bg-[#3d36ba] text-sm font-bold uppercase text-white my-4">
                                    Log In
                                    <div className="absolute inset-0 h-full w-full scale-0 rounded transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                                </button>
                                {/* <p className="mt-4 text-sm">Dont Have An Account Yet? <Link to='/signin' className="underline cursor-pointer"> Sign In</Link></p> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Login;