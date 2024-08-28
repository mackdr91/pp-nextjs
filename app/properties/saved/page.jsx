import connectdb from "@/config/database";
import { getSessionUser } from "@/utils/getSessionUser";
import User from "@/models/User";
import PropertyCard from "@/components/PropertyCard";

const SavedPropertiesPages = async () => {
    const { userID } = await getSessionUser();

    const user = await User.findById(userID).populate("bookmarks");



    return (
    <section className="px-4 py-6">
        <div className="container lg:container m-auto px-4 py-6">

            <h1 className="text-3xl font-bold mb-6">Your Saved Properties</h1>
            {user.bookmarks.length === 0 ? (
                <p>No saved properties.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-6">
                    {user.bookmarks.map((property) => (
                        <PropertyCard key={property._id} property={property} />
                    ))}
                </div>
            )}

        </div>

    </section> );
}

export default SavedPropertiesPages;