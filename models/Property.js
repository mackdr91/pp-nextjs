import {Schema, model, models} from 'mongoose';


const PropertySchema = new Schema(
    {
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        name: {
            type: String,

        },
        type: {
            type: String,

        },
        description: {
            type: String,

        },
        location: {
            street: String,
            city: String,
            state: String,
            zipcode: String,
        },
        beds: {
            type: Number,

        },
        baths: {
            type: Number,

        },
        square_feet: {
            type: Number,

        },
        amenities: [
            {
            type: String
            }
        ],
        rates: {
            weekly: Number,
            monthly: Number,
            nightly: Number
        },

        seller_info: {
            name: String,
            email: String,
            phone: String
        },

        images: [
            {
                type: String
            }
        ],

        is_featured: {
        type: Boolean,
        default: false
       },

    },

    {
        timestamps: true
    }
);

const Property = models.Property || model('Property', PropertySchema);
export default Property