import connectdb from "@/config/database";
import PropertyCard from "@/components/PropertyCard";
import Property from "@/models/Property";
import Pagination from "@/components/Pagination";

const PropertiesPage = async ({ searchParams: { page = 1, pageSize = 3 } }) => {
  await connectdb();
  const skip = (page - 1) * pageSize;
  const totalProperties = await Property.countDocuments({});
  const properties = await Property.find({}).skip(skip).limit(pageSize);

  const showPagination = totalProperties > pageSize;

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

        {showPagination && (
        <Pagination
          total={totalProperties}
          pageSize={parseInt(pageSize)}
          page={parseInt(page)}
        />
      )}
      </div>
    </section>
  );
};

export default PropertiesPage;
