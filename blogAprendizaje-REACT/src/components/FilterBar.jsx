import React, { useState } from 'react'

function FilterBar({ onFilterChange, onSortChange }) {
  const [activeFilter, setActiveFilter] = useState('')
  const [sortOption, setSortOption] = useState('newest')

  const handleFilterClick = (filter) => {
    setActiveFilter(filter)
    onFilterChange(filter)
  }

  const handleSortChange = (e) => {
    setSortOption(e.target.value)
    
    let sortBy = 'createdAt'
    let order = 'desc'
    
    if (e.target.value === 'oldest') {
      order = 'asc'
    } else if (e.target.value === 'title') {
      sortBy = 'title'
      order = 'asc'
    }
    
    onSortChange(sortBy, order)
  }

  return (
    <div className="filter-bar mb-4">
      <div className="d-flex justify-content-between align-items-center">
        <div className="btn-group">
          <button 
            className={`btn ${activeFilter === '' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => handleFilterClick('')}
          >
            Todos
          </button>
          <button 
            className={`btn ${activeFilter === 'Taller III' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => handleFilterClick('Taller III')}
          >
            Taller III
          </button>
          <button 
            className={`btn ${activeFilter === 'Práctica Supervisada' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => handleFilterClick('Práctica Supervisada')}
          >
            Práctica Supervisada
          </button>
          <button 
            className={`btn ${activeFilter === 'Tecnología III' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => handleFilterClick('Tecnología III')}
          >
            Tecnología III
          </button>
        </div>
        
        <div className="d-flex align-items-center">
          <label htmlFor="sortOption" className="me-2">Ordenar por:</label>
          <select 
            id="sortOption" 
            className="form-select form-select-sm" 
            value={sortOption}
            onChange={handleSortChange}
            style={{ width: 'auto' }}
          >
            <option value="newest">Más recientes</option>
            <option value="oldest">Más antiguos</option>
            <option value="title">Título</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default FilterBar