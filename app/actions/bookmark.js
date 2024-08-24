"use server";
import connectdb from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function bookmark(propertyID) {
  await connectdb();
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userID) {
    throw new Error("You must be logged in to bookmark a property.");
  }

  const { userID } = sessionUser;
  const user = await User.findById(userID);

  let isBookmarked = user.bookmarks.includes(propertyID);

  let message = "";
  if (isBookmarked) {
    user.bookmarks.pull(propertyID);
    message = "Property removed from bookmarks";
    isBookmarked = false;
  } else {
    user.bookmarks.push(propertyID);
    message = "Property added to bookmarks";
    isBookmarked = true;
  }
  await user.save();

  revalidatePath("/properties/saved", "page");

  return { message, isBookmarked };
}
export default bookmark;
