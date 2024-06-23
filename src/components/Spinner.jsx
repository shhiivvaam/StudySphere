import React from "react";

function Spinner() {
    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            <span className="ml-3 text-gray-900">Loading...</span>
        </div>
    );
}

export default Spinner;
