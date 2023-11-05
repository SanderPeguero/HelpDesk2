import { collection, getFirestore, addDoc } from "firebase/firestore"
import { useEffect, useState, useContext } from "react"

import { ContextVariable } from "../../Context"

function Reports() {

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

    const { user } = useContext(ContextVariable)

    const [name, setname] = useState(user.name)
    const [userId, setuserId] = useState(user.id)
    const [department, setdepartment] = useState('')
    const [phone, setphone] = useState('')
    const [requestType, setrequestType] = useState('')
    const [description, setdescription] = useState('')
    const [priority, setpriority] = useState('Normal')
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
                closeDate: null
            });

            console.log("Document written with ID: ", docref);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    const clearTicket = () => {
        setname(user.name)
        setuserId(user.id)
        setdepartment('')
        setphone('')
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
        // console.log(userId)
    }, [userId]);


    return (
        <div className='w-full mr-4 mt-4'>
            <div
                className="w-full h-14 pt-2 text-center bg-gray-700  shadow overflow-hidden sm:rounded-md font-bold text-3xl text-white">
                Ticket Form

            </div>

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
                                                <input value={name} type="email"readOnly onChange={(e) => setname(e.target.value)} className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="John Doe" />
                                            </div>
                                        </div>


                                        <div className="col-span-6 sm:col-span-3">
                                            <div className="relative w-full mb-3">
                                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">Numero de Empleado</label>
                                                <input value={userId} type="text" readOnly onChange={(e) => setuserId(e.target.value)} className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="0101" />
                                            </div>
                                        </div>
                                        <div className="col-span-6 sm:col-span-3">
                                            <div className="relative w-full mb-3">
                                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">Departamento o Area</label>
                                                <input value={department} type="email" onChange={(e) => setdepartment(e.target.value)} className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="Pediatria" />
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
                                            <div className="mb-6">
                                                <textarea
                                                    value={description}
                                                    rows="6"
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
                                                        <div className={`flex p-2 rounded ${priority == 'Riesgo Vital Inmediato' ? 'bg-[#dc5d51]' : ''} hover:bg-[#ffb7b7]`}>
                                                            <div className="flex items-center h-5">
                                                                <input id="helper-radio-8" onChange={() => setpriority('Riesgo Vital Inmediato')} checked={priority == 'Riesgo Vital Inmediato' ? true : false} name="helper-radio" type="radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
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

                                        <div className="col-span-6 sm:col-span-3">
                                            <div className=" flex px-4 py-3 bg-white text-right sm:px-6">
                                                <button onClick={clearTicket} className="mr-4 inline-flex justify-center w-24 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md ring ring-gray-500 ring-offset-4  text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2  focus:ring-indigo-500">
                                                    New
                                                </button>
                                                <button onClick={submitTicket}
                                                    className="inline-flex justify-center w-24 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md ring  ring-indigo-500 ring-offset-4 bg-indigo-600 hover:bg-indigo-700 text-white focus:outline-none focus:ring-2  focus:ring-indigo-500">
                                                    Save
                                                </button>
                                            </div>
                                        </div>

                                        {/* <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                                No of Vacanices</label>
                                            <select id="country" name="country" autoComplete="country"
                                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                            </select>
                                        </div>
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                                                Age</label>
                                            <input type="text" name="last-name" placeholder="above 18" id="last-name"
                                                autoComplete="family-name"
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                        </div>


                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                                                Job Lavel</label>
                                            <input type="text" name="last-name" id="last-name" placeholder="internee officer"
                                                autoComplete="family-name"
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                        </div>



                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                                Department</label>
                                            <select id="country" name="country" autoComplete="country"
                                                className="mt-3 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                                <option className="mt-2">HR</option>
                                                <option>Canada</option>
                                                <option>Mexico</option>
                                            </select>
                                        </div>
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                                                Section</label>
                                            <input type="text" name="last-name" placeholder="gate managment" id="last-name"
                                                autoComplete="family-name"
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                        </div>



                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                                                Academic Qualification</label>
                                            <input type="text" name="last-name" placeholder="BBA" id="last-name"
                                                autoComplete="family-name"
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                        </div>
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                                                Required experience</label>
                                            <input type="text" name="last-name" placeholder="2 years or above" id="last-name"
                                                autoComplete="family-name"
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                        </div>

                                        <div className="col-span-6 sm:col-span-6">
                                            <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">Email
                                                description</label>
                                            <input type="text" name="email-address"
                                                placeholder="1- 334343434 It should be an editor to fill the job description of around 5 to 10 Lines ."
                                                id="email-address" autoComplete="email"
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                        </div>


                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                                                No. of meetings/interviews</label>
                                            <input type="text" name="last-name" placeholder="3" id="last-name"
                                                autoComplete="family-name"
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                        </div> */}


                                    </div>
                                    {/* <fieldset className="mt-8 ">
                                        <legend className=" text-base  text-1.5xl font-medium text-gray-900">Job Skill</legend>
                                        <div className="mt-2 space-y-4">
                                            <div className="flex place-items-center">
                                                <div className="flex items-center h-5">
                                                    <input id="comments" name="comments" type="checkbox"
                                                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                                                </div>
                                                <div className="ml-3 text-sm">
                                                    <label htmlFor="comments" className="font-regular text-gray-700">Accounting</label>

                                                </div>
                                            </div>
                                            <div className="flex items-start">
                                                <div className="flex items-center h-5">
                                                    <input id="comments" name="comments" type="checkbox"
                                                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                                                </div>
                                                <div className="ml-3 text-sm">
                                                    <label htmlFor="comments" className="font-regular text-gray-700">Bookkeeping</label>

                                                </div>
                                            </div>
                                            <div className="flex items-start">
                                                <div className="flex items-center h-5">
                                                    <input id="comments" name="comments" type="checkbox"
                                                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                                                </div>
                                                <div className="ml-3 text-sm">
                                                    <label htmlFor="comments" className="font-regular text-gray-700">Auditing</label>

                                                </div>
                                            </div>
                                            <div className="flex items-start">
                                                <div className="flex items-center h-5">
                                                    <input id="comments" name="comments" type="checkbox"
                                                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                                                </div>
                                                <div className="ml-3 text-sm">
                                                    <label htmlFor="comments" className="font-regular text-gray-700">written
                                                        communication</label>

                                                </div>
                                            </div>
                                            <div className="flex items-start">
                                                <div className="flex items-center h-5">
                                                    <input id="comments" name="comments" type="checkbox"
                                                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                                                </div>
                                                <div className="ml-3 text-sm">
                                                    <label htmlFor="comments" className="font-regular text-gray-700">Team
                                                        Managment</label>

                                                </div>
                                            </div>
                                            <legend className=" text-base  text-1.5xl font-medium text-gray-900">
                                                Interview/type
                                            </legend>
                                            <div className="mt-2 space-y-4">
                                                <div className="flex items-start">
                                                    <div className="flex items-center h-5">
                                                        <input id="comments" name="comments" type="checkbox"
                                                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                                                    </div>
                                                    <div className="ml-3 text-sm">
                                                        <label htmlFor="comments"
                                                            className="font-mediuregular text-gray-700">Technical</label>

                                                    </div>
                                                </div>
                                                <div className="flex items-start">
                                                    <div className="flex items-center h-5">
                                                        <input id="comments" name="comments" type="checkbox"
                                                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                                                    </div>
                                                    <div className="ml-3 text-sm">
                                                        <label htmlFor="comments" className="font-mediuregular text-gray-700">HR</label>

                                                    </div>
                                                </div>
                                                <div className="flex items-start">
                                                    <div className="flex items-center h-5">
                                                        <input id="comments" name="comments" type="checkbox"
                                                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                                                    </div>
                                                    <div className="ml-3 text-sm">
                                                        <label htmlFor="comments" className="font-mediuregular text-gray-700">Final</label>

                                                    </div>
                                                </div>

                                                <legend className=" text-base  text-1.5xl font-medium text-gray-900">
                                                    Competencies
                                                </legend>
                                                <div className="   space-y-4">
                                                    <div className="flex  items-start">
                                                        <div className="flex items-center h-5">
                                                            <input id="comments" name="comments" type="checkbox"
                                                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                                                        </div>
                                                        <div className=" text-sm">
                                                            <label htmlFor="comments"
                                                                className=" ml-3 font-mediuregular text-gray-700">Analysis</label>

                                                        </div>
                                                    </div>
                                                    <div className="flex items-start">
                                                        <div className="flex items-center h-5">
                                                            <input id="comments" name="comments" type="checkbox"
                                                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                                                        </div>
                                                        <div className="ml-3 text-sm">
                                                            <label htmlFor="comments" className="font-mediuregular text-gray-700">R &
                                                                D</label>

                                                        </div>
                                                    </div>
                                                    <div className="flex items-start">
                                                        <div className="flex items-center h-5">
                                                            <input id="comments" name="comments" type="checkbox"
                                                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                                                        </div>
                                                        <div className="ml-3 text-sm">
                                                            <label htmlFor="comments"
                                                                className="font-mediuregular text-gray-700">Bookkeeping</label>

                                                        </div>
                                                    </div>
                                                    <div className="flex items-start">
                                                        <div className="flex items-center h-5">
                                                            <input id="comments" name="comments" type="checkbox"
                                                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                                                        </div>
                                                        <div className="ml-3 text-sm">
                                                            <label htmlFor="comments" className="font-mediuregular text-gray-700">Quick
                                                                Larner</label>

                                                        </div>
                                                    </div>
                                                    <div className="flex items-start">
                                                        <div className="flex items-center h-5">
                                                            <input id="comments" name="comments" type="checkbox"
                                                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                                                        </div>
                                                        <div className="ml-3 text-sm">
                                                            <label htmlFor="comments" className="font-mediuregular text-gray-700">Team
                                                                Managment</label>

                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </fieldset> */}

                                </div>

                            </div>
                        </div>
                    </div >
                </div>
            </section >

            {/* <div className="hidden sm:block" aria-hidden="true">
                <div className="py-5">
                    <div className=""></div>
                </div>
            </div> */}
        </div>
    )
}

export default Reports