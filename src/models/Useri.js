const { Schema, models, model, default: mongoose } = require("mongoose");

const UseriSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

export const Useri = models?.Useri || model('Useri', UseriSchema);
