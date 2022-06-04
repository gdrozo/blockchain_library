import React, { useState } from 'react'
import { ADD_FILES_PANEL } from '../../DIRECTIONS'
import CToast from '../CToast'

export default function Publish({ contract, selectPublication, setPanel }) {
  const [title, setTitle] = useState()
  const [description, setDescription] = useState()
  const [category, setCategory] = useState('Opinion')
  const [otherCategory, setOtherCategory] = useState()
  const [success, setSuccess] = useState(false)
  const [publication, setPublication] = useState()
  const [showToast, setShowToast] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    //string calldata title, string calldata description, string calldata hash) external editorOnly() returns (uint) {
    let c = category
    if (category == '-') {
      c = otherCategory
    }
    await contract.publish(
      title,
      description,
      '3100694DE3B849AE63A485F3EB31AB1A86BEF6A862794D643ADC2A026459227F',
      c
    )

    contract.on('publicationAdded', (editor, timestamp, id) => {
      setSuccess(true)

      const p = {
        title: title,
        date: timestamp._hex,
        files: 0,
        editor: editor,
        description: description,
        id: id.toNumber(),
        category: c,
      }
      setPublication(p)
      console.log(p)

      setShowToast(true)

      setTimeout(() => {
        setShowToast(false)
      }, 5000)
    })
  }

  function handleTitleChange(e) {
    setTitle(e.target.value)
    setSuccess(false)
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value)
    setSuccess(false)
  }

  function showOtherOption(e) {
    let value = e.target.value
    setSuccess(false)
    setCategory(value)
  }

  function handleCategoryChange(e) {
    setSuccess(false)
    setOtherCategory(e.target.value)
  }

  return (
    <>
      <CToast show={showToast} setShow={setShowToast} />
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Publications title
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
            Category
          </label>
          <select
            onChange={showOtherOption}
            defaultValue={0}
            className="form-select"
            aria-label="Default select example"
          >
            <option value="Opinion">Opinion</option>
            <option value="Politics">Politics</option>
            <option value="Civil rights">Civil rights</option>
            <option value="Censorship">Censorship</option>
            <option value="Culture">Culture</option>
            <option value="Public documents">Public documents</option>
            <option value="-">Other</option>
          </select>
          <div id="titleHelp" className="form-text">
            This will help readers find your publication more easily.
          </div>
        </div>
        {category == '-' && (
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="otherCategory"
              aria-describedby="titleHelp"
              onChange={handleCategoryChange}
            />
            <div id="titleHelp" className="form-text">
              Please write the category.
            </div>
          </div>
        )}
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
            Choose a short explanation of the content of the publication.
          </div>
        </div>
        <div
          className="btn-toolbar"
          role="toolbar"
          aria-label="Toolbar with button groups"
        >
          <div className="btn-group me-2" role="group" aria-label="Third group">
            <button type="submit" className="btn btn-primary">
              Publish
            </button>
          </div>
          {success && (
            <div className="btn-group" role="group" aria-label="Third group">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  selectPublication(publication)
                  setPanel(ADD_FILES_PANEL)
                }}
              >
                Add files
              </button>
            </div>
          )}
        </div>
      </form>
    </>
  )
}
