import React, { useState } from 'react'

export default function AddFile({ contract }) {
  const [title, setTitle] = useState()
  const [description, setDescription] = useState()
  const [toast, setToast] = useState('none')

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

  const handleSubmit = async (event) => {
    event.preventDefault()
    //string calldata title, string calldata description, string calldata hash) external editorOnly() returns (uint) {
    await contract.publish(
      title,
      description,
      '3100694DE3B849AE63A485F3EB31AB1A86BEF6A862794D643ADC2A026459227F',
      'clasification'
    )
    setToast('block')

    setTimeout(() => {
      setToast('none')
    }, 5000)
  }

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
          <label htmlFor="id" className="form-label">
            Publications id
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
            File Description
          </label>
          <textarea
            className="form-control"
            id="description"
            aria-describedby="descriptionHelp"
            onChange={handleDescriptionChange}
          />
          <div id="descriptionHelp" className="form-text">
            Choose a short explanation of the content of the publication.
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Publish
        </button>
      </form>
    </>
  )
}
