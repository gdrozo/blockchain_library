import React, { useState, useEffect } from 'react'

export default function Admin({ contract }) {
  const [address, setAddress] = useState()
  const [toast, setToast] = useState('none')
  const [addEditor, setAddEditor] = useState(false)
  const [addAdmin, setAddAdmin] = useState(false)
  const [inEditor, setInEditor] = useState(false)
  const [inEditorPanel, setInEditorPanel] = useState('collapse')

  useEffect(() => {
    if (addEditor) {
      setAddAdmin(false)
      setInEditor(false)
    }
  }, [addEditor])

  useEffect(() => {
    if (addAdmin) {
      setAddEditor(false)
      setInEditor(false)
    }
  }, [addAdmin])

  useEffect(() => {
    if (inEditor) {
      setAddAdmin(false)
      setAddEditor(false)
    }
  }, [inEditor])

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

  const AddEditorTask = async (event) => {
    if (addEditor) {
      event.preventDefault()
      //string calldata title, string calldata description, string calldata hash) external editorOnly() returns (uint) {
      await contract.addEditor(address)
      setToast('block')

      setTimeout(() => {
        setToast('none')
      }, 5000)
    }
  }

  const AddAdminTask = async (event) => {
    if (addAdmin) {
      event.preventDefault()
      //string calldata title, string calldata description, string calldata hash) external editorOnly() returns (uint) {
      await contract.addAdmin(address)
      setToast('block')

      setTimeout(() => {
        setToast('none')
      }, 5000)
    }
  }

  const inEditorTask = async (event) => {
    if (inEditor) {
      event.preventDefault()
      //string calldata title, string calldata description, string calldata hash) external editorOnly() returns (uint) {
      await contract.invalidateEditor(address)
      setToast('block')

      setTimeout(() => {
        setToast('none')
      }, 5000)
    }
  }

  function handleAddressChange(e) {
    setAddress(e.target.value)
  }

  return (
    <>
      {toastLiveExample}
      <div className="px-4 pt-5 my-5 text-center">
        <h1 className="display-4 fw-bold">Blockchain Library</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">
            Admin panel: Here you can add or disable editors, as well as add
            other administrators{' '}
          </p>
        </div>
        <div id="accordionExample">
          <button
            className="btn btn-primary btn-lg px-4 me-sm-3 collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne"
            aria-expanded="true"
            aria-controls="collapseOne"
            onClick={() => setAddEditor(!addEditor)}
          >
            Add editor
          </button>
          <button
            className="btn btn-outline-secondary btn-lg px-4 collapsed my-4"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseTwo"
            aria-expanded="false"
            aria-controls="collapseTwo"
            onClick={() => setAddAdmin(!addAdmin)}
            style={{ marginRight: '1rem' }}
          >
            Add admin
          </button>
          <button
            className="btn btn-outline-secondary btn-lg px-4 collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseThree"
            aria-expanded="false"
            aria-controls="collapseThree"
            onClick={() => setAddAdmin(!addAdmin)}
            style={{ marginRight: '1rem' }}
          >
            Invalidate editor
          </button>
          <div className="border-bottom my-4"></div>
          <div className="text-start">
            <div
              id="collapseOne"
              className="accordion-collapse collapse"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <form onSubmit={AddEditorTask}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    New Editor address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    aria-describedby="titleHelp"
                    onChange={handleAddressChange}
                  />
                  <div id="titleHelp" className="form-text">
                    The new editor wallet address.
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">
                  Add
                </button>
              </form>
            </div>

            <div
              id="collapseTwo"
              className="accordion-collapse collapse"
              aria-labelledby="headingTwo"
              data-bs-parent="#accordionExample"
            >
              <form onSubmit={AddAdminTask}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    New Admin address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    aria-describedby="titleHelp"
                    onChange={handleAddressChange}
                  />
                  <div id="titleHelp" className="form-text">
                    The new admin wallet address.
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">
                  Add
                </button>
              </form>
            </div>

            <div
              id="collapseThree"
              className="accordion-collapse collapse"
              aria-labelledby="headingThree"
              data-bs-parent="#accordionExample"
            >
              <form onSubmit={inEditorTask}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Editor address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    aria-describedby="titleHelp"
                    onChange={handleAddressChange}
                  />
                  <div id="titleHelp" className="form-text">
                    The wallet address of the editor to disable.
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">
                  Disable
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="overflow-hidden" style={{ maxHeight: '30vh' }}></div>
      </div>
    </>
  )
}
