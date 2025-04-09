import { useEffect, useState } from 'react'
import Header from './components/Header'
import Guitar from './components/Guitar'
import { db } from './data/db'
import './App.css'

function App() {
  const initialCart = () => {
    const localStorageCart = localStorage.getItem('cartLa-guitarrs')
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }

  const [data] = useState(db)
  const [cart, setCart] = useState(initialCart())

  function addToCart(item) {
    const itemExists = cart.findIndex(guitar => guitar.id === item.id)
    if(itemExists >= 0 ) { 
      const updatedCart = [...cart]
      updatedCart[itemExists].quantity++
      setCart(updatedCart)
    } else {
      item.quantity = 1
      setCart([...cart, item])
    }
  }

  function clearCart() {
    setCart([])
  }
  
  function removeFromCart(id) {
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
  }

  function increaseQuantity(id) {
    const updatedCart = cart.map( item => {
      if(item.id === id) return {
          ...item,
          quantity: item.quantity + 1
      }
      return item
    })
    setCart(updatedCart)
  }

  function decreaseQuantity(id) {
    const updatedCart = cart.map( item => {
      if(item.id === id && item.quantity > 0) return {
          ...item,
          quantity: item.quantity - 1
      }
      return item
    })
    setCart(updatedCart)
  }

  useEffect(() => {
    localStorage.setItem('cartLa-guitars', JSON.stringify(cart))
  }, [cart])

  return (
    <>
      <Header
        cart={cart}
        clearCart={clearCart}
        removeFromCart={removeFromCart}
        decreaseQuantity={decreaseQuantity}
        increaseQuantity={increaseQuantity}
      />
      <main className="container-xl mt-5">
        <h1 className="text-center">Nuestra Colección</h1>
        <section className="row mt-5">
          {data.map(guitar => (
            <Guitar
              key={guitar.id}
              guitar={guitar}
              addToCart={addToCart}
            />
          ))}
        </section>
      </main>
      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
      </footer>
    </>
  )
}

export default App