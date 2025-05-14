import mongoose from "mongoose"
import Publication from "../src/publication/publication.model.js"
import Comment from "../src/comment/comment.model.js"

export const existTitle = async (title) => {
    const existing = await Publication.findOne({ title })
    if (existing) {
        throw new Error(`A publication with the title '${title}' already exists`)
    }
}

export const isValidPublicationId = (id) => {
    if (!mongoose.isValidObjectId(id)) {
        throw new Error('El ID de la publicación no es válido')
    }
    return true
}

export const existName = async (userName) => {
    const existing = await Comment.findOne({ userName })
    if (existing) {
        throw new Error(`'${userName}' already exists`)
    }
}

export const isValidObjectId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('Invalid ID format')
  }
  return true
}