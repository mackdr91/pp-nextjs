"use server";
import connectdb from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";


async function markMessageasRead(messageID) {
    await connectdb();
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userID) {
        throw new Error("You must be logged in to check bookmark status.");
    }

    const { userID } = sessionUser;

    const message = await Message.findById( messageID );

    if (!message) {
        throw new Error("Message not found.");
    }

    //Verify that the user is the sender of the message
    if (message.receiver.toString() !== userID) {
        throw new Error("You are not authorized to mark this message as read.");
    }
    message.read = !message.read;

    revalidatePath("/messages","page");


    await message.save();

    return message.read;



}

export default markMessageasRead