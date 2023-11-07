import React from 'react'

function Cards({ data }) {

    return (


        
        <>
            {
                data.map((card) => (
                    <div key={card.icon} className='flex flex-grow !flex-row border-0 px-3 py-3  bg-white rounded text-sm shadow hover:shadow-lg hover:cursor-pointer focus:outline-none focus:ring w-full ease-linear transition-all duration-150'>
                        <div className="flex h-[90px] w-auto flex-row items-center">
                            <div className="rounded-full p-3 bg-[rgb(244,247,254)]">
                                <span className="flex items-center text-[rgb(66,42,251)]">
                                    <svg
                                        stroke="currentColor"
                                        fill="currentColor"
                                        strokeWidth="0"
                                        viewBox={card.viewBox}
                                        className="h-7 w-7"
                                        height="1em"
                                        width="1em"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        {/* <path fill="none" d="M0 0h24v24H0z"></path> */}
                                        <path d={card.icon}></path>
                                    </svg>
                                </span>
                            </div>
                        </div>
                        <div className="h-50 ml-4 flex w-auto flex-col justify-center break-all ">
                            <div className='flex flex-row justify-between'>
                                <p className="font-['DM sans'] text-sm font-medium text-[rgb(163,174,208)]">{card.name}</p>
                                <p className="font-['DM sans'] text-sm font-bold text-[rgb(163,174,208)]">{card.priority}</p>
                            </div>
                            <h4 className="text-xl font-bold text-[rgb(27,37,75)]">{card.department}</h4>
                            <div>{card.description}</div>
                        </div>
                    </div>
                ))
            }
        </>


    )
}

export default Cards