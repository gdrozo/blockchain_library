import React, { useState, useEffect } from 'react'

export default function PublicationsTable({ selectPublication, publications }) {
  function publicationSelected(p) {
    selectPublication(p)
  }

  return (
    <div className="table">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Category</th>
            <th scope="col">Publication Date</th>
            <th scope="col">Files</th>
          </tr>
        </thead>
        <tbody>
          {publications.map((p, i) => (
            <tr onClick={() => publicationSelected(p)} key={i}>
              <td>{p.title}</td>
              <td>{p.category}</td>
              <td>{p.date}</td>
              <td>{p.files}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
