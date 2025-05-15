import React from 'react'
import Publication from './Publication'

function PublicationList({ publications, loading, error }) {
  if (loading) {
    return (
      <div className="d-flex justify-content-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        Error al cargar las publicaciones: {error.message}
      </div>
    )
  }

  if (!publications || publications.length === 0) {
    return (
      <div className="alert alert-info" role="alert">
        No hay publicaciones disponibles en este momento.
      </div>
    )
  }

  return (
    <div className="publication-list">
      {publications.map((publication) => (
        <Publication key={publication._id} publication={publication} />
      ))}
    </div>
  )
}

export default PublicationList