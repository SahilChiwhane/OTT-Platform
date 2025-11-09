import React from "react";

const Loader = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <p className="text-white text-xl animate-pulse">Loading...</p>
        </div>
    );
};

export default Loader;