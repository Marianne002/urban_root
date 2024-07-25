// models/Garden.js
import { Schema, model, models } from 'mongoose';

const GardenSchema = new Schema({
    title: { type: String, required: true },
    img: { type: Boolean, required: true },
    slug: { type: String, required: true },
    location: {
        type: { type: String, default: "Point" },
        coordinates: { type: [Number], required: true }
    },
    list_typeprojet: { type: [String], required: true },
    list_typeactivite: { type: [String], required: true },
    list_techniqueprod: { type: [String], required: true },
    list_typeprod: { type: [String], required: true },
    cp: { type: String, required: true },
    ville: { type: String, required: true },
});

const Garden = models.Garden || model("Garden", GardenSchema);

export default Garden;
