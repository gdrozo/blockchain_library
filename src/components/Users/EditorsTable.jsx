import React, {useState, useEffect} from 'react'

export default function EditorsTable({contract}) {

    const [editors, setEditors] = useState([])

    useEffect(()=>{
        if (contract){
        async function loadPublications() {
            const pn = (await contract.getNumberOfPublications()).toNumber()
            let pu = []
            for (let i = 0; i < pn; i ++){
                const publicationArray = await contract.getPublication(i)
                const publication = {
                    title: publicationArray[1],
                    date: publicationArray[4]._hex,
                    files: publicationArray[5].toNumber(),
                    editor: publicationArray[0],
                    description: publicationArray[2],
                    id: i
                }
                pu.push(publication)
            }
            setEditors(pu)
        }
        loadPublications();}
    }, [contract])

    function publicationSelected(p){
        selectPublication(p)
    }

  return (
    <div className='table'>
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col">Publication Date</th>
                    <th scope="col">Files</th>
                    <th scope="col">Editor</th>
                </tr>
            </thead>
            <tbody>
                {editors.map((p,i) =>
                    <tr onClick={()=>publicationSelected(p)} key={i}>
                        <th scope="row">{i}</th>
                        <td>{p.title}</td>
                        <td>{p.date}</td>
                        <td>{p.files}</td>
                        <td>{p.editor}</td>
                    </tr>
                )}
                
            </tbody>
        </table>
    </div>
  )
}
