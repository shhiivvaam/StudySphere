import { useState } from "react";
import PropTypes from "prop-types";

function AccordionItem({ week, topic, content }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b p-4 flex flex-col justify-center transition-all duration-300">
            <button
                className="flex justify-between items-center w-full p-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-md shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="font-semibold">
                    Week {week}: {topic}
                </span>
                <span className="transform transition-transform duration-300">
                    {isOpen ? "▲" : "▼"}
                </span>
            </button>
            {isOpen && (
                <div className="mt-4 p-4 bg-gray-100 rounded-md shadow-inner">
                    <p>{content}</p>
                </div>
            )}
        </div>
    );
}

AccordionItem.propTypes = {
    week: PropTypes.number.isRequired,
    topic: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
};

export default AccordionItem;
