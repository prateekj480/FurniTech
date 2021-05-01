import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING': return { ...state, loading: true }
    case LOAD_PRODUCTS: {
      let maxPrice = Math.max(...action.payload.map(p => p.price))
      return { ...state, allProducts: [...action.payload], filteredProducts: [...action.payload], loading: false, filters: { ...state.filters, price: maxPrice, maxPrice } }
    }
    case SET_GRIDVIEW: return { ...state, gridView: true }
    case SET_LISTVIEW: return { ...state, gridView: false }
    case UPDATE_SORT: return { ...state, sort: action.payload }
    case SORT_PRODUCTS: {
      const { filteredProducts, sort } = state
      let tempProducts = [...filteredProducts]
      if (sort === 'price-lowest') {
        tempProducts = tempProducts.sort((a, b) => a.price - b.price)
      }
      if (sort === 'price-highest') {
        tempProducts = tempProducts.sort((a, b) => b.price - a.price)
      }
      if (sort === 'name-a') {
        tempProducts = tempProducts.sort((a, b) => a.name.localeCompare(b.name))
      }
      if (sort === 'name-z') {
        tempProducts = tempProducts.sort((a, b) => b.name.localeCompare(a.name))
      }
      return { ...state, filteredProducts: tempProducts }
    }
    case UPDATE_FILTERS: {
      const { name, value } = action.payload
      return { ...state, filters: { ...state.filters, [name]: value } }
    }
    case FILTER_PRODUCTS: {
      const { allProducts } = state
      const { text, price, shipping, category, company, color } = state.filters

      let tempProducts = [...allProducts]
      if (text) {
        tempProducts = tempProducts.filter(product => {
          return product.name.toLowerCase().startsWith(text)
        })
      }
      if (category !== 'all') {
        tempProducts = tempProducts.filter(product => {
          return product.category.toLowerCase() === category
        })
      }
      if (company !== 'all') {
        tempProducts = tempProducts.filter(product => {
          return product.company.toLowerCase() === company
        })
      }
      if (color !== 'all') {
        tempProducts = tempProducts.filter(product => {
          return product.colors.includes(color)
        })
      }
      if (price !== state.filters.maxPrice) {
        tempProducts = tempProducts.filter(product => {
          return product.price <= price
        })
      }
      if (shipping) {
        tempProducts = tempProducts.filter(product => {
          return product.shipping
        })
      }
      return { ...state, filteredProducts: tempProducts }
    }
    case CLEAR_FILTERS: {
      return {
        ...state,
        filters: {
          text: '',
          category: 'all',
          company: 'all',
          color: 'all',
          price: state.filters.maxPrice,
          shipping: false
        }
      }
    }
    default: throw new Error(`No Matching "${action.type}" - action type`)
  }
}

export default filter_reducer
