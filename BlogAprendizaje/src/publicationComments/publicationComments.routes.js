import { Router } from "express";
import { getPublicationWithComments } from "./publicationComments.controller.js";
import { getPublicationWithCommentsValidator } from "../../middlewares/validators.js";

const publicationComments = Router()

publicationComments.get('/comments/:id',getPublicationWithCommentsValidator, getPublicationWithComments)

export default publicationComments