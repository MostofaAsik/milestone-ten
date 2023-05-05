import React, { useEffect, useState } from 'react';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
import { Link } from 'react-router-dom';

const Shop = () => {
  const [products, setProducts] = useState([])
  useEffect(() => {
    fetch('products.json')
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [])

  useEffect(() => {
    // step-0:from localStorage
    const storedCart = getShoppingCart()

    const savedCart = [];

    // step-1:get id of the product 
    for (const id in storedCart) {

      // step-2:get product from products state by using id 
      const addedProduct = products.find(product => product.id === id)
      if (addedProduct) {
        // step - 3:added quantity
        const quantity = storedCart[id]
        addedProduct.quantity = quantity;
        //step-4:add the addedProduct to the savedCart
        savedCart.push(addedProduct)
      }
    }
    //srep-5:set the cart
    setCart(savedCart)
  }, [products])


  const [cart, setCart] = useState([])
  const handleAddToCart = (product) => {
    let newCart = [];
    // const newCart = [...cart, product]
    // if product doesn't exist in the cart,then set quantity=1
    //if product exist update quantity by 1
    const exist = cart.find(pd => pd.id === product.id);
    if (!exist) {
      product.quantity = 1;
      newCart = [...cart, product]
    }
    else {
      exist.quantity = exist.quantity + 1;
      const remaining = cart.filter(pd => pd.id !== product.id);
      newCart = [...remaining, product]
    }
    setCart(newCart)
    addToDb(product.id)
  }

  const handleClearCart = () => {
    setCart([])
    deleteShoppingCart()
  }

  return (
    <div className='shop-container'>
      <div className="products-container">
        {
          products.map(product => <Product
            key={product.id}
            product={product}
            handleAddToCart={handleAddToCart}

          ></Product>)
        }
      </div>
      <div className="cart-container">
        <Cart
          cart={cart}
          handleClearCart={handleClearCart}
        >
          <Link to='/orders'>
            <button className='btn-proceed'>Review Order</button>
          </Link>

        </Cart>
      </div>
    </div>
  );
};

export default Shop;
