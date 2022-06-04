import React from 'react'
import PublicationsTable from './PublicationsTable';
import {useState} from "react";

export default function Publications({contract, selectPublication}) {
  const [files, setFiles] = useState([])

  const [publicationId, setPublicationId] = useState()

  const search = async(e) => {
    e.preventDefault()
        
    let id = parseInt(publicationId)
    const publicationS = await contract.getPublication(id)
    const length = publicationS[5].toNumber()

    let files = []
    for (let i = 0; i < length; i++){
      const file = await contract.getFile(id, i)
      files.push({
        hash: file[0],
        title: file[1],
        timestamp: file[2]
      })
    }

    setFiles(files)

  }

  

  const saveText = (e) => {
    setPublicationId(e.target.value)
  }

  return (
    <>
    <div className="row">
        <div className='col'>
          <p> </p>
        </div>
    </div>
    <div className='row'>
      <div className='col-11'>
        <div className="mb-3">
          <label htmlFor="pId" className="form-label">Publication id</label>
          <input type="number" className="form-control" id="pId" placeholder="id" onChange={saveText}/>
        </div>
      </div>
      <div className='col'>
        <div className='row'>
          <button onClick={search} className="btn btn-primary mb-3">Search</button>
        </div>
        <div className='row'>
          <button onClick={search} className="btn btn-primary mb-3">Clear</button>

        </div>
      </div>
    </div>
    <div className="row">
        <div className='col'>
        <PublicationsTable contract={contract} selectPublication={selectPublication}/>
        </div>
    </div>
 
    </>
  )
}
