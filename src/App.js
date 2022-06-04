import './App.css'
import Navbar from './components/Navbar'
import { useState, useEffect } from 'react'
import Publications from './components/Publications Info/Publications'
import Publication from './components/Publications Info/Publication'
import Publish from './components/Publish/Publish'
import AddFile from './components/Publish/AddFile'
import ContractJson from './abis/CentralStorage.json'
import { ethers } from 'ethers'
import Charging from './components/Charging'

import {
  PUBLICATIONS_PANEL,
  PUBLISH_PANEL,
  CHARGE,
  PUBLICATION,
  ADD_FILES_PANEL,
  ADMIN,
  HOME,
  FILTER_A,
  FILTER_B,
} from './DIRECTIONS'
import Admin from './components/Users/Admin'
import Home from './components/Home'
import PublicationsTable from './components/Publications Info/PublicationsTable'

function App() {
  const ethereum = window.ethereum

  const [panelText, setPanelText] = useState(CHARGE)
  const [contract, setContract] = useState()
  const [publication, setPublication] = useState()

  const [address, setAddress] = useState()

  const [panel, setPanel] = useState()
  const [categories, setCategories] = useState({ list: [] })

  const [filteredPublications, setFilteredPublications] = useState()

  //Controlling the routes
  useEffect(() => {
    switch (panelText) {
      case PUBLICATIONS_PANEL:
        setPanel(
          <Publications
            contract={contract}
            selectPublication={setPublication}
          />
        )
        break

      case PUBLISH_PANEL:
        setPanel(
          <Publish
            contract={contract}
            setPanel={setPanelText}
            selectPublication={setPublication}
          />
        )
        break

      case CHARGE:
        setPanel(<Charging setPanel={setPanelText} />)
        break

      case PUBLICATION:
        setPanel(
          <Publication
            publication={publication}
            contract={contract}
            setPanel={setPanelText}
            address={address}
          />
        )
        break

      case ADD_FILES_PANEL:
        setPanel(<AddFile contract={contract} publication={publication} />)
        break
      case ADMIN:
        setPanel(<Admin contract={contract} />)
        break
      case HOME:
        setPanel(
          <Home
            contract={contract}
            selectPublication={setPublication}
            setCategories={setCategories}
            setFilter={setFilteredPublications}
          />
        )
        break
      case FILTER_A:
        console.log('filter case')
        setPanel(
          <PublicationsTable
            publications={filteredPublications}
            selectPublication={setPublication}
          />
        )
        break
      case FILTER_B:
        console.log('filter case')
        setPanel(
          <PublicationsTable
            publications={filteredPublications}
            selectPublication={setPublication}
          />
        )
        break
    }
  }, [panelText, contract])

  useEffect(() => {
    if (publication) {
      setPanelText(PUBLICATION)
    }
  }, [publication])

  useEffect(() => {
    if (filteredPublications) {
      if (panelText == FILTER_A) {
        setPanelText(FILTER_B)
      } else {
        setPanelText(FILTER_A)
      }
    }
  }, [filteredPublications])

  useEffect(() => {
    setUpWeb3()
  }, [ethereum.networkVersion])

  const setUpWeb3 = async () => {
    if (ethereum.networkVersion) {
      // Get provider from Metamask
      const provider = new ethers.providers.Web3Provider(window.ethereum)

      const chainId = ethereum.networkVersion
      let a = ContractJson.networks[chainId].address
      // Get signer
      const signer = provider.getSigner()
      setAddress((await provider.listAccounts())[0])
      loadContract(signer, a)
    }
  }

  const loadContract = async (signer, address) => {
    const contract = new ethers.Contract(address, ContractJson.abi, signer)
    setContract(contract)

  }

  return (
    <>
      <Navbar
        setPanel={setPanelText}
        contract={contract}
        address={address}
        categories={categories}
        setFilter={setFilteredPublications}
      />
      <div className="container">{panel}</div>
    </>
  )
}

export default App
