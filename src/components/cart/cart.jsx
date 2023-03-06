import { useCallback, useContext } from "react";
import { CartContext } from "../../context/cart-context";
import useRazorpay from "react-razorpay";
import "./cart.css"
const Cart = ()=> {
    const {cartData,setCartData,removeCartData} = useContext(CartContext);
    const removeItem = (index) => {
        const newCartData = [...cartData];
        newCartData.splice(index, 1);
        setCartData(newCartData);
      };
    const total = cartData.reduce((acc, curr) => acc + curr.Price, 0);
    
    const RazorPay = useRazorpay();
    const razorPayDisplay = useCallback(async (total)=> {
        const options = {
            key: "rzp_test_mg7dMNWdYmnBCo",
            amount: total*100,
            currency: "INR",
            name: "Gamers Stop",
            description: "Gaming Transaction",
            handler: (res)=> {
                console.log(res.razorpay_payment_id);
            
            },
            prefill: {
                name: "Jayanth Kumar K H",
                email: "jayanth7996@gmail.com",
                contact: "7996268486"
            
            },
            notes: {
                address: "work address"
            },
            theme: {
                color: "#3399cc",
            },
        }
        const rzp1 = new RazorPay(options);
        rzp1.open();
        removeCartData()
        
    }, [RazorPay])
    
    return (
        <>
            <section className="c-b">
            
                <section>
                <article className="cart-bill">Ordered </article>
                {cartData.map((cartItem,index)=> {
                    
                return (
                    <article className="cart-list" key={index}>
                        <img src={`http://localhost:1337${cartItem.url}`} alt="game" className="cart-img"/>
                        <article className="cart-title">{cartItem.Title}</article>
                        <article className="cart-price">{cartItem.Price}</article>
                        <button className="cart-button" onClick={()=>{
                           removeItem(cartItem.id)
                        }}
                        >Remove from cart</button>
                    </article>
                )
            })}
                </section>
                <section>
                <article className="cart-bill">Billing Information </article>
                  {cartData.map((cart)=> {
                     
                      return <article className="cart-b">
                       
                          <span>{cart.Title}</span>
                          <span className="price">{cart.Price}</span>
                      </article>
                  })}
                  <article className="tot">Total: {total}</article>
                  <button className="tot-b" onClick={()=>{razorPayDisplay(total)}}>Checkout</button>
                </section>
            </section>
           
        </>
    )
}
export default Cart;