import { toStringDate, getDate } from './util/Timestamp'

export default async function loadData(
  contract,
  publicationsSetter,
  categoriesSetter,
  yearsSetter
) {
  if (contract) {
    let publications = await loadPublications(contract)
    let categories = await analyzeCategories(publications)
    let years = await analyzeYears(publications)

    publicationsSetter(publications)
    categoriesSetter(categories)
    yearsSetter(years)
    return publications
  }
}

async function loadPublications(contract) {
  const pn = (await contract.getNumberOfPublications()).toNumber()
  let pu = []
  for (let i = pn - 1; i > -1; i--) {
    const publicationArray = await contract.getPublication(i)
    const publication = {
      title: publicationArray[1],
      date: toStringDate(publicationArray[4]),
      files: publicationArray[5].toNumber(),
      editor: publicationArray[0],
      description: publicationArray[2],
      id: i,
      category: publicationArray[6],
      fullDate: getDate(publicationArray[4]),
    }
    pu.push(publication)
  }
  return pu
}

async function analyzeCategories(publications) {
  let ca = { list: [] }
  await publications.forEach((p) => {
    let y = p.category
    if (ca[y] != undefined) {
      ca[y].push(p)
    } else {
      ca[y] = [p]
      ca.list.push(y)
    }
  })

  return ca
}

async function analyzeYears(publications) {
  let years = { list: [] }
  await publications.forEach((p) => {
    let y =
      p.fullDate.toLocaleString('default', { month: 'short' }) +
      ' ' +
      p.fullDate.getFullYear()
    if (years[y] != undefined) {
      years[y].push(p)
    } else {
      years[y] = [p]
      years.list.push(y)
    }
  })

  return years
}
