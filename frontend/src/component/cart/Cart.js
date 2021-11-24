import React from 'react'
import "./cart.css"
import CartItemCard from "./CartItemsCard.js"; 
import {useDispatch,useSelector} from 'react-redux'; 
import { addItemsToCart,removeCartItems } from '../../actions/cartAction';
import { RemoveShoppingCart } from '@material-ui/icons';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const Cart = ({history}) => {
    const dispatch = useDispatch();
    const {cartItems} = useSelector((state)=>state.cart);
    const increaseQuantity=(id,quantity,stock)=>{
        const newQty=quantity+1;
        if(stock<=quantity)
        {return;}
        dispatch(addItemsToCart(id,newQty));

    }

    const decreaseQuantity=(id,quantity)=>{
        const newQty=quantity-1;
        if(1>=quantity)
        {return;}
        dispatch(addItemsToCart(id,newQty));

    }
    const deleteCartItems=(id)=>{
        dispatch(removeCartItems(id))
    }
    const checkoutHandler=()=>{
        history.push("/login?redirect=shipping")
    }
    return (
        <>
        {cartItems.length === 0 ?( 
            <div className="emptyCart">
                <RemoveShoppingCart />
                <Typography>No Product in your cart</Typography>
                <Link to="/products">View Products</Link>
            </div>
        ) : <>
            <div className="cartPage">
                <div className="cartHeader">
                    <p>Product</p>
                    <p>Quantity</p>
                    <p>Subtotal</p>
                </div>
                
                {cartItems && cartItems.map((item)=>(
                    <div className="cartContainer" key={item.product}>
                    <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                    <div className="cartInput">
                        <button onClick={()=>decreaseQuantity(item.product,item.quantity)}>-</button>
                        <input type="number" value={item.quantity}readOnly></input>
                        <button onClick={()=>increaseQuantity(item.product,item.quantity,item.stock)}>+</button>
                    </div>
                    <p className="cartSubtotal">
                    &#8360;{item.price * item.quantity}
                    </p>
                </div>
                ))}

                <div className="cartGrossTotal">
                    <div></div>
                    <div className="cartGrossTotalBox">
                        <p>Gross Total</p>
                        <p>&#8360;{cartItems.reduce((acc,item)=>acc+item.quantity*item.price,0)}</p>
                    </div>
                    <div></div>
                    <div className="checkOutBtn">
                        <button onClick={checkoutHandler}>Check Out</button>
                    </div>
                </div>
            </div>
        </>}
        </>
    )
}

export default Cart
