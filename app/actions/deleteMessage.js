'use server'
import connectdb from "@/config/database";
import { revalidatePath } from "next/cache";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";


async function deleteMessage(messageId) {
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userID) {
        throw new Error("You must be logged in to delete a property.");
    }

    const {userID} = sessionUser;


    const message = await Message.findById(messageId);
    if (message.receiver.toString() !== userID) {
        throw new Error("You are not the owner of this property.");
    }

    await message.deleteOne();

    revalidatePath("/", "layout");


}

export default deleteMessage;

