const mongoose = require('mongoose');

const foodItemSchema = mongoose.Schema({

    food_id: {
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    price: {
        type: Number,
        required: true
    },
    image_url: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    category: {
        type: String,
        required: true
    },
    availability: {
        type: Boolean,
        required: true
    },
    spiciness_level: {
        type: String,
        enum: ['None', 'Mild', 'Medium', 'Spicy'],
        required: true
    },
    tags: [{
        type: String
    }],
    discount: {
        is_discounted: {
          type: Boolean,
          required: true
        },
        discount_percentage: {
          type: Number,
          required: true,
          default: 0
        }
    }
})

const FoodItem = mongoose.model('menu',foodItemSchema);

module.exports = FoodItem;