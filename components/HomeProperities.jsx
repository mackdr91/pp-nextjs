import connectdb from "@/config/database";
import Property from "@/models/Property";
import PropertyCard from "./PropertyCard";
import Link from "next/link";

const HomeProperties = async() => {

  await connectdb();
  const properties = await Property.find({}).lean();
    const recentProperties = await Property.find({}).sort({createdAt: -1}).limit(3).lean();
    return (
        <>
        <section className="px-4 py-6">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-6">Recent Properties</h2>
          {properties.length === 0 ? (
            <p>No properties found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-6">
              {recentProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="m-auto max-w-lg my-10 px-6">
        <Link
          href="/properties"
          className="bg-black hover:bg-blue-700 text-white text-center py-4 px-6 font-bold rounded-xl "
        >
          View all properties
        </Link>
      </section>
      </>
    );
}

export default HomeProperties;