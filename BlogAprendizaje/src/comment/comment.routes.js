import { Router } from "express";
import { getCommentsByPublication, saveComment } from "./comment.controller.js";
import { createCommentValidator, getCommentsByPublicationValidator } from "../../middlewares/validators.js";


const comment = Router()

comment.post('/newComment', createCommentValidator,saveComment)
comment.get('/getCommentsWithPublication',getCommentsByPublicationValidator, getCommentsByPublication)

export default comment