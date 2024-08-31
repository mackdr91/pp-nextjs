"use server";
import connectdb from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";



async function getUnreadMessageCount() {
    await connectdb();
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userID) {
        throw new Error("You must be logged in to check bookmark status.");
    }

    const { userID } = sessionUser;

    const count = await Message.countDocuments({ receiver: userID, read: false });
    return {count}

}

export default getUnreadMessageCount