const mongoose = require('mongoose');

const adminSchema = new mongoose. Schema({
    id: {type: String, required:true},
    password: {type: String, required: true},
    name: {type: String}
});

const adminModel = mongoose.models.admin || mongoose.model("admin", adminSchema);
module.exports = adminModel;