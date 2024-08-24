'use server'
import cloudinary from "@/config/cloudinary";
import connectdb from "@/config/database";
import { revalidatePath } from "next/cache";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";

/**
 * Deletes a property with the given id if the user is logged in and is the property's owner.
 * @param {string} propertyId - The id of the property to delete
 * @throws {Error} If the user is not logged in.
 * @throws {Error} If the property is not found.
 * @throws {Error} If the user is not the owner of the property.
 */
async function deleteProperty(propertyId) {
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userID) {
        throw new Error("You must be logged in to delete a property.");
    }

    const {userID} = sessionUser;

    const property = await Property.findById(propertyId);
    if (!property) {
        throw new Error("Property not found.");
    }

    if (property.owner.toString() !== userID) {
        throw new Error("You are not the owner of this property.");
    }
    // Extract public IDs from images
    const publicIds = property.images.map((imageUrl) => {
        const parts = imageUrl.split("/");
        return parts.at(-1).split(".").at(0);
    });

    // Delete images from Cloudinary
    if (publicIds.length > 0) {
        for (let publicId of publicIds) {
            await cloudinary.uploader.destroy('propertypulse/' + publicId);
        }
    }

    await property.deleteOne();

    revalidatePath("/", "layout");


}

export default deleteProperty;

