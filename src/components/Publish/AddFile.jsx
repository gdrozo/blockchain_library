import React, { useState, useEffect } from 'react'
import { create } from 'ipfs-http-client'

export default function AddFile({ contract, publication }) {
  const client = create('https://ipfs.infura.io:5001/api/v0')

  const [title, setTitle] = useState()
  const [description, setDescription] = useState()
  const [toast, setToast] = useState('none')

  const [hash, setHash] = useState('')
  const [buffer, setBuffer] = useState()
  const [fileName, setFileName] = useState()

  const loadFile = (event) => {
    event.preventDefault()
    const file = event.target.files[0]
    setFileName(file.name)
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)

    reader.onloadend = () => {
      setBuffer(new Uint8Array(reader.result))
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const resultHash = await client.add(buffer)
    setHash(resultHash.path)

    let id = publication.id
    await contract.addFiles(id, title, resultHash.path, description)

    setToast('block')
    setTimeout(() => {
      setToast('none')
    }, 5000)
  }

  const toastLiveExample = (
    <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: '11' }}>
      <div
        style={{ display: toast }}
        id="liveToast"
        className="toast"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="toast-header">
          <img src="..." className="rounded me-2" alt="..." />
          <strong className="me-auto">Blockchain Library</strong>
          <small>Now</small>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="toast"
            aria-label="Close"
            onClick={() => setToast('none')}
          ></button>
        </div>
        <div className="toast-body">Published successfully</div>
      </div>
    </div>
  )

  function handleTitleChange(e) {
    setTitle(e.target.value)
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value)
  }

  return (
    <>
      {toastLiveExample}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            File title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            aria-describedby="titleHelp"
            onChange={handleTitleChange}
          />
          <div id="titleHelp" className="form-text">
            Choose a title that is descriptive and objective.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            aria-describedby="descriptionHelp"
            onChange={handleDescriptionChange}
          />
          <div id="descriptionHelp" className="form-text">
            Choose a short explanation of the content of the file.
          </div>
        </div>
        <div className="mb-3">
          <label for="formFile" className="form-label">
            File
          </label>
          <input
            className="form-control"
            type="file"
            id="formFile"
            onChange={loadFile}
          />
        </div>
        {hash && <p>Generated hash: {hash}</p>}
        <button onClick={handleSubmit} className="btn btn-primary">
          Add file
        </button>
      </form>
    </>
  )
}
