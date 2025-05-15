import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import FilterBar from '../components/FilterBar'
import PublicationList from '../components/PublicationList'
import { getAllPublications } from '../services/api'

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [publications, setPublications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const courseParam = searchParams.get('course') || ''
  const sortByParam = searchParams.get('sortBy') || 'createdAt'
  const orderParam = searchParams.get('order') || 'desc'

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        setLoading(true)
        const response = await getAllPublications(
          courseParam, 
          sortByParam, 
          orderParam
        )
        
        if (response.success) {
          setPublications(response.publications)
        } else {
          setError(new Error(response.message || 'Error al cargar las publicaciones'))
        }
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    fetchPublications()
  }, [courseParam, sortByParam, orderParam])

  const handleFilterChange = (course) => {
    const newParams = new URLSearchParams(searchParams)
    
    if (course) {
      newParams.set('course', course)
    } else {
      newParams.delete('course')
    }
    
    setSearchParams(newParams)
  }

  const handleSortChange = (sortBy, order) => {
    const newParams = new URLSearchParams(searchParams)
    
    newParams.set('sortBy', sortBy)
    newParams.set('order', order)
    
    setSearchParams(newParams)
  }

  return (
    <div className="home-page">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold">Blog de Aprendizaje</h1>
        <p className="lead">
          Publicaciones de los cursos del área técnica: Taller III, 
          Práctica Supervisada y Tecnología III
        </p>
      </div>
      
      <FilterBar 
        onFilterChange={handleFilterChange} 
        onSortChange={handleSortChange} 
      />
      
      <PublicationList 
        publications={publications} 
        loading={loading} 
        error={error} 
      />
    </div>
  )
}

export default HomePage