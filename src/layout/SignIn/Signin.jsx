import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { useState, useContext } from "react"
import { Link } from "react-router-dom"

import { ContextVariable } from '../../Context'

const SignIn = () => {

    const { alert, setalert, setauth } = useContext(ContextVariable)

    // const [user, setUser] = useState()

    const FirebaseAuth = getAuth()
    const db = getFirestore()

    const [name, setname] = useState('')
    const [phone, setphone] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [password2, setpassword2] = useState('')
    const [department, setdepartment] = useState('');


    const submitUser = async (data) => {
        try {
            const docref = await setDoc(doc(db, "Users", data.uid), {
                userName: null,                      //Nombre de usuario: El nombre que el usuario utiliza para iniciar sesión en la plataforma.
                name: name,                          //Nombre completo: El nombre completo del usuario.
                phone: phone,                        //Número de teléfono: El número de teléfono del usuario, que puede ser útil para enviar SMS o notificaciones.
                email: email,                        //Correo electrónico: La dirección de correo electrónico del usuario, que se utiliza para fines de comunicación y notificaciones.
                password: password,                  //Contraseña: La contraseña del usuario, que debe estar segura y cifrada en la base de datos.
                password2: password2,
                profileImage: null,                  //Imagen de perfil: Una imagen que el usuario puede cargar para personalizar su perfil.
                // birthDate: null,                     //Fecha de nacimiento: La fecha de nacimiento del usuario, que puede ser necesaria para verificar la edad en eventos con restricciones de edad.
                // address: null,                       //Dirección: La dirección física del usuario, que podría ser necesaria para la entrega de productos físicos o para verificar la ubicación del usuario.
                accountState: 'active',              //Estado de cuenta: Información sobre el estado de la cuenta del usuario, como si la cuenta está activa, suspendida o bloqueada.
                role: 'user',                        //Rol del usuario: Si tienes diferentes tipos de usuarios (por ejemplo, administradores, compradores de boletos, vendedores de productos), puedes asignar un rol a cada usuario.
                department: department,
                // authToken: null,                     //Tokens de autenticación: Para manejar la autenticación y la seguridad del usuario.
                // scoinTokens: 0,                      //Tokens de moneda virtual: Registra la cantidad de tokens virtuales que el usuario tiene en su cuenta.
                // scoinsBalance: 0,                    //Saldo de monedas: La cantidad de monedas virtuales que el usuario tiene en su cuenta.
                // transactionHistory: null,            //Historial de transacciones: Un registro de las transacciones que ha realizado el usuario, incluyendo la compra de boletos y el gasto de monedas virtuales en eventos.
                // notificationPreferences: null,       //Preferencias de notificación: Las preferencias del usuario para recibir notificaciones por correo electrónico, mensajes de texto u otras formas de comunicación.
                creationDate: new Date(),            //Fecha de Creacion: La fecha en la que el usuario creo su cuenta.
                // updateDate: null                     //Fecha de Actualizacion: La fecha del ultimo movimiento que hizo el usuario en su cuenta
            });

            console.log("Document written with ID: ", docref);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    const handleSignIn = () => {
        createUserWithEmailAndPassword(FirebaseAuth, email, password)
            .then((userCredential) => {

                // Signed in 
                const user = userCredential.user;
                setauth(user)
                submitUser(user)

                setalert({
                    ...alert,
                    open: true,
                    message: `La cuenta ha sido creada con exito`,
                    severity: 'success'
                });
            })
            .catch((error) => {
                // const errorCode = error.code;
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
        <div className="">
            <div className="w-full lg:w-[30rem] md:w-[50%] mx-auto ">
                <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-lg bg-[#ffffff] border-0">
                    <div className="rounded-t mb-0 px-6 py-6">
                        <div className="text-center mb-3">
                            <h1 className="text-blueGray-500 text-md font-bold">
                                Sign Up
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
                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">Name</label>
                                <input value={name} onChange={(e) => setname(e.target.value)} type="email" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="John Doe" />
                            </div>
                            <div className="relative w-full mb-3">
                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">Phone Number</label>
                                <input value={phone} onChange={(e) => setphone(e.target.value)} type="tel" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="000-000-00000" />
                            </div>
                            <div className="relative w-full mb-3">
                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">Email</label>
                                <input value={email} onChange={(e) => setemail(e.target.value)} type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="john@example.com" />
                            </div>
                            <div className="relative w-full mb-3">
                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">Password</label>
                                <input value={password} onChange={(e) => setpassword(e.target.value)} type="password" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="********" />
                            </div>
                            <div className="relative w-full mb-3">
                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">Confirm Password</label>
                                <input value={password2} onChange={(e) => setpassword2(e.target.value)} type="password" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="********" />
                            </div>
                            <div className="relative w-full mb-3">
                                <label htmlFor="country" className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                                    Department</label>
                                <select
                                    id="country"
                                    name="country"
                                    value={department}
                                    autoComplete="country"
                                    onChange={(e) => setdepartment(e.target.value)}
                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                >
                                    <option>{"Administración y archivo clínico"}</option>
                                    <option>{"Administrativo financiero"}</option>
                                    <option>{"Admisiones"}</option>
                                    <option>{"Almacén y suministro"}</option>
                                    <option>{"Atención al usuario"}</option>
                                    <option>{"Auditoria medica"}</option>
                                    <option>{"Auditoria de emergencia"}</option>
                                    <option>{"Bio-seguridad"}</option>
                                    <option>{"Calidad en la gestión"}</option>
                                    <option>{"Cirugía"}</option>
                                    <option>{"Compras y contrataciones"}</option>
                                    <option>{"Contabilidad"}</option>
                                    <option>{"Contraloria"}</option>
                                    <option>{"Correspondencia"}</option>
                                    <option>{"Diálisis"}</option>
                                    <option>{"Dirección"}</option>
                                    <option>{"Electro"}</option>
                                    <option>{"Electromedicina"}</option>
                                    <option>{"Emergencia"}</option>
                                    <option>{"Emergencia laboratorio"}</option>
                                    <option>{"Epidemiologia"}</option>
                                    <option>{"Oficina"}</option>
                                    <option>{"Estadística"}</option>
                                    <option>{"Facturación y seguro Médico"}</option>
                                    <option>{"Hombres"}</option>
                                    <option>{"Hostelería hospitalaria"}</option>
                                    <option>{"Jurídicas"}</option>
                                    <option>{"Laboratorio"}</option>
                                    <option>{"Mama canguro"}</option>
                                    <option>{"Mantenimiento"}</option>
                                    <option>{"Maternidad"}</option>
                                    <option>{"Maternidad peritologia"}</option>
                                    <option>{"Medicina interna"}</option>
                                    <option>{"Microbiología"}</option>
                                    <option>{"Mujeres"}</option>
                                    <option>{"Odontología"}</option>
                                    <option>{"Oficina"}</option>
                                    <option>{"Ortopedia"}</option>
                                    <option>{"Sistema de Informacion y Epidemiologia"}</option>
                                    <option>{"Pediatra"}</option>
                                    <option>{"Pediatria internamiento"}</option>
                                    <option>{"Pie diabético"}</option>
                                    <option>{"Planificación y desarrollo"}</option>
                                    <option>{"Química"}</option>
                                    <option>{"Radiografía"}</option>
                                    <option>{"Recepción"}</option>
                                    <option>{"Recursos humanos"}</option>
                                    <option>{"Sonografia"}</option>
                                    <option>{"Sub-dirección"}</option>
                                    <option>{"Tesorería"}</option>
                                    <option>{"TIC"}</option>
                                    <option>{"Tomografía"}</option>
                                    <option>{"Trabajo social"}</option>
                                    <option>{"Transportación"}</option>
                                    <option>{"Trauma"}</option>
                                    <option>{"Unidad de cuidados intensivos"}</option>
                                    <option>{"Unidad de cuidados intensivos polivalente 2"}</option>
                                    <option>{"Unidad de cuidados intensivos cardiología"}</option>
                                    <option>{"VIH"}</option>
                                </select>
                            </div>

                            {/* <div>
                                <label className="inline-flex items-center cursor-pointer"><input id="customCheckLogin" type="checkbox" className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150" /><span className="ml-2 text-sm font-semibold text-blueGray-600">Remember me</span></label>
                            </div> */}
                            <div className="text-center mt-6">
                                {/* <button className="bg-[#3d36ba] text-white active:bg-gray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150" type="button">
                                    Sign In
                                    <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                                </button> */}
                                <button onClick={handleSignIn} className="group relative w-full px-6 py-3 overflow-hidden rounded shadow hover:shadow-lg bg-[#3d36ba] text-sm font-bold uppercase text-white my-4">
                                    Sign In
                                    <div className="absolute inset-0 h-full w-full scale-0 rounded transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                                </button>
                                {/* <p className="text-sm">Already Have An Account? <Link to='/login' className="underline cursor-pointer"> Log In</Link></p> */}
                                <p className="text-sm">Esta accion va a iniciar sesion automaticamente en el usuario creado</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

};

export default SignIn;