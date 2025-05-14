import { model, Schema } from "mongoose"

const commentSchema = new Schema(
    {
        userName: {
            type: String,
            required: true,
            unique: true
        },
        content: {
            type: String,
            required: true
        },
        publicationId: {
            type: Schema.Types.ObjectId,
            ref: "Publication",
            required: true
        }
    },
    {
        versionKey: false,
        timestamps: true 
    }
)

export default model("Comment", commentSchema)