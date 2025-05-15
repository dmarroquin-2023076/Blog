import React from 'react'
import { Link } from 'react-router-dom'

function Navigation() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">Blog de Aprendizaje</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Inicio</Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                Cursos
              </a>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/?course=Taller III">Taller III</Link></li>
                <li><Link className="dropdown-item" to="/?course=Práctica Supervisada">Práctica Supervisada</Link></li>
                <li><Link className="dropdown-item" to="/?course=Tecnología III">Tecnología III</Link></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navigation