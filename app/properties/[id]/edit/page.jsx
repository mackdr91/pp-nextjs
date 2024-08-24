import EditPropertiesPage from "@/components/PropertyEditForm";
import connectdb from "@/config/database";
import Property from "@/models/Property";
import { convertToSerializedObject } from "@/utils/convertToObject";


const PropertyEdit = async ( { params } ) => {

    await connectdb();
    const propertyDoc = await Property.findById(params.id).lean();
    const property = convertToSerializedObject(propertyDoc);

    if (!property) {
        <h1 className="text-3xl font-bold text-center mt-10">
          Property not found
        </h1>;
    }

    return (
        <section className="bg-blue-50">
            <div className="container m-auto max-w-2xl py-24">
                <div className="bg-white px-6 py-8 rounded-lg shadow-md border m-4 md:m-0">

                    <EditPropertiesPage property={property}/>

                </div>
            </div>
        </section>
    );
}

export default PropertyEdit;