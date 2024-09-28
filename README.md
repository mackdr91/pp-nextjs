# Property Management System

This project is a web application for managing and displaying property listings. It's built using Next.js and React, with MongoDB as the database.

## Components

1. **PropertyHeader**: Displays the main image of a property.

2. **PropertyMap**: Shows the location of a property on a map using Mapbox GL and Google Geocoding API.

3. **ProfileProperties**: Displays a list of properties for a user's profile, with options to edit or delete.

4. **PropertyDetail**: Renders detailed information about a property, including amenities, rates, and location.

5. **Property Model**: Defines the MongoDB schema for property listings.

## Key Features

- Property listing with detailed information (name, type, description, location, amenities, rates)
- Map integration to display property locations
- User authentication using Google OAuth
- CRUD operations for property listings
- Responsive design for various screen sizes

## Technologies Used

- Next.js
- React
- MongoDB (Mongoose)
- Mapbox GL
- Google Geocoding API
- NextAuth.js for authentication
- Tailwind CSS for styling

## Setup and Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables:
   - `NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY`
   - `NEXT_PUBLIC_MAPBOX_TOKEN`
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
   - MongoDB connection string
4. Run the development server: `npm run dev`

## Usage

- Users can view property listings
- Authenticated users can add, edit, and delete their own properties
- Property details include images, amenities, rates, and map location

## Contributing

[Add contribution guidelines if applicable]

## License

[Add license information]
