import React from 'react'
import { useState } from "react";

export default function FileManager({setFiles, contract}) {

    const [hash, setHash] = useState("")
    
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
      <div className='container-fluid'>
        <div className='row'>
          <div className='col'>
            <h2><a href={`https://ipfs.infura.io/ipfs/${hash}`} target="_blank" rel="noopener noreferrer">
                File link
            </a></h2>
          </div>
        </div>
          <div className='row'>
            <div className='col'>
              <input type='text' onChange={saveText} placeholder="Publication Id"/>
            </div>
            <div className='col'>
              <button onClick={search}>Search</button>
            </div>
          </div>      
      </div>
  )
}
