const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({
    product_id: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    title: {
        type: String,
        trim: true,
        required: true
    },
    price: {
        type: Number,
        trim: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    images: [
        {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
        },
    ],
    category: {
        type: String,
        required: true
    },
    checked: {
        type: Boolean,
        default: false
    },
    sold: {
        type: Number,
        default: 0
    },
    total: {
        type: Number,
        default: 10
    },
    isBestSeller: {
        type: Boolean,
        default: false
    },
    authorName: {
        type: String,
        default: 'Abc aye'
    }
}, {
    timestamps: true //important
})


module.exports = mongoose.model("Products", productSchema)