import { useContext, useState } from 'react'

import { ContextVariable } from '../../Context'
import { getFirestore, setDoc, doc } from 'firebase/firestore';

function Ticket({ ticket }) {

    const { user, setalert } = useContext(ContextVariable)

    const [id, setid] = useState(ticket.id);
    const [name, setname] = useState(user.name)
    const [userId, setuserId] = useState(user.id)
    const [department, setdepartment] = useState(user.department)
    const [phone, setphone] = useState(user.phone)
    const [requestType, setrequestType] = useState(ticket.requestType)
    const [description, setdescription] = useState(ticket.description)
    const [resolution, setresolution] = useState(ticket.resolution)
    const [priority, setpriority] = useState(ticket.priority)
    const [icon, seticon] = useState(ticket.icon)
    const [viewBox, setviewBox] = useState(ticket.viewBox)
    const [isSolved, setisSolved] = useState(ticket.isSolved)
    const [submitDate, setsubmitDate] = useState(ticket.submitDate)
    const [closeDate, setcloseDate] = useState(ticket.closeDate)
    const [ticketState, setticketState] = useState(ticket.ticketState)

    const db = getFirestore()

    const submitUser = async () => {
        try {
            // const docref = await setDoc(doc(db, "Tickets", id), {
            //     name: name,                          //Nombre completo: El nombre completo del usuario.
            //     userId: userId,
            //     department: department,
            //     phone: phone,                        //Número de teléfono: El número de teléfono del usuario, que puede ser útil para enviar SMS o notificaciones.
            //     requestType: requestType,
            //     description: description,
            //     priority: priority,
            //     submitDate: submitDate,
            //     ticketState: 'solved',
            //     resolution: resolution,
            //     isSolved: true,
            //     closeDate: new Date,
            //     icon: icon,
            //     viewBox: viewBox
            // });

            // console.log("Document written with ID: ", docref);
            // setalert({
            //     ...alert,
            //     open: true,
            //     message: `La cuenta ha sido creada con exito`,
            //     severity: 'success'
            // });
            setalert({
                ...alert,
                open: true,
                message: 'Esta accion no esta permitida',
                severity: 'error'
            });
        } catch (e) {
            console.error("Error adding document: ", e)
            setalert({
                ...alert,
                open: true,
                message: `${e}`,
                severity: 'error'
            });
        }
    }


    const getDate = (seconds) => {
        var date = new Date()
        date.setTime(seconds * 1000)
        return date.toDateString()
    }

    // console.log('Ticket Component: ', ticket)
    return (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 flex flex-col w-[50vw]">
            <div className='flex flex-grow !flex-row border-0  py-3 bg-white rounded text-sm focus:outline-none focus:ring w-full ease-linear transition-all duration-150'>
                <div className="flex w-auto flex-row items-center">
                    <div className="rounded-full p-3 bg-[rgb(244,247,254)]">
                        <span className="flex items-center text-[rgb(66,42,251)]">
                            <svg
                                stroke="currentColor"
                                fill="currentColor"
                                strokeWidth="0"
                                viewBox={viewBox}
                                className="h-7 w-7"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {/* <path fill="none" d="M0 0h24v24H0z"></path> */}
                                <path d={icon}></path>
                            </svg>
                        </span>
                    </div>
                </div>
                <div className="h-50 ml-4 flex w-full flex-col justify-center break-al">
                    <div>
                        <div className='flex flex-row justify-between'>
                            <div>
                                <p className="font-['DM sans'] text-sm font-medium text-black">{name}</p>
                                <p className="font-['DM sans'] text-sm font-bold text-[rgb(163,174,208)]">{userId}</p>
                            </div>
                            <div className=''>
                                <p className="font-['DM sans'] text-sm text-black">{getDate(submitDate.seconds)}</p>
                                <p className="font-['DM sans'] text-sm font-bold text-[rgb(163,174,208)]">{id}</p>
                            </div>
                        </div>
                        <h4 className="text-xl top-[-5rem] font-bold text-[rgb(27,37,75)]">{department}</h4>
                    </div>
                </div>
            </div>
            <div className="-mx-3 md:flex mb-6 mt-4">
                <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-first-name">
                        Priority
                    </label>
                    <p className="text-md font-bold">{priority}</p>
                </div>
                <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-first-name">
                        Solved
                    </label>
                    <p className="text-md font-bold">{!isSolved ? 'FALSE' : 'TRUE'}</p>
                </div>
                <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-first-name">
                        Close Date
                    </label>
                    <p className="text-md font-bold">{closeDate ? getDate(closeDate.seconds) : '...'}</p>
                </div>
                {/* <div className="col-span-6 sm:col-span-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">Descripcion</label>
                    <div className="mb-6">
                        <textarea
                            value={ticket.description}
                            rows="6"
                            // onChange={(e) => { setdescription(e.target.value) }}
                            placeholder="..."
                            className="w-full shadow rounded py-3 px-[14px] text-body-color text-base border border-[f0f0f0] resize-none outline-none focus-visible:shadow-none focus:border-primary">
                        </textarea>
                    </div>
                </div> */}
            </div>
            <div className="-mx-3 md:flex mb-6">
                <div className="md:w-full">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">Type of Request</label>
                    <p className="text-md font-bold">{requestType}</p>
                </div>
                <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-first-name">
                        Ticket State
                    </label>
                    <p className="text-md font-bold">{ticketState}</p>
                </div>
            </div>
            <div className="-mx-3 md:flex">
                <div className="md:w-full">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">Descripcion</label>
                    {/* <p className="text-lg font-bold">{ticket.description}</p> */}
                    <div className="mb-4">
                        <textarea
                            value={description}
                            rows="5"
                            readOnly
                            // onChange={(e) => { setdescription(e.target.value) }}
                            placeholder="..."
                            className="w-full shadow rounded py-3 px-[14px] text-body-color text-base border border-[f0f0f0] resize-none outline-none focus-visible:shadow-none focus:border-primary">
                        </textarea>
                    </div>
                </div>
            </div>
            <div className="-mx-3 md:flex">
                <div className="md:w-full">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">Resolution</label>
                    {/* <p className="text-lg font-bold">{ticket.description}</p> */}
                    <div className="mb-4">
                        <textarea
                            value={resolution ? resolution : undefined}
                            rows="5"
                            readOnly={isSolved ? true : false}
                            onChange={(e) => { setresolution(e.target.value) }}
                            placeholder="..."
                            className="w-full shadow rounded py-3 px-[14px] text-body-color text-base border border-[f0f0f0] resize-none outline-none focus-visible:shadow-none focus:border-primary">
                        </textarea>
                    </div>
                </div>
            </div>
            <div className="-mx-3 md:flex mb-2 justify-between">
                {/* <div className="col-span-6 sm:col-span-3"> */}
                {/* <div className="px-4 py-3 bg-white text-right sm:px-6 justify-end"> */}
                <button
                    onClick={submitUser}
                    className="mr-4 w-[9rem] py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md ring-gray-500 ring-offset-4  text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2  focus:ring-indigo-500">
                    Update Info
                </button>
                <button
                    onClick={submitUser}
                    className="w-[9rem] py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md ring-indigo-500 ring-offset-4 bg-indigo-600 hover:bg-indigo-700 text-white focus:outline-none focus:ring-2  focus:ring-indigo-500">
                    Mark as Solved
                </button>
                {/* </div> */}
                {/* </div> */}
            </div>

        </div>
    )
}

export default Ticket