import React, { useEffect, useState } from 'react'
import { Dropdown } from 'react-bootstrap'

import { PUBLICATIONS_PANEL, PUBLISH_PANEL, ADMIN, HOME } from '../DIRECTIONS'

export default function Navbar({
  setPanel,
  contract,
  address,
  categories,
  setFilter,
}) {
  const [isShowing, setShowing] = useState()
  const [isAdmin, setIsAdmin] = useState(false)
  const [isEditor, setIsEditor] = useState(false)
  const [dollCategories, setDollCategories] = useState([])

  useEffect(() => {
    validateUser()
  }, [contract, address])

  useEffect(() => {
    console.log('categories:', categories)
    let d = []
    for (let i = categories.list.length; i < 12; i++) {
      d.push(' ')
    }
    console.log('d', d)
    setDollCategories(d)
  }, [categories])

  async function validateUser() {
    if (contract && address) {
      setIsAdmin(await contract.isAdmin(address))
      setIsEditor(await contract.isEditor(address))
      setShowing(true)
    }
  }

  return (
    <>
      {
        isShowing && (
          <div className="container">
            <header className="blog-header lh-1 py-4 ">
              <div className="row flex-nowrap justify-content-between align-items-center">
                <div className="col-8 ">
                  <div
                    onClick={() => setPanel(HOME)}
                    className="blog-header-logo text-dark"
                    href="#"
                    style={{ cursor: 'pointer', fontSize: '3rem' }}
                  >
                    Blockchain Library
                  </div>
                </div>
                <div className="col-2 d-flex justify-content-end align-items-center">
                  <a className="link-secondary" href="#" aria-label="Search">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="mx-3"
                      role="img"
                      viewBox="0 0 24 24"
                    >
                      <title>Search</title>
                      <circle cx="10.5" cy="10.5" r="7.5" />
                      <path d="M21 21l-5.2-5.2" />
                    </svg>
                  </a>
                  {(isAdmin || isEditor) && (
                    <div className="dropdown">
                      <a
                        className="btn btn-sm btn-outline-secondary dropdown-toggle "
                        data-bs-toggle="dropdown"
                        role="button"
                      >
                        Manage
                      </a>
                      <ul className="dropdown-menu dropdown-menu-end  gap-1 p-2 rounded-3 mx-0 shadow w-220px">
                        {isEditor && (
                          <li onClick={() => setPanel(PUBLISH_PANEL)}>
                            <a className="dropdown-item rounded-2" href="#">
                              Publish
                            </a>
                          </li>
                        )}
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                        {isAdmin && (
                          <li onClick={() => setPanel(ADMIN)}>
                            <a className="dropdown-item rounded-2" href="#">
                              Manage users
                            </a>
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </header>

            <div className="nav-scroller py-1 mb-4 mb-2">
              <nav className="nav d-flex justify-content-between">
                {categories.list.map((c, i) => (
                  <a
                    style={{ textDecoration: 'none' }}
                    key={i}
                    className="p-2 link-dark"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      setFilter(categories[c])
                    }}
                  >
                    {c}
                  </a>
                ))}
                {dollCategories.map((d, i) => (
                  <a key={i} className="p-2 link-secondary">
                    {d}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        )
        /*
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark static-top">
        <div className="container">
            <a className="navbar-brand" href="#">
                Blockchain Library
            </a>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <a className="nav-link active" onClick={()=> setPanel(PUBLICATIONS_PANEL)} aria-current="page" href="#">Publications</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Info</a>
                    </li>
                    
                    {isEditor &&
                    <li className="nav-item">
                        <a className="nav-link" onClick={()=> setPanel(PUBLISH_PANEL)} href="#">Publish</a>
                    </li>}
                    
                    {(isAdmin || isEditor) &&
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Account
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                            {isAdmin && <li><a className="dropdown-item" href="#" onClick={()=>setPanel(ADMIN)}>Admin</a></li>}
                            {isEditor && <li><a className="dropdown-item" href="#">Editor</a></li>}
                        </ul>
                    </li>}
                </ul>
            </div>
        </div>
    </nav>*/
      }
    </>
  )
}
