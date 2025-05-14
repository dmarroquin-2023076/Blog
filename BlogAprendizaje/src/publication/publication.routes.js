import { Router } from "express";
import { getAllPublication, getPublicationsByCourse, savePublication, updatePublication } from "./publication.controller.js";
import { createPublicationValidator, getAllPublicationValidator, publicationCourseValidator, updatePublicationValidator } from "../../middlewares/validators.js";

const publication = Router()

publication.post('/newPublication',createPublicationValidator, savePublication)
publication.get('/getPublications', getAllPublicationValidator,getAllPublication)
publication.post('/getPublicationsCourse',publicationCourseValidator, getPublicationsByCourse)
publication.put('/updatePublication/:id', updatePublicationValidator, updatePublication)


export default publication