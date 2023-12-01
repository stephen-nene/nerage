import React from "react";
import { useNavigate } from "react-router-dom";


export default function CommingSoon() {
    const darkMode = true

    const navigate = useNavigate();

    return (
        <>
        <div
            className={`flex justify-center items-center min-h-screen ${darkMode ? "bg-black" : "bg-white"
                }`}
        >
            <div
                className={`w-11/12 sm:w-8/12 md:w-6/12 lg:w-4/12 rounded-lg shadow-lg p-6 text-center ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
                    }`}
            >
                <img
                    src="https://bitly.com/static/graphics/meditation.png"
                    alt="Not Found"
                    className="w-32 h-32 mx-auto mb-4"
                />
                <h1 className="text-4xl font-semibold mb-4"> Page Comming-Soon</h1>
                <p className="text-lg mb-6">
                    The page you're looking foris in test mode.
                </p>
                <button
                    className={`bg-gradient-to-r from-rose-900 to-rose-500 hover:from-rose-600 hover:to-rose-700 text-white py-2 px-4 rounded-lg transition-colors duration-300 ease-in-out ${darkMode
                            ? "hover:from-gray-700 hover:to-gray-900"
                            : "hover:from-rose-600 hover:to-rose-700"
                        }`}
                    onClick={() => navigate("/")}
                >
                    Go back to Home
                </button>
            </div>
        </div>
        </>
    );
}
