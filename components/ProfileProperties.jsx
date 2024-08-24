'use client'
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import deleteProperty from '@/app/actions/deleteProperty';
import { toast } from 'react-toastify';

const ProfileProperties = ({ properties }) => {

    const [propertiesList, setPropertiesList] = useState(properties);

    const handleDeleteProperty = async (propertyId) => {
        const result = window.confirm("Are you sure you want to delete this property?");
        if (!result) return;
        await deleteProperty(propertyId);
        const newPropertiesList = propertiesList.filter((property) => property._id !== propertyId);
        setPropertiesList(newPropertiesList);

        toast.success("Property deleted successfully");
    };

    return (
        propertiesList.map(( property ) => (
            <div key={properties._id} className="mb-10">
                  <Link href={`/properties/${property._id}`}>

                    <Image
                      className="h-32 w-full rounded-md object-cover"
                      src={ property.images[0] }
                      width={1000}
                      height={600}
                      alt="Property 1"
                    />
                  </Link>
                  <div className="mt-2">
                    <p className="text-lg font-semibold">{ property.name }</p>
                    <p className="text-gray-600">{ property.location.city} { property.location.state} { property.location.zipcode}</p>
                  </div>
                  <div className="mt-2">
                    <Link
                      href={`/properties/${property._id}/edit`}
                      className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
                    >
                      Edit
                    </Link>
                    <button
                      className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                      type="button"
                      onClick={() => handleDeleteProperty(property._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>

        ))
     );
}

export default ProfileProperties;