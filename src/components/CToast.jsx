import React from 'react'
import { Toast } from 'react-bootstrap'

export default function CToast({ show, setShow }) {
  const toggleShow = () => setShow(!show)

  return (
    <div className="position-fixed top-0 end-0 my-4 mx-3">
      <Toast show={show} onClose={toggleShow}>
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Blockchain Library</strong>
          <small>Now</small>
        </Toast.Header>
        <Toast.Body>Published successfully</Toast.Body>
      </Toast>
    </div>
  )
}
