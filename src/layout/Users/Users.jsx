import { useEffect, useState } from "react";
import { collection, getDocs, getFirestore } from "firebase/firestore"


import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import SignIn from "../SignIn/Signin";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'full',
    bgcolor: 'background.paper',
    boxShadow: 24,
    // p: 4,
};

function Users() {

    const [users, setusers] = useState([])
    const [search, setsearch] = useState('')

    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const db = getFirestore()

    const data = users.filter((user) => user.name.replace(/\s+/g, '').toLowerCase().includes(search.replace(/\s+/g, '').toLowerCase()))


    const getUser = async () => {

        console.log('getUser function')
        const docRef = collection(db, "Users");
        const docSnap = await getDocs(docRef);

        var FirebaseUsers = []

        docSnap.forEach((user) => {
            FirebaseUsers.push({ ...user.data(), 'id': user.id })
            // setusers((prev) => [...prev, user.data()])
        })

        setusers(FirebaseUsers)
        console.log(FirebaseUsers)

    }

    const getDate = (seconds) => {
        var date = new Date()
        date.setTime(seconds * 1000)
        return date.toDateString()
    }

    useEffect(() => {
        console.log(users)

    }, [users]);

    // getUser()
    useEffect(() => {
        getUser()
        console.log('use effect')
    }, []);

    return (
        <div className="bg-white p-8 rounded-md container relative mx-auto">
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div>
                        <SignIn />
                    </div>
                </Box>
            </Modal>
            <div className=" flex items-center justify-between pb-6">
                <div>
                    <h1 className="hidden md:block font-bold text-sm md:text-xl text-center">
                        Users<span className="text-teal-600">.</span>
                    </h1>
                    <span className="text-xs">All Users List</span>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex bg-gray-50 items-center p-2 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fillRule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clipRule="evenodd" />
                        </svg>
                        <input className="bg-gray-50 outline-none ml-1 block " value={search} type="text" onChange={(e) => setsearch(e.target.value)} name="" id="" placeholder="search..." />
                    </div>
                    <div className="lg:ml-40 ml-10 space-x-8">
                        {/* <button className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">New Report</button> */}
                        <button onClick={handleOpen} className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">Create</button>
                    </div>
                </div>
            </div>
            <div>
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Role
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Created at
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Tickets Submited
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((user) => (
                                    <tr key={user.id}>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 w-10 h-10">
                                                    <img className="w-full h-full rounded-full"
                                                        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                                                        alt="" />
                                                </div>
                                                <div className="ml-3">
                                                    <p className="text-gray-900 whitespace-no-wrap">
                                                        {user.name}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{user.role}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                {getDate(user.creationDate.seconds)}
                                            </p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <span
                                                className={`relative inline-block px-3 py-1 font-semibold ${user.accountState == 'active' ? 'text-green-900' : user.accountState == 'suspended' ? 'text-orange-900' : 'text-red-900'}  leading-tight`}>
                                                <span aria-hidden
                                                    className={`absolute inset-0 ${user.accountState == 'active' ? 'bg-green-200' : user.accountState == 'suspended' ? 'bg-orange-200' : 'bg-red-200'} opacity-50 rounded-full`}></span>
                                                <span className="relative">{user.accountState}</span>
                                            </span>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                43
                                            </p>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div
                            className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                            <span className="text-xs xs:text-sm text-gray-900">
                                Showing 1 to 4 of 50 Entries
                            </span>
                            <div className="inline-flex mt-2 xs:mt-0">
                                <button
                                    className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l">
                                    Prev
                                </button>
                                &nbsp; &nbsp;
                                <button
                                    className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r">
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Users