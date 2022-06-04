import React from 'react'

export default function Featured({ publication }) {
  return (
    <div className="row g-0 border border-2 rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-260 position-relative">
      <div className="col p-4 d-flex flex-column position-static">
        <strong className="d-inline-block mb-2 text-primary">
          {publication.category}
        </strong>
        <h4 className="mb-0">{publication.title}</h4>
        <div className="mb-1 text-muted">{publication.date}</div>
        <p className="card-text mb-auto">{publication.description}</p>
        <a href="#" className="stretched-link">
          Continue reading
        </a>
      </div>
    </div>
  )
}
