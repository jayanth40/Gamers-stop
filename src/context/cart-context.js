import React, { useState } from "react";
//Provider
//Consumer

const CartContext = React.createContext();

const CartProvider = (props)=> {
    const [cartData, setCartData] = useState([]);
    const addCartData = (data)=> {
        setCartData([...cartData, data]);
    }
    const removeCartData = () => {
  setCartData([]);
      };
    return (
        <CartContext.Provider value={{cartData, addCartData,setCartData,removeCartData}}>
            {props.children}
        </CartContext.Provider>
    )
}
export {CartContext, CartProvider};