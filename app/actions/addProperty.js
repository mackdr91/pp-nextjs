"use server";
import connectdb from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { redirect, RedirectType } from "next/navigation";
import cloudinary from "@/config/cloudinary";

async function addProperty( formData ) {

    await connectdb();
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userID) {
        throw new Error("You must be logged in to add a property.");
    }

    const { userID } = sessionUser;

    // Access all amenities values and images
    const amenities = formData.getAll("amenities");
    const images = formData
        .getAll("images")
        .filter((image) => image !== "")



    const propertyData = {
        type: formData.get("type"),
        name: formData.get("name"),
        description: formData.get("description"),
        location: {
            street: formData.get("location.street"),
            city: formData.get("location.city"),
            state: formData.get("location.state"),
            zipcode: formData.get("location.zipcode"),
        },
        beds: formData.get("beds"),
        baths: formData.get("baths"),
        square_feet: formData.get("square_feet"),
        amenities,
        rates: {
            nightly: formData.get("rates.nightly"),
            weekly: formData.get("rates.weekly"),
            monthly: formData.get("rates.monthly"),
        },
        seller_info: {
            name: formData.get("seller_info.name"),
            email: formData.get("seller_info.email"),
            phone: formData.get("seller_info.phone"),
        },

        owner: userID

    };

    const imageUrls = [];

    for (const imageFile of images) {
        const imageBuffer = await imageFile.arrayBuffer();
        const imageArray = Array.from(new Uint8Array(imageBuffer));
        const imageData = Buffer.from(imageArray);

        const imageBase64 = imageData.toString("base64");
        const result = await cloudinary.uploader.upload(`data:image/jpeg;base64,${imageBase64}`, {
            folder: 'propertypulse'

        })
        imageUrls.push(result.secure_url);
    }

    propertyData.images = imageUrls;

    const newProperty = new Property(propertyData);
    await newProperty.save();

    revalidatePath('/', 'layout');
    redirect(`/properties/${newProperty._id}`, RedirectType.push);

}
export default addProperty