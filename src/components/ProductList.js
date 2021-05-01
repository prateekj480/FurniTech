import React from 'react'
import { useFilterContext } from '../context/filter_context'
import GridView from './GridView'
import ListView from './ListView'
import Loading from './Loading'

const ProductList = () => {
  const { filteredProducts: products, gridView, loading } = useFilterContext()

  if (loading) {
    return <Loading />
  }

  if (products.length < 1) {
    return <h5 style={{ textTransform: 'none' }}>Sorry, there are no matching products...</h5>
  }

  if (!gridView) {
    return <ListView products={products} />
  }

  return <GridView products={products} />
}

export default ProductList
