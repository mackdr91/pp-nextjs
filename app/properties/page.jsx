import connectdb from "@/config/database";
import PropertyCard from "@/components/PropertyCard";
import Property from "@/models/Property";


const PropertiesPage = async () => {
  await connectdb();
  const properties = await Property.find({}).lean();

  return (
    <section className="px-4 py-6">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-6">Properties</h1>
        {properties.length === 0 ? (
          <p>No properties found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-6">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertiesPage;
