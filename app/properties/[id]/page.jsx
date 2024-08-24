import connectdb from "@/config/database";
import Property from "@/models/Property";
import PropertyDetails from "@/components/PropertyDetail";
import ProprtyHeader from "@/components/PropertyHeader";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import PropertiesImages from "@/components/PropertiesImages";
import { convertToSerializedObject } from "@/utils/convertToObject";
import BookmarkButton from "@/components/BookmarkButton";
import ShareButtons from "@/components/ShareButtons";
import PropertyContactForm from "@/components/PropertyContactForm";

const PropertiesPage = async ({ params }) => {
    await connectdb();
    const propertyDoc = await Property.findById(params.id).lean();
    const property = convertToSerializedObject(propertyDoc);
    if (!property) {
        <h1 className="text-3xl font-bold text-center mt-10">
          Property not found
        </h1>;
    }
    return (
        <>

        <ProprtyHeader image={property.images[0]} />
        <section>
      <div className="container m-auto py-6 px-6">
        <Link
          href="/properties"
          className="text-blue-500 hover:text-blue-600 flex items-center"
        >
         <FaArrowLeft className="mr-2" /> Back to Properties
        </Link>
      </div>
    </section>
    <section className="bg-blue-50">
      <div className="container m-auto py-10 px-6">
        <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
        <PropertyDetails property={property} />
        <aside className="space-y-4">


        </aside>
        </div>
      </div>
    </section>
    <PropertiesImages images={property.images} />

        </>
    );
}

export default PropertiesPage;