import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/filter_reducer'
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'
import { useProductsContext } from './products_context'

const initialState = {
  loading: false,
  allProducts: [],
  filteredProducts: [],
  gridView: true,
  sort: 'price-lowest',
  filters: {
    text: '',
    category: 'all',
    company: 'all',
    color: 'all',
    minPrice: 0,
    maxPrice: 0,
    price: 0,
    shipping: false
  }
}

const FilterContext = React.createContext()

export const FilterProvider = ({ children }) => {
  const { products } = useProductsContext()
  const [state, dispatch] = useReducer(reducer, initialState)

  const setGrid = () => {
    dispatch({ type: SET_GRIDVIEW })
  }

  const setList = () => {
    dispatch({ type: SET_LISTVIEW })
  }

  const updateSort = (e) => {
    dispatch({ type: UPDATE_SORT, payload: e.target.value })
  }

  const updateFilters = e => {
    let name = e.target.name
    let value = e.target.value
    if (name === 'price') {
      value = Number(value)
    }
    if (name === 'shipping') {
      value = e.target.checked
    }
    dispatch({ type: UPDATE_FILTERS, payload: { name, value } })
  }

  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS })
  }

  useEffect(() => {
    if (products.length > 0) {
      dispatch({ type: LOAD_PRODUCTS, payload: products })
    } else dispatch({ type: 'SET_LOADING' })
  }, [products])

  useEffect(() => {
    dispatch({ type: FILTER_PRODUCTS })
    dispatch({ type: SORT_PRODUCTS })
  }, [products, state.sort, state.filters])

  return (
    <FilterContext.Provider value={{ ...state, setGrid, setList, updateSort, updateFilters, clearFilters }}>
      {children}
    </FilterContext.Provider>
  )
}
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext)
}
