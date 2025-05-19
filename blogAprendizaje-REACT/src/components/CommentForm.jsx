import React, { useState } from 'react';
import { saveComment } from '../services/api';

function CommentForm({ publicationId, onCommentAdded }) {
  const [userName, setUserName] = useState('')
  const [content, setContent] = useState('')
  const [errors, setErrors] = useState({})
  const [submitMessage, setSubmitMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validate = () => {
    const newErrors = {}
    if (!userName.trim() || userName.trim().length < 3) {
      newErrors.userName = 'El nombre debe tener al menos 3 caracteres'
    }
    if (!content.trim() || content.trim().length < 1) {
      newErrors.content = 'El comentario no puede estar vacío'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    setSubmitMessage('')
    setErrors({})

    const commentData = {
      userName: userName.trim(),
      content: content.trim(),
      publicationId,
    }

    try {
      const result = await saveComment(commentData)

      setUserName('')
      setContent('')
      setErrors({})
      setSubmitMessage('Comentario agregado correctamente')
      if (onCommentAdded) onCommentAdded(result.comment)

    } catch (error) {
      
      if (error.response?.status === 400 && error.response.data?.errors) {
        const validationErrors = error.response.data.errors
        const fieldErrors = {}
        validationErrors.forEach(err => {
          fieldErrors[err.param] = err.msg
        })
        setErrors(fieldErrors)
        setSubmitMessage('Corrige los errores en el formulario')
      } else {
        setSubmitMessage(error.response?.data?.message || 'Error al guardar el comentario')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="card mb-4">
      <div className="card-header bg-light"><h5>Añadir un comentario</h5></div>
      <div className="card-body">
        {submitMessage && <div className="alert alert-info">{submitMessage}</div>}
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label htmlFor="userName" className="form-label">Nombre *</label>
            <input
              id="userName"
              type="text"
              className={`form-control ${errors.userName ? 'is-invalid' : ''}`}
              value={userName}
              onChange={e => setUserName(e.target.value)}
              disabled={isSubmitting}
              required
              minLength={3}
            />
            {errors.userName && <div className="invalid-feedback">{errors.userName}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="content" className="form-label">Comentario *</label>
            <textarea
              id="content"
              className={`form-control ${errors.content ? 'is-invalid' : ''}`}
              rows={3}
              value={content}
              onChange={e => setContent(e.target.value)}
              disabled={isSubmitting}
              required
              minLength={1}
            />
            {errors.content && <div className="invalid-feedback">{errors.content}</div>}
          </div>
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Enviando...' : 'Publicar comentario'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default CommentForm
