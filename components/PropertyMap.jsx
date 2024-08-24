'use client'; // Ensures this file is treated as a client-side component in Next.js

import { useEffect, useState } from "react"; // Import React hooks for state and lifecycle management
import dynamic from "next/dynamic"; // Import for dynamic loading to avoid SSR issues with Mapbox components
import Image from "next/image"; // Import Next.js's optimized Image component
import pin from "@/assets/images/pin.svg"; // Import the pin image used for the map marker
import { setDefaults, fromAddress } from "react-geocode"; // Import functions from react-geocode for geocoding addresses
import Spinner from "./Spinner"; // Import a Spinner component to show loading state
import 'mapbox-gl/dist/mapbox-gl.css';

// Dynamically import Map and Marker components from react-map-gl
// This prevents issues when rendering the map on the server side (Next.js SSR)
const Map = dynamic(() => import("react-map-gl").then((mod) => mod.Map), { ssr: false });
const Marker = dynamic(() => import("react-map-gl").then((mod) => mod.Marker), { ssr: false });

const PropertyMap = ({ property }) => {
  // State variables to hold the latitude and longitude of the property
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  // State variables to manage the loading state and handle geocoding errors
  const [loading, setLoading] = useState(true);
  const [geoCodeError, setGeoCodeError] = useState(false);

  useEffect(() => {
    // Set the default configurations for the geocoding service
    setDefaults({
      key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY, // Google Geocoding API key
      language: "en", // Default language for responses
      region: "us", // Default region for responses
    });

    // Function to fetch coordinates (latitude and longitude) from the address
    const fetchCoords = async () => {
      try {
        // Call the geocoding API to get coordinates for the given address
        const res = await fromAddress(`${property.location.street} ${property.location.city} ${property.location.state} ${property.location.zipcode}`);

        // Check if the response contains results
        if (!res.results || res.results.length === 0) {
          setGeoCodeError(true); // Set error state if no results found
          return;
        }

        // Extract latitude and longitude from the response
        const { lat, lng } = res.results[0].geometry.location;
        setLat(lat); // Set latitude in state
        setLng(lng); // Set longitude in state

      } catch (error) {
        console.error("Geocoding error:", error); // Log any errors that occur during the geocoding process
        setGeoCodeError(true); // Set error state if there's a problem with geocoding
      } finally {
        setLoading(false); // End the loading state once the operation completes (whether successful or not)
      }
    };

    fetchCoords(); // Call the fetchCoords function when the component mounts
  }, [property.location]); // Dependency array ensures this effect runs when the property location changes

  // If the data is still loading, display a loading spinner
  if (loading) return <Spinner />;

  // If there was an error with geocoding, display an error message
  if (geoCodeError) return <h3>No Location Found</h3>;

  // Render the Map component once the coordinates are available and there are no errors
  return (
    <Map
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN} // Mapbox token for accessing the map
      initialViewState={{
        latitude: lat, // Set the initial latitude
        longitude: lng, // Set the initial longitude
        zoom: 15, // Set the initial zoom level
      }}
      style={{ width: "100%", height: "500px" }} // Style the map with full width and a fixed height
      mapStyle="mapbox://styles/mapbox/streets-v9" // Specify the map style using a Mapbox style URL
    >
      <Marker latitude={lat} longitude={lng} anchor="bottom">
        <Image src={pin} alt="pin" width={30} height={30} /> {/* Display a custom pin image for the map marker */}
      </Marker>
    </Map>
  );
};

export default PropertyMap; // Export the component to be used in other parts of the application