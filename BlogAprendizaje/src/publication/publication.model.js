import { model, Schema } from "mongoose"

const publicationSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true
        },
        content: {
            type: String,
            required: true
        },
        course: {
            type: String,
            required: true,
            enum: ["Taller III", "Práctica Supervisada", "Tecnología III"]
        }
    },
    {
        versionKey: false,
        timestamps: true 
    }
)

export default model("Publication", publicationSchema)