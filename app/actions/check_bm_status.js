"use server";
import connectdb from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";


async function checkBookmarkStatus(propertyID) {
    await connectdb();
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userID) {
        throw new Error("You must be logged in to check bookmark status.");
    }

    const { userID } = sessionUser;
    const user = await User.findById(userID);

    let isBookmarked = user.bookmarks.includes(propertyID);
    return {isBookmarked};

}

export default checkBookmarkStatus