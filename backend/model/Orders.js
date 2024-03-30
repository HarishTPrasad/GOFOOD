const mongoose = require('mongoose');

const {Schema } = mongoose;
const OrderSchema = new Schema({
    email:{
        type: String,
        isRequired: true,
        uinque: true
    },
    order_data:{
        type: Array,
        isRequired:true
    },
})

module.exports = mongoose.model('orders', OrderSchema)