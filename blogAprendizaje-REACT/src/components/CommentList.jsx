import React from 'react'
import { formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'

function CommentList({ comments, loading }) {
  if (loading) {
    return (
      <div className="text-center my-4">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando comentarios...</span>
        </div>
      </div>
    )
  }

  if (!comments || comments.length === 0) {
    return (
      <div className="alert alert-light text-center">
        No hay comentarios todavía. ¡Sé el primero en comentar!
      </div>
    )
  }

  return (
    <div className="comment-list">
      <h5 className="mb-3">Comentarios ({comments.length})</h5>
      
      {comments.map((comment) => (
        <div key={comment._id} className="card mb-3 border-0 shadow-sm">
          <div className="card-body">
            <div className="d-flex align-items-center mb-2">
              <div className="avatar-placeholder bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-2" style={{ width: '40px', height: '40px' }}>
                {comment.userName.charAt(0).toUpperCase()}
              </div>
              <div>
                <h6 className="mb-0">{comment.userName}</h6>
                <small className="text-muted">
                  {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true, locale: es })}
                </small>
              </div>
            </div>
            <p className="mb-0 ps-5">{comment.content}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CommentList