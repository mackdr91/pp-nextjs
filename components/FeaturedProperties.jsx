import connectdb from "@/config/database";
import Property from "@/models/Property";
import FeaturedPropCard from "./FeaturedPropCard";

const FeaturedProperties = async () => {
    await connectdb();

    const properties = await Property.find({
        is_featured: true,
    }).lean();

    return properties.length > 0 ? (
        <section className="bg-blue-50 py-4 pt-6 px-4 pb-10">
            <div className="container-xl lg:container m-auto">
                <h2 className="text-3xl text-blue-500 font-bold mb-6 text-center">Featured Properties</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {properties.map((property) => (
                        <FeaturedPropCard key={property._id} property={property} />
                    ))}
                </div>
            </div>
        </section>
    ) : null;
}

export default FeaturedProperties;