import { Schema, model } from 'mongoose'

const productSchema = new Schema(
    {
        title: { type: String, required: true, trim: true },
        description: { type: String, required: true },
        discountPercentage: { type: Number, required: true },
        stock: { type: Number, required: true, default:100 },
        category: { type: String, required: true, trim: true },
        brand: { type: String, required: true },
        vendor: { type: Schema.Types.ObjectId, ref: 'users', default: '644bfb059e684e64f19054f4' },
        price: { type: Number, required: true },
        thumbnail: { type: String },
        images: [String],
        rating: {
            rate: { type: Number },
            count: { type: Number }
        },

    }
    , {
        timestamps: true
    }
)

const Product = model('products', productSchema)

export default Product