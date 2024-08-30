"use server";
import connectdb from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";



async function addMessage( previousState, formData ) {

    await connectdb();
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userID) {
        throw new Error("You must be logged in to add a property.");
    }

    const { userID } = sessionUser;


    const recipient = formData.get("recipient");

    if (userID === recipient){
        throw new Error("You cannot send a message to yourself.");
    }

    const newMessge = new Message({
        sender: userID,
        receiver: recipient,
        property: formData.get("property"),
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        body: formData.get("message"),
    });

    await newMessge.save();

    return { submitted: true };

}
export default addMessage