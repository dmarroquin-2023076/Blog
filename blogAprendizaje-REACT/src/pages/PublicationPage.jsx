import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { formatDistanceToNow, format } from 'date-fns'
import { es } from 'date-fns/locale'
import CommentForm from '../components/CommentForm'
import CommentList from '../components/CommentList'
import { getPublicationWithComments } from '../services/api'

function PublicationPage() {
  const { id } = useParams()
  const [publication, setPublication] = useState(null)
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPublicationWithComments = async () => {
      try {
        setLoading(true)
        const response = await getPublicationWithComments(id)
        
        if (response.success) {
          setPublication(response.publication)
          setComments(response.comments)
        } else {
          setError(new Error(response.message || 'Error al cargar la publicación'))
        }
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchPublicationWithComments()
    }
  }, [id])

  const handleCommentAdded = (newComment) => {
    setComments(prevComments => [newComment, ...prevComments])
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando publicación...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        Error: {error.message}
        <div className="mt-3">
          <Link to="/" className="btn btn-outline-primary">Volver a la página principal</Link>
        </div>
      </div>
    )
  }

  if (!publication) {
    return (
      <div className="alert alert-warning" role="alert">
        No se encontró la publicación solicitada.
        <div className="mt-3">
          <Link to="/" className="btn btn-outline-primary">Volver a la página principal</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="publication-page">
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
          <li className="breadcrumb-item"><Link to={`/?course=${publication.course}`}>{publication.course}</Link></li>
          <li className="breadcrumb-item active" aria-current="page">{publication.title}</li>
        </ol>
      </nav>
      
      <div className="card mb-4 shadow">
        <div className="card-header bg-light d-flex justify-content-between align-items-center">
          <span className="badge bg-primary">{publication.course}</span>
          <small className="text-muted">
            Publicado el {format(new Date(publication.createdAt), 'PPP', { locale: es })}
          </small>
        </div>
        <div className="card-body">
          <h1 className="card-title mb-4">{publication.title}</h1>
          <div className="card-text">
            {publication.content.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
      
      <CommentForm publicationId={id} onCommentAdded={handleCommentAdded} />
      
      <CommentList comments={comments} loading={false} />
    </div>
  )
}

export default PublicationPage