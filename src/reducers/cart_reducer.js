import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const { id, color, amount, product } = action.payload
      const tempItem = state.cart.find(item => item.id === id + color)

      if (tempItem) {
        const index = state.cart.indexOf(tempItem)
        tempItem.amount = (tempItem.amount + amount) > tempItem.max ? tempItem.max : tempItem.amount + amount
        const newCart = [...state.cart]
        newCart[index] = tempItem
        return { ...state, cart: newCart }
      } else {
        const newItem = {
          id: id + color,
          name: product.name,
          image: product.images[0].url,
          color,
          amount,
          price: product.price,
          max: product.stock,
          shipping: product.shipping
        }
        return { ...state, cart: [...state.cart, newItem] }
      }
    }
    case REMOVE_CART_ITEM: {
      return {
        ...state, cart: state.cart.filter(item => {
          return item.id !== action.payload
        })
      }
    }
    case TOGGLE_CART_ITEM_AMOUNT: {
      const { id, value } = action.payload
      const tempCart = state.cart.map(item => {
        if (item.id === id) {
          if (value === 'inc') {
            let newAmount = item.amount + 1
            if (newAmount > item.max) {
              newAmount = item.max
            }
            return { ...item, amount: newAmount }
          }
          if (value === 'dec') {
            let newAmount = item.amount - 1
            if (newAmount < 1) {
              newAmount = 1
            }
            return { ...item, amount: newAmount }
          }
        }
        return item
      })
      return { ...state, cart: tempCart }
    }
    case COUNT_CART_TOTALS: {
      const { totalItems, totalAmount, shippingFee } = state.cart.reduce((total, cartItem) => {
        const { price, amount, shipping } = cartItem
        total.totalItems += amount
        total.totalAmount += price * amount
        if (!shipping) {
          total.shippingFee += 500 * amount
        }
        return total
      }, {
        totalItems: 0,
        totalAmount: 0,
        shippingFee: 0
      })
      return { ...state, totalItems, totalAmount, shippingFee }
    }
    case CLEAR_CART: return { ...state, cart: [] }
    default: throw new Error(`No Matching "${action.type}" - action type`)
  }
}

export default cart_reducer
