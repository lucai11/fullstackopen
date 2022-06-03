const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minLength: 3
    },
    born: {
       type: Number,
       min: [999, "enter valid year"],
       max: [2022, "enter valid year"]
    }
})

module.exports = mongoose.model('Author', schema)