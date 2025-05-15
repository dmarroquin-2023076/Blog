import React from 'react'
import { Link } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'

function Publication({ publication }) {
  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-header bg-light d-flex justify-content-between align-items-center">
        <h5 className="card-title mb-0">{publication.title}</h5>
        <span className="badge bg-primary">{publication.course}</span>
      </div>
      <div className="card-body">
        <p className="card-text">
          {publication.content.length > 200 
            ? `${publication.content.substring(0, 200)}...` 
            : publication.content}
        </p>
      </div>
      <div className="card-footer bg-white d-flex justify-content-between align-items-center">
        <small className="text-muted">
          Publicado {formatDistanceToNow(new Date(publication.createdAt), { addSuffix: true, locale: es })}
        </small>
        <Link to={`/publication/${publication._id}`} className="btn btn-sm btn-outline-primary">
          Leer más
        </Link>
      </div>
    </div>
  )
}

export default Publication