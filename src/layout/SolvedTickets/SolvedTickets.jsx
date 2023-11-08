import { useEffect, useState, useContext } from 'react'
import Cards from './Cards'
import { getFirestore, collection, getDocs } from 'firebase/firestore'

import { ContextVariable } from '../../Context'

import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Ticket from './Ticket';

import Reports from '../Reports/Reports';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'full',
    bgcolor: 'background.paper',
    boxShadow: 24,
}

function SolvedTickets() {

    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const [open2, setOpen2] = React.useState(false)
    const handleOpen2 = () => setOpen2(true)
    const handleClose2 = () => setOpen2(false)

    const handleOpenTicket = (cardTicket) => {

        handleOpen()
        // setticket({cardEvent})
        setticket(cardTicket)

        // console.log({cardEvent})
        console.log(cardTicket)
    }

    const [ticket, setticket] = useState(null);
    const [tickets, settickets] = useState([])
    const [search, setsearch] = useState('')

    const data = tickets.filter((ticket) => ticket.department.replace(/\s+/g, '').toLowerCase().includes(search.replace(/\s+/g, '').toLowerCase()))

    const { setalert } = useContext(ContextVariable)

    const db = getFirestore()

 

    const getTickets = async () => {

        try {
            
            const docRef = collection(db, "Tickets");
            const docSnap = await getDocs(docRef);

            var FirebaseTickets = []

            docSnap.forEach((ticket) => {

                if (ticket.data().isSolved) {

                    FirebaseTickets.push({ ...ticket.data(), 'id': ticket.id })
                }

            })

            settickets(FirebaseTickets)
            console.log(FirebaseTickets)

            setalert({
                ...alert,
                open: true,
                message: `Tickets Loaded`,
                severity: 'success'
            });

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
        getTickets()
    }, []);

    return (
        <div className="bg-white p-8 rounded-md container relative mx-auto">
            <Modal
                open={open2}
                onClose={handleClose2}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div>
                        <Reports onClose={handleClose2}/>
                    </div>
                </Box>
            </Modal>
            <div className=" flex items-center justify-between pb-6">
                <div>
                    <h1 className="hidden md:block font-bold text-sm md:text-xl text-center">
                        Tickets<span className="text-teal-600">.</span>
                    </h1>
                    <span className="text-xs">All Tickets Solved</span>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex bg-gray-50 items-center p-2 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fillRule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clipRule="evenodd" />
                        </svg>
                        <input className="bg-gray-50 outline-none ml-1 block " value={search} type="text" onChange={(e) => setsearch(e.target.value)} name="" id="" placeholder="department search..." />
                    </div>
                    <div className="lg:ml-40 ml-10 space-x-8">
                        {/* <button className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">New Report</button> */}
                        <button onClick={handleOpen2} className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">Create</button>
                    </div>
                </div>
            </div>
            <div>
                <div className="flex flex-col justify-center items-center pt-4">
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>

                            <Ticket ticket={ticket} />

                        </Box>
                    </Modal>
                    {/* <div className='text-[2rem] font-bold'>All Tickets</div> */}
                    <div className=" container mx-auto  mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
                        <Cards data={data} handleOpenModal={handleOpenTicket} />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default SolvedTickets