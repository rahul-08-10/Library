const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    membershipNumber: { type: String, required: true, unique: true },
    membershipDuration: {
        type: String,
        enum: ["6 months", "1 year", "2 years"],
        default: "6 months",
    },
    borrowLimit: { type: Number, default: 2 },
});

module.exports = mongoose.model("User", UserSchema);
