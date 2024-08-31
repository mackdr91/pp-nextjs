'use client';
import { useState } from "react";
import { toast } from "react-toastify";
import markMessageasRead from "@/app/actions/markMessageasRead";
import deleteMessage from "@/app/actions/deleteMessage";
import {useGlobalContext} from "@/context/GlobalContext";

const MessageCard = ( {message} ) => {

    const [isRead, setRead] = useState(message.read);
    const [isDeleted, setIsDeleted] = useState(false);

    const { setUnreadCount } = useGlobalContext();

    const handleReadClick = async () => {
        const read = await markMessageasRead(message._id);
        setRead(read);
        setUnreadCount((prevCount) => (read ? prevCount - 1 : prevCount + 1));
        toast.success(`Marked As ${read ? "unread" : "read"}.`);
    };

    const handleDeleteClick = async () => {
        await deleteMessage(message._id);
        setIsDeleted(true);
        setUnreadCount((prevCount) => ( isRead ? prevCount : prevCount - 1));
        toast.success("Message deleted.");
    };

    if (isDeleted) return <p>Message deleted.</p>;

    return (
    <div className="relative bg-white p-6 rounded-lg shadow-md border border-gray-200">
        { !isRead && (
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
           {!isRead ? 'Mark As Read' : 'Mark As Unread'}
        </button>
        <button
        onClick={handleDeleteClick}
        className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full">
            Delete
        </button>

        </div>
     );
}

export default MessageCard;