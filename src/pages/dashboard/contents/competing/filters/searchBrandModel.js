import Formatter from 'src/utility/Formatter'

const _Formatter =  new Formatter()
export function searchBrandModel (brands, models, searchText ) {

  let newBrands = brands
  let newModels = {}

  searchText = _Formatter.normalizeToEnglish(searchText).toLowerCase();

  if (searchText) {
    newBrands = newBrands.filter((item) => item.title?.toLowerCase()
      .includes(searchText) ||
      item.title_en?.toLowerCase()
        .includes(searchText) ||
      (models && models[item.url_slug] && models[item.url_slug].some(
        (item) =>
          item.title?.toLowerCase()
            .includes(searchText) ||
          item.title_en?.toLowerCase()
            .includes(searchText)
      ))
    )
    Object.keys(models)
      .map((key) => {
        const filteredModel = models[key].filter((item) =>
          item.title?.toLowerCase()
            .includes(searchText) ||
          item.title_en?.toLowerCase()
            .includes(searchText)
        )
        if (filteredModel.length !== 0) newModels = {[key]: filteredModel}

      })
  }
  return {brands: newBrands, models: newModels}
}
