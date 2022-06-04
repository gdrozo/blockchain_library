import React, { useState, useEffect } from 'react'
import '../../src/styles/home.css'
import Featured from './Publications Info/Featured'
import PublicationsTable from './Publications Info/PublicationsTable'
import loadData from '../Logic'

export default function Home({
  contract,
  selectPublication,
  setCategories,
  setFilter,
}) {
  const [publications, setPublications] = useState([])
  const [years, setYears] = useState({ list: [] })

  useEffect(() => {
    loadData(contract, setPublications, setCategories, setYears)
  }, [contract])

  function publicationSelected(p) {
    selectPublication(p)
  }

  return (
    <>
      <main className="container">
        {/* Placeholder for when thers no content */}
        {publications.length < 1 && (
          <div className="p-4 p-md-5 mb-4 text-white rounded bg-dark">
            <div className="row px-md-3">
              <div className="col-md-7 px-0">
                <h1 className="display-4">
                  There's still not content to show.
                </h1>
              </div>
            </div>
            <div className="row px-md-3">
              <div className="col-md-7 px-0">
                <p className="lead my-3">Stay tuned for new posts.</p>
                <p className="lead mb-0">
                  <a href="#" className="text-white fw-bold">
                    Find info...
                  </a>
                </p>
              </div>
            </div>
          </div>
        )}
        {/* Last post */}
        {publications.length > 0 && (
          <div className="p-4 p-md-5 mb-4 text-white rounded bg-dark">
            <div className="row px-md-3">
              <div className="col-md-9 px-0">
                <h1 className="display-6 fst-italic">
                  {publications[0].title}
                </h1>
              </div>
            </div>
            <div className="row px-md-3">
              <div className="col-md-12 px-0">
                <p className="lead my-3">{publications[0].description}</p>
                <p className="lead mb-0">
                  <a href="#" className="text-white fw-bold">
                    See files...
                  </a>
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="row mb-2">
          <div className="col-md-6">
            {publications.length > 1 && (
              <Featured publication={publications[1]} />
            )}
          </div>
          <div className="col-md-6">
            {publications.length > 2 && (
              <Featured publication={publications[2]} />
            )}
          </div>
        </div>

        <div className="row g-5">
          <div className="col-md-8">
            <h3 className="pb-4 mb-4 fst-italic border-bottom"></h3>

            <article className="blog-post">
              <h2 className="blog-post-title mb-1">All posts</h2>
              {publications.length < 1 && (
                <p className="blog-post-meta">There's still no posts...</p>
              )}
              {publications.length > 0 && (
                <>
                  <p className="blog-post-meta">
                    Last post made by {publications[0].date}
                  </p>
                  <PublicationsTable
                    publications={publications}
                    selectPublication={selectPublication}
                  />
                </>
              )}

              <p>
                Click on any post in the table to see its files and details.
              </p>
            </article>

            <nav className="blog-pagination" aria-label="Pagination">
              <a className="btn btn-outline-primary rounded-pill" href="#">
                Older
              </a>
              <a className="btn btn-outline-secondary rounded-pill disabled">
                Newer
              </a>
            </nav>
          </div>

          <div className="col-md-4">
            <div className="position-sticky" style={{ top: '2rem' }}>
              <div className="p-4 mb-3 bg-light rounded">
                <h4 className="fst-italic">About</h4>
                <p className="mb-0">
                  This is a graduation project created by Germán Rozo, with the
                  advice of Sandra Julieta Rueda Rodríguez, Ph.D.
                </p>
              </div>

              <div className="p-4">
                <h4 className="fst-italic">Archives</h4>
                <ol className="list-unstyled mb-0">
                  {years.list.map((y, i) => (
                    <li key={i}>
                      <a
                        href=""
                        onClick={(e) => {
                          e.preventDefault()
                          setFilter(years[y])
                        }}
                      >
                        {y}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="p-4">
                <h4 className="fst-italic">Elsewhere</h4>
                <ol className="list-unstyled">
                  <li>
                    <a href="#">GitHub</a>
                  </li>
                  <li>
                    <a href="#">Twitter</a>
                  </li>
                  <li>
                    <a href="#">Facebook</a>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="blog-footer">
        <p>
          Blog template built for
          <a href="https://getbootstrap.com/">Bootstrap</a> by
          <a href="https://twitter.com/mdo">@mdo</a>.
        </p>
        <p>
          <a href="#">Back to top</a>
        </p>
      </footer>
    </>
  )
}
