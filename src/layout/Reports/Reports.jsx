import { collection, getFirestore, addDoc } from "firebase/firestore"
import { useEffect, useState, useContext } from "react"

import { ContextVariable } from "../../Context"
import { useNavigate } from "react-router-dom"

function Reports(props) {

    // Nombre del solicitante.
    // Número de empleado o identificación del usuario.
    // Departamento o área.
    // Número de contacto.
    // Tipo de solicitud.
    // Descripción del problema o solicitud.
    // Prioridad.

    // Fecha y hora de la solicitud.
    // Estado de la solicitud.
    // Acciones tomadas.
    // Fecha y hora de cierre.

    const { user, setalert } = useContext(ContextVariable)
    const navigate = useNavigate()

    const [name, setname] = useState(user.name)
    const [userId, setuserId] = useState(user.id)
    const [department, setdepartment] = useState(user.department)
    const [phone, setphone] = useState(user.phone)
    const [requestType, setrequestType] = useState('')
    const [description, setdescription] = useState('')
    const [priority, setpriority] = useState('Normal')
    const [icon, seticon] = useState(null);
    const [viewBox, setviewBox] = useState(null);
    // const [submitDate, setsubmitDate] = useState(new Date())

    const db = getFirestore()

    const submitTicket = async () => {
        try {
            const docref = await addDoc(collection(db, "Tickets"), {
                name: name,                          //Nombre completo: El nombre completo del usuario.
                userId: userId,
                department: department,
                phone: phone,                        //Número de teléfono: El número de teléfono del usuario, que puede ser útil para enviar SMS o notificaciones.
                requestType: requestType,
                description: description,
                priority: priority,
                submitDate: new Date,
                ticketState: 'review',
                resolution: null,
                isSolved: false,
                closeDate: null,
                icon: icon,
                viewBox: viewBox
            });

            console.log("Document written with ID: ", docref);
            setalert({
                ...alert,
                open: true,
                message: `Ticket enviado`,
                severity: 'success'
            });
            if(!props.onClose){
                () => props.onClose()
            }
            navigate('/login')
            clearTicket()

        } catch (e) {
            console.error("Error adding document: ", e);
            setalert({
                ...alert,
                open: true,
                message: `Tu boleta no se ha pudo activar`,
                severity: 'error'
            });
        }
    }

    useEffect(() => {

        seticon(setIcon(priority).iconHander)
        setviewBox(setIcon(priority).viewBoxHandler)

    }, [priority]);

    const setIcon = (option) => {
        const icons = {

            'No Urgente':
            {
                'icon': 'M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM96.8 314.1c-3.8-13.7 7.4-26.1 21.6-26.1H393.6c14.2 0 25.5 12.4 21.6 26.1C396.2 382 332.1 432 256 432s-140.2-50-159.2-117.9zM144.4 192a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z',
                'viewBox': '0 0 512 512'
            },
            'Normal':
            {
                'icon': 'M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM164.1 325.5C182 346.2 212.6 368 256 368s74-21.8 91.9-42.5c5.8-6.7 15.9-7.4 22.6-1.6s7.4 15.9 1.6 22.6C349.8 372.1 311.1 400 256 400s-93.8-27.9-116.1-53.5c-5.8-6.7-5.1-16.8 1.6-22.6s16.8-5.1 22.6 1.6zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z',
                'viewBox': '0 0 512 512'
            },
            'Urgente':
            {
                'icon': 'M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM176.4 176a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm128 32a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM160 336H352c8.8 0 16 7.2 16 16s-7.2 16-16 16H160c-8.8 0-16-7.2-16-16s7.2-16 16-16z',
                'viewBox': '0 0 512 512'
            },
            'Muy Urgente':
            {
                'icon': 'M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM164.7 328.7c22-22 53.9-40.7 91.3-40.7s69.3 18.7 91.3 40.7c11.1 11.1 20.1 23.4 26.4 35.4c6.2 11.7 10.3 24.4 10.3 35.9c0 5.2-2.6 10.2-6.9 13.2s-9.8 3.7-14.7 1.8l-20.5-7.7c-26.9-10.1-55.5-15.3-84.3-15.3h-3.2c-28.8 0-57.3 5.2-84.3 15.3L149.6 415c-4.9 1.8-10.4 1.2-14.7-1.8s-6.9-7.9-6.9-13.2c0-11.6 4.2-24.2 10.3-35.9c6.3-12 15.3-24.3 26.4-35.4zm-31.2-182l89.9 47.9c10.7 5.7 10.7 21.1 0 26.8l-89.9 47.9c-7.9 4.2-17.5-1.5-17.5-10.5c0-2.8 1-5.5 2.8-7.6l36-43.2-36-43.2c-1.8-2.1-2.8-4.8-2.8-7.6c0-9 9.6-14.7 17.5-10.5zM396 157.1c0 2.8-1 5.5-2.8 7.6l-36 43.2 36 43.2c1.8 2.1 2.8 4.8 2.8 7.6c0 9-9.6 14.7-17.5 10.5l-89.9-47.9c-10.7-5.7-10.7-21.1 0-26.8l89.9-47.9c7.9-4.2 17.5 1.5 17.5 10.5z',
                'viewBox': '0 0 512 512'
            },
            'Riesgo Inmediato':
            {
                'icon': 'M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-224a64 64 0 1 1 0 128 64 64 0 1 1 0-128zM100.7 132.7c6.2-6.2 16.4-6.2 22.6 0L160 169.4l36.7-36.7c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6L182.6 192l36.7 36.7c6.2 6.2 6.2 16.4 0 22.6s-16.4 6.2-22.6 0L160 214.6l-36.7 36.7c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6L137.4 192l-36.7-36.7c-6.2-6.2-6.2-16.4 0-22.6zm192 0c6.2-6.2 16.4-6.2 22.6 0L352 169.4l36.7-36.7c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6L374.6 192l36.7 36.7c6.2 6.2 6.2 16.4 0 22.6s-16.4 6.2-22.6 0L352 214.6l-36.7 36.7c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6L329.4 192l-36.7-36.7c-6.2-6.2-6.2-16.4 0-22.6z',
                'viewBox': '0 0 512 512'
            }
        }

        const iconHander = (icons[option].icon)
        const viewBoxHandler = (icons[option].viewBox)

        // if(option){
        //     console.log(option)
        //     // console.log(icons[option].viewBox)

        //     console.log(iconHander)
        //     setIcon((prev) => iconHander)
        //     setviewBox((prev) => viewBoxHandler)
        // }

        return { iconHander, viewBoxHandler }

    }


    const clearTicket = () => {
        setname(user.name)
        setuserId(user.id)
        setdepartment(user.department)
        setphone(user.phone)
        setrequestType('')
        setdescription('')
        setpriority('Normal')
    }

    const typeHandler = (option) => {


        var options = {
            "Consumible": "Material gastable como toners, tinta o papel.",
            "Problemas de acceso": "Usuario no pueden acceder a sistemas o aplicaciones.",
            "Problemas de contraseñas": "Solicitudes de restablecimiento de contraseñas o problemas para cambiarlas.",
            "Problemas con software": "Errores, bloqueos o problemas de funcionamiento con aplicaciones específicas.",
            "Problemas con hardware": "Problemas con computadoras, impresoras u otros dispositivos.",
            "Problemas de red": "Conexiones a internet lentas o intermitentes, problemas de conectividad.",
            "Solicitud de software o hardware adicionales": "Solicitudes para obtener nuevos equipos o aplicaciones.",
            "Capacitación y asistencia": "Solicitudes de formación o ayuda para utilizar sistemas o software.",
            "Seguridad informática": "Informes de incidentes de seguridad, sospecha de virus o malware.",
            "Actualizaciones de software": "Solicitudes para actualizar o instalar nuevas versiones de software.",
            "Mantenimiento y reparación": "Solicitudes de mantenimiento preventivo o reparación de equipos.",
            "Problemas de impresión": "Problemas con la impresión de documentos.",
            "Configuración de correo electrónico": "Ayuda con la configuración de cuentas de correo electrónico.",
            "Problemas de telefonía": "Problemas con teléfonos y sistemas de comunicación.",
            "Solicitudes de permisos de acceso": "Solicitud de acceso a sistemas o datos específicos.",
            "Consultas generales": "Preguntas y solicitudes de información relacionadas con Tecnologias de la Informacion y Comunicacion(TIC).",
        }

        setrequestType(option)
        setdescription(options[option])

    }

    useEffect(() => {
        console.log(icon)
    }, [icon]);


    return (
        <div className='w-full mr-4 mt-4'>
            {/* <div
                className="w-full h-14 pt-2 text-center bg-gray-700  shadow overflow-hidden sm:rounded-md font-bold text-3xl text-white">
                Ticket Form

            </div> */}

            <section className="text-gray-600 body-font  m-0 p-0 relative">

                <div className="container    mx-auto">
                    <div className="flex flex-col text-center w-full mb-1">

                    </div>

                    <div className="mt-10 md:mt-0 md:col-span-2">
                        <div>
                            <div className="shadow overflow-hidden sm:rounded-md">
                                <div className="px-2 py-8 bg-white sm:p-6">
                                    <div className="grid grid-cols-6 gap-6">

                                        <div className="col-span-6 sm:col-span-3">
                                            <div className="relative w-full mb-3">
                                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">Nombre del Solicitante</label>
                                                <input value={name} type="email" readOnly onChange={(e) => setname(e.target.value)} className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="John Doe" />
                                            </div>
                                        </div>


                                        <div className="col-span-6 sm:col-span-3">
                                            <div className="relative w-full mb-3">
                                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">ID de Empleado</label>
                                                <input value={userId} type="text" readOnly onChange={(e) => setuserId(e.target.value)} className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="0101" />
                                            </div>
                                        </div>
                                        <div className="col-span-6 sm:col-span-3">
                                            <div className="relative w-full mb-3">
                                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">Departamento o Area</label>
                                                <input value={department} type="email" readOnly onChange={(e) => setdepartment(e.target.value)} className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="Pediatria" />
                                            </div>
                                        </div>






                                        {/* <div className="col-span-6 sm:col-span-3">
                                            <div className="relative w-full mb-3">
                                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">Numero de Contacto</label>
                                                <input type="email" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="809-544-0000" />
                                            </div>
                                        </div> */}

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="country" className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                                                Tipo de Solicitud</label>
                                            <select
                                                id="country"
                                                name="country"
                                                value={requestType}
                                                autoComplete="country"
                                                onChange={(e) => typeHandler(e.target.value)}
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            >
                                                <option>{"Consumible"}</option>
                                                <option>{"Problemas de acceso"}</option>
                                                <option>{"Problemas de contraseñas"}</option>
                                                <option>{"Problemas con software"}</option>
                                                <option>{"Problemas con hardware"}</option>
                                                <option>{"Problemas de red"}</option>
                                                <option>{"Solicitud de software o hardware adicionales"}</option>
                                                <option>{"Capacitación y asistencia"}</option>
                                                <option>{"Seguridad informática"}</option>
                                                <option>{"Actualizaciones de software"}</option>
                                                <option>{"Mantenimiento y reparación"}</option>
                                                <option>{"Problemas de impresión"}</option>
                                                <option>{"Configuración de correo electrónico"}</option>
                                                <option>{"Problemas de telefonía"}</option>
                                                <option>{"Solicitudes de permisos de acceso"}</option>
                                                <option>{"Consultas generales"}</option>
                                            </select>
                                        </div>
                                        {/* <div className="col-span-6 sm:col-span-3">

                                        </div> */}

                                        <div className="col-span-6 sm:col-span-3">
                                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">Descripcion</label>
                                            <div className="mb-6 mt-5">
                                                <textarea
                                                    value={description}
                                                    rows="11"
                                                    onChange={(e) => { setdescription(e.target.value) }}
                                                    placeholder="..."
                                                    className="w-full shadow rounded py-3 px-[14px] text-body-color text-base border border-[f0f0f0] resize-none outline-none focus-visible:shadow-none focus:border-primary">
                                                </textarea>
                                            </div>
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">

                                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">Prioridad</label>
                                            <div className={`bg-white divide-y w-full divide-gray-100 rounded-lg  shadow-lg dark:divide-gray-600`}>
                                                <ul className="p-3 space-y-1 text-sm text- dark:text-gray-200">
                                                    <li>
                                                        <div className={`flex p-2 rounded ${priority == 'No Urgente' ? 'bg-[#547fff]' : ''} hover:bg-[#b7b8ff]`}>
                                                            <div className="flex items-center h-5">
                                                                <input id="helper-radio-4" onChange={() => setpriority('No Urgente')} checked={priority == 'No Urgente' ? true : false} name="helper-radio" type="radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                            </div>
                                                            <div className="ml-2 text-sm">
                                                                <label htmlFor="helper-radio-4" className="font-medium text-gray-900 ">
                                                                    <div>No Urgente</div>
                                                                    <p id="helper-radio-text-4" className="text-xs font-normal text-gray-500">2-4 horas</p>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className={`flex p-2 rounded ${priority == 'Normal' ? 'bg-[#51dc5a]' : ''} hover:bg-[#b7ffc8] `}>
                                                            <div className="flex items-center h-5">
                                                                <input id="helper-radio-5" onChange={() => setpriority('Normal')} checked={priority == 'Normal' ? true : false} name="helper-radio" type="radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                            </div>
                                                            <div className="ml-2 text-sm">
                                                                <label htmlFor="helper-radio-5" className="font-medium text-gray-900">
                                                                    <div>Normal</div>
                                                                    <p id="helper-radio-text-5" className="text-xs font-normal text-gray-500">60 minutos a 2 horas</p>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className={`flex p-2 rounded ${priority == 'Urgente' ? 'bg-[#d5dc51]' : ''} hover:bg-[#f5ffb7]`}>
                                                            <div className="flex items-center h-5">
                                                                <input id="helper-radio-6" onChange={() => setpriority('Urgente')} checked={priority == 'Urgente' ? true : false} name="helper-radio" type="radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                            </div>
                                                            <div className="ml-2 text-sm">
                                                                <label htmlFor="helper-radio-6" className="font-medium text-gray-900">
                                                                    <div>Urgente</div>
                                                                    <p id="helper-radio-text-6" className="text-xs font-normal text-gray-500">15 minutos a 60 minutos</p>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className={`flex p-2 rounded ${priority == 'Muy Urgente' ? 'bg-[#dc9751]' : ''} hover:bg-[#ffdfb7] `}>
                                                            <div className="flex items-center h-5">
                                                                <input id="helper-radio-7" onChange={() => setpriority('Muy Urgente')} checked={priority == 'Muy Urgente' ? true : false} name="helper-radio" type="radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                            </div>
                                                            <div className="ml-2 text-sm">
                                                                <label htmlFor="helper-radio-7" className="font-medium text-gray-900">
                                                                    <div>Muy Urgente</div>
                                                                    <p id="helper-radio-text-7" className="text-xs font-normal text-gray-500">10 minutos a 15 minutos</p>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className={`flex p-2 rounded ${priority == 'Riesgo Inmediato' ? 'bg-[#dc5d51]' : ''} hover:bg-[#ffb7b7]`}>
                                                            <div className="flex items-center h-5">
                                                                <input id="helper-radio-8" onChange={() => setpriority('Riesgo Inmediato')} checked={priority == 'Riesgo Inmediato' ? true : false} name="helper-radio" type="radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                            </div>
                                                            <div className="ml-2 text-sm">
                                                                <label htmlFor="helper-radio-8" className="font-medium text-gray-900">
                                                                    <div>Riesgo Vital Inmediato</div>
                                                                    <p id="helper-radio-text-8" className="text-xs font-normal text-gray-500">Atencion de Forma Inmediata</p>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-6 sm:col-span-3 w-full">
                                        <div className=" flex px-4 py-3 bg-white text-right sm:px-6 justify-between">
                                            <button onClick={clearTicket} className="mr-4 inline-flex justify-center w-24 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md ring-gray-500 ring-offset-4  text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2  focus:ring-indigo-500">
                                                New
                                            </button>
                                            <button onClick={submitTicket}
                                                className="inline-flex justify-center w-24 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md  ring-indigo-500 ring-offset-4 bg-indigo-600 hover:bg-indigo-700 text-white focus:outline-none focus:ring-2  focus:ring-indigo-500">
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                </div>
            </section >
        </div>
    )
}

export default Reports