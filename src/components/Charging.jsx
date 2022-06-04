import React, {useEffect, useState} from 'react'
import {PUBLICATION_PANEL, PUBLISH_PANEL, CHARGE, PUBLICATION, ADD_FILES_PANEL, HOME} from '../DIRECTIONS';

export default function Charging({setPanel}) {

    const [pro, setPro] = useState('0')


    useEffect(()=>{
        updateProgress(0)
        
    }, [])

    const updateProgress = (i)=>{
        if (i<= 100){
            setTimeout(()=>{
                setPro(`${i}`)
                updateProgress(i+0.2)
                }, 2);
        }
        else {
            setTimeout(()=>{
                setPanel(HOME)
                }, 1000);
        }
    }

  return (
    <div className="px-4 py-5 my-5 text-center">
    
        <h1 className="display-5 fw-bold">Charging web3</h1>
        <br/>
        <div className="progress">
            <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{width: `${pro}%`}} aria-valuenow={pro} aria-valuemin="0" aria-valuemax="100"></div>
        </div>
    </div>
    
  )
}
