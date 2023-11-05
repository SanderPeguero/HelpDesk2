import { useEffect, useState } from 'react'
import Cards from './Cards'
import { getFirestore, collection, getDocs } from 'firebase/firestore'

function AllTickets() {

    const [tickets, settickets] = useState([])

    const db = getFirestore()

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

    const getTickets = async () => {

        console.log('getUser function')
        const docRef = collection(db, "Tickets");
        const docSnap = await getDocs(docRef);

        var FirebaseTickets = []

        docSnap.forEach((user) => {

            FirebaseTickets.push({ ...user.data(), 'id': user.id, 'icon': 'M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z', 'viewBox': '0 0 512 512' })
            // setusers((prev) => [...prev, user.data()])
        })

        settickets(FirebaseTickets)
        console.log(FirebaseTickets)

    }

    const addIcon = () => {
    }

    useEffect(() => {
        getTickets()
    }, []);

    useEffect(() => {
        getTickets()
    }, []);

    const data = [
        { 'icon': 'M4 9h4v11H4zM16 13h4v7h-4zM10 4h4v16h-4z', 'viewBox': '0 0 24 24', 'name': '', 'amount': '' },
        { 'icon': 'M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z', 'viewBox': '0 0 512 512', 'name': '', 'amount': '' },
        // <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/></svg>
        { 'icon': 'M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z', 'viewBox': '0 0 24 24', 'name': '', 'amount': '' },
        // { 'icon': 'M4 9h4v11H4zM16 13h4v7h-4zM10 4h4v16h-4z', 'name': '', 'amount': '' },
        { 'icon': 'M208 448V320h96v128h97.6V256H464L256 64 48 256h62.4v192z', 'name': '', 'amount': '' },
        { 'icon': 'masd', 'name': '', 'amount': '' },
        { 'icon': 'mawe', 'name': '', 'amount': '' },
        { 'icon': 'mwqe', 'name': '', 'amount': '' },
        { 'icon': 'M372 152a44.34 44.34 0 01-44-44V16H220a60.07 60.07 0 00-60 60v36h42.12A40.81 40.81 0 01231 124.14l109.16 111a41.11 41.11 0 0111.83 29V400h53.05c32.51 0 58.95-26.92 58.95-60V152z', 'name': '', 'amount': '' },
        { 'icon': 'M298.39 248a4 4 0 002.86-6.8l-78.4-79.72a4 4 0 00-6.85 2.81V236a12 12 0 0012 12z', 'name': '', 'amount': '' },
        { 'icon': 'M197 267a43.67 43.67 0 01-13-31v-92h-72a64.19 64.19 0 00-64 64v224a64 64 0 0064 64h144a64 64 0 0064-64V280h-92a43.61 43.61 0 01-31-13zm175-147h70.39a4 4 0 002.86-6.8l-78.4-79.72a4 4 0 00-6.85 2.81V108a12 12 0 0012 12z', 'name': '', 'amount': '' },
    ]

    return (
        <div className="flex flex-col justify-center items-center pt-4">
            <div className='text-[2rem] font-bold'>All Tickets</div>
            <div className=" container mx-auto  mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
                <Cards data={tickets} />
            </div>
        </div>
    )
}

export default AllTickets