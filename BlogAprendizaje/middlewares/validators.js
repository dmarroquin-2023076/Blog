import { body, param } from "express-validator";
import { validateErrors } from "./validate.error.js";
import { existName, existTitle, isValidPublicationId } from "../utils/db.validators.js";


//------------------------------------------PUBLICACION
export const createPublicationValidator = [
    body('title', 'Title is required')
        .notEmpty()
        .isLength({ min: 3 }).withMessage('Title must be at least 3 characters long')
        .custom(existTitle),
    body('content', 'Content is required')
        .notEmpty()
        .isLength({ min: 5 }).withMessage('Content must be at least 10 characters long'),

    body('course', 'Course is required')
        .notEmpty()
        .isIn(['Taller III', 'Práctica Supervisada', 'Tecnología III'])
        .withMessage('Invalid course'),

    validateErrors
]

export const publicationCourseValidator = [
  body('course', 'The course field is required')
    .notEmpty()
    .isIn(['Taller III', 'Práctica Supervisada', 'Tecnología III'])
    .withMessage('Course must be one of: Taller III, Práctica Supervisada, Tecnología III'),

  validateErrors
]

export const updatePublicationValidator = [
  param('id') 
    .custom(isValidPublicationId),
  body('title')
    .optional()
    .notEmpty().withMessage('Title cannot be empty')
    .isLength({ min: 3 }).withMessage('Title must be at least 3 characters long')
    .custom(existTitle),

  body('content')
    .optional()
    .notEmpty().withMessage('Content cannot be empty')
    .isLength({ min: 5 }).withMessage('Content must be at least 5 characters long'),

  body('course')
    .optional()
    .notEmpty().withMessage('Course cannot be empty')
    .isIn(['Taller III', 'Práctica Supervisada', 'Tecnología III'])
    .withMessage('Invalid course'),

  validateErrors
]
//-----------------------------------------------------------------COMENTARIO
export const createCommentValidator = [
  body('userName', 'User name is required')
    .notEmpty()
    .isLength({ min: 3 }).withMessage('User name must be at least 3 characters long')
    .custom(existName),
  body('content', 'Content is required')
    .notEmpty()
    .isLength({ min: 1 }).withMessage('Content must be at least 1 characters long'),

  body('publicationId', 'Publication ID is required')
    .notEmpty()
    .custom(isValidPublicationId),
  validateErrors
]

export const getCommentsByPublicationValidator = [
  body('publicationId', 'The publicationId is required').notEmpty(),
  body('publicationId')
    .custom(isValidPublicationId),

  validateErrors
]

export const getAllPublicationValidator = [
  body('course')
    .optional()
    .isIn(['Taller III', 'Práctica Supervisada', 'Tecnología III'])
    .withMessage('Course must be one of: Taller III, Práctica Supervisada, Tecnología III'),

  body('sortBy')
    .optional()
    .isIn(['createdAt', 'title', 'course']) 
    .withMessage('Sort by must be one of: createdAt, title, course'),

  body('order')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Order must be either "asc" or "desc"'),

  validateErrors
]

export const getPublicationWithCommentsValidator = [
  param('id')
    .custom(isValidPublicationId)
    .withMessage('The publication ID is invalid'),

  validateErrors,
]