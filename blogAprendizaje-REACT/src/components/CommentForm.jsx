import React, { useState } from 'react'
import { saveComment } from '../services/api'

function CommentForm({ publicationId, onCommentAdded }) {
  const [userName, setUserName] = useState('')
  const [content, setContent] = useState('')
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' })

  const validate = () => {
    const newErrors = {}
    
    if (!userName.trim()) {
      newErrors.userName = 'El nombre es obligatorio'
    }
    
    if (!content.trim()) {
      newErrors.content = 'El comentario no puede estar vacío'
    } else if (content.length < 3) {
      newErrors.content = 'El comentario debe tener al menos 3 caracteres'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validate()) return
    
    setIsSubmitting(true)
    setSubmitMessage({ type: '', text: '' })
    
    try {
      const commentData = {
        userName,
        content,
        publicationId
      }
      
      const response = await saveComment(commentData)
      
      if (response.success) {
        setUserName('')
        setContent('')
        setSubmitMessage({ 
          type: 'success', 
          text: 'Comentario agregado correctamente' 
        })
        
        if (onCommentAdded) {
          onCommentAdded(response.comment)
        }
      } else {
        setSubmitMessage({ 
          type: 'danger', 
          text: 'Error al agregar comentario: ' + response.message 
        })
      }
    } catch (error) {
      setSubmitMessage({ 
        type: 'danger', 
        text: 'Error al enviar el comentario: ' + (error.response?.data?.message || error.message) 
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="card mb-4">
      <div className="card-header bg-light">
        <h5 className="mb-0">Añadir un comentario</h5>
      </div>
      <div className="card-body">
        {submitMessage.text && (
          <div className={`alert alert-${submitMessage.type} alert-dismissible fade show`} role="alert">
            {submitMessage.text}
            <button type="button" className="btn-close" onClick={() => setSubmitMessage({ type: '', text: '' })}></button>
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="userName" className="form-label">Nombre</label>
            <input
              type="text"
              className={`form-control ${errors.userName ? 'is-invalid' : ''}`}
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Tu nombre"
            />
            {errors.userName && (
              <div className="invalid-feedback">{errors.userName}</div>
            )}
          </div>
          
          <div className="mb-3">
            <label htmlFor="content" className="form-label">Comentario</label>
            <textarea
              className={`form-control ${errors.content ? 'is-invalid' : ''}`}
              id="content"
              rows="3"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Escribe tu comentario aquí..."
            ></textarea>
            {errors.content && (
              <div className="invalid-feedback">{errors.content}</div>
            )}
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Enviando...
              </>
            ) : 'Publicar comentario'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default CommentForm