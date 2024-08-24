'use server';
import connectdb from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


async function updateProperty(propertyId, formData) {
    await connectdb();
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userID) {
        throw new Error("You must be logged in to add a property.");
    }

    const { userID } = sessionUser;


    // Check if the property exists
    const existingProperty = await Property.findById(propertyId);
    if (!existingProperty) {
        throw new Error("Property not found");
    }

    // Check if the user is the owner
    if (existingProperty.owner.toString() !== userID) {
        throw new Error("You do not have permission to update this property");
    }

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
        amenities: formData.getAll("amenities"),
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
    };
    const updatedProperty = await Property.findByIdAndUpdate(propertyId, propertyData, { new: true });
    revalidatePath('/', 'layout');
    redirect(`/properties/${updatedProperty._id}`);
}

export default updateProperty