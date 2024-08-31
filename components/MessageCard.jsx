'use client';
import { useState } from "react";
import { toast } from "react-toastify";
import markMessageasRead from "@/app/actions/markMessageasRead";

const MessageCard = ( {message} ) => {

    const [read, setRead] = useState(message.read);

    const handleReadClick = async () => {
        const read = await markMessageasRead(message._id);
        setRead(read);
        toast.success(`Marked as ${read ? "unread" : "read"}.`);
    };

    return (
    <div className="relative bg-white p-6 rounded-lg shadow-md border border-gray-200">
        { !read && (
            <div className="absolute top-2 right-2 bg-yellow-500 text-white font-bold px-2 py-1 rounded-md"> New </div>
        )}
        <h2 className="text-xl font-bold mb-4">
            <span className="font-bold">Property Inquiry: </span> {' '}
            {message.property.name}
        </h2>

        <p className="text-gray-700 mb-4">
            <span className="font-bold">Sender: </span> {message.sender.username}
        </p>
        <p className="text-gray-700 mb-4">
            <span className="font-bold">Message: </span> {message.body}
        </p>

        <p className="text-gray-700 mb-4">
            <span className="font-bold">Date: </span> {new Date(message.createdAt).toLocaleString()}
        </p>
        <ul>
            <li>
                <strong>Reply Email:</strong> {' '}
                <a href={`mailto:${message.email}`} className="text-blue-500">
                    {message.email}
                </a>
            </li>
            <li>
                <strong>Reply Phone:</strong> {' '}
                <a href={`tel:${message.phone}`} className="text-blue-500">
                    {message.phone}
                </a>
            </li>
        </ul>
        <button className="mt-4 mr-3 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
        onClick={ handleReadClick }>
           {!read ? 'Mark as Read' : 'Mark as Unread'}
        </button>
        <button className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full">
            Delete
        </button>

        </div>
     );
}

export default MessageCard;