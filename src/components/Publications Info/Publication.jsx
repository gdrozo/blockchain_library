import React, { useState, useEffect } from 'react'
import {
  PUBLICATION_PANEL,
  PUBLISH_PANEL,
  CHARGE,
  PUBLICATION,
  ADD_FILES_PANEL,
  HOME,
} from '../../DIRECTIONS'

export default function Publication({
  contract,
  publication,
  setPanel,
  address,
}) {
  const [files, setFiles] = useState([])
  const [isEditor, setIsEditor] = useState(false)

  useEffect(() => {
    if (contract) {
      validateUser()
      loadPublications()
    }
  }, [contract])

  async function validateUser() {
    if (contract && address) {
      setIsEditor(await contract.isEditor(address))
    }
  }

  async function loadPublications() {
    const pn = publication.files
    let pu = []
    for (let i = 0; i < pn; i++) {
      const fileArray = await contract.getFile(publication.id, i)
      const file = {
        title: fileArray[1],
        date: fileArray[2]._hex,
        hash: fileArray[0],
        description: fileArray[3],
      }

      pu.push(file)
    }
    setFiles(pu)
  }

  return (
    <>
      <div className="row">
        <div className="col ">
          <br />
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text">{publication.title}</span>
          </h4>
          <ul className="list-group mb-3">
            <li className="list-group-item  lh-sm">
              <h6 className="my-0">Description</h6>
              <p></p>
              <p className="text-muted pb-0 mb-2">{publication.description}</p>
            </li>
            <li className="list-group-item d-flex justify-content-between lh-sm">
              <div>
                <h6 className="my-0">Editor</h6>
                <small className="text-muted">
                  The address of the publications creator
                </small>
              </div>
              <span className="text-muted">{publication.editor}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between lh-sm">
              <div>
                <h6 className="my-0">Date</h6>
                <small className="text-muted">
                  Timestamp of the creation of the publication
                </small>
              </div>
              <span className="text-muted">{publication.date}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between lh-sm">
              <div>
                <h6 className="my-0">Category</h6>
              </div>
              <span className="text-muted">{publication.category}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>Number of files</span>
              <strong>{publication.files}</strong>
            </li>
          </ul>
        </div>
      </div>

      {isEditor && (
        <div className="row">
          <div className="col">
            <button
              className="btn btn-outline-primary rounded-pill"
              onClick={() => setPanel(ADD_FILES_PANEL)}
            >
              Add File
            </button>
            <br />
            <br />
          </div>
        </div>
      )}

      <div className="row">
        <div className="col">
          <label htmlFor="pId" className="form-label">
            File id
          </label>
          <div className="input-group">
            <input
              type="number"
              id="pId"
              className="form-control"
              placeholder="Id"
            />
            <button className="btn btn-secondary">Search</button>
          </div>
          <br />
        </div>
      </div>

      <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 g-4">
        {files.map((f, i) => (
          <div className="col" key={i}>
            <div className="card" style={{ width: '18rem' }}>
              <div className="card-body">
                <h5 className="card-title">{f.title}</h5>

                <p className="card-text">{f.description}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <a
                    href="#"
                    className="btn btn-primary"
                    onClick={() => {
                      window
                        .open(`https://ipfs.infura.io/ipfs/${f.hash}`, '_blank')
                        .focus()
                    }}
                  >
                    View
                  </a>
                  <small className="text-muted ">{f.date}</small>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <br />
      <br />
    </>
  )
}
