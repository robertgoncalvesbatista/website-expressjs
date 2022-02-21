const mongoose = require("mongoose");
const crypto = require("crypto")

const AdminSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            select: false,
            set: value => crypto
                .createHash("md5")
                .update(value)
                .digest("hex")
        },
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
            getters: true,
        },
        toObject: {
            virtuals: true,
            getters: true,
        },
    }
);

module.exports = mongoose.model("Admin", AdminSchema);
