import React from 'react'

const Loader = () => {
    return (
        <div className="flex justify-center items-center">
            <div className="three col flex gap-2 justify-start items-center flex-row-reverse">
                <div className="loader" id="loader-2">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <h1 className="text-[24px] font-bold">Loading...</h1>
            </div>
        </div>
    )
}

export default Loader
