import connectdb from "@/config/database";
import Property from "@/models/Property";
import { convertToSerializedObject } from "@/utils/convertToObject";
import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";
import PropertySearchForm from "@/components/PropertySearchForm";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const SearchResults = async ({ searchParams: { location, propertyType } }) => {
  await connectdb();
  const locationPattern = new RegExp(location, "i");

  let query = {
    $or: [
      { name: locationPattern },
      { description: locationPattern },
      { "location.street": locationPattern },
      { "location.city": locationPattern },
      { "location.state": locationPattern },
      { "location.zipcode": locationPattern },
    ],
  };

  if (propertyType && propertyType !== "All") {
    const typePattern = new RegExp(propertyType, "i");
    query.type = typePattern;
  }

  const propertiesQueryResult = await Property.find(query).lean();
  const properties = await convertToSerializedObject(propertiesQueryResult);

  return(
  <>
    <section className="bg-blue-700 py-4">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
        <PropertySearchForm />
      </div>
    </section>

    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="container-xl lg:container m-auto px-4 py-6">
        <Link href="/properties" className="flex items-center text-blue-500 hover:text-blue-700
          transition duration-150 ease-in-out">
          <FaArrowAltCircleLeft className="mr-2" /> Back to Properties
        </Link>
        <h1 className="text-2xl font-bold mb-6">Search Results</h1>
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
  </>)
};

export default SearchResults;
