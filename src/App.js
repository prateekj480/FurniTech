import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Navbar, Sidebar, Footer } from './components'
import {
  Home, About, Products, SingleProduct, Error, Private, Checkout, Cart, AuthWrapper
} from './pages'

function App() {
  return <AuthWrapper>
    <Router>
      <Navbar />
      <Sidebar />
      <Switch>
        <Route path='/' exact>
          <Home />
        </Route>
        <Route path='/about' exact>
          <About />
        </Route>
        <Route path='/products' exact>
          <Products />
        </Route>
        <Route path='/products/:id' exact>
          <SingleProduct />
        </Route>
        <Route path='/cart' exact>
          <Cart />
        </Route>
        <Private path='/checkout' exact>
          <Checkout />
        </Private>
        <Route path='*' exact>
          <Error />
        </Route>
      </Switch>
      <Footer />
    </Router>
  </AuthWrapper>
}

export default App
