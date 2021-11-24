import React from 'react'
import CheckoutSteps from './Cart/Checkoutsteps'
import { useSelector } from 'react-redux'
import MetaData from '../layout/metaData'
import "./ConfirmOrder.css"
import { Link } from 'react-router-dom'
import { Typography } from '@material-ui/core'

const ConfirmOrder = ({history}) => {
    const {shippingInfo,cartItems}=useSelector((state)=>state.cart);
    const{user}=useSelector((state)=>state.user)
    
    
    const subtotal=cartItems.reduce((acc,item)=>acc + item.quantity * item.price,0)
    const shippingCharges=subtotal>1000?0 :200;
    const tax=subtotal*0.18;
    const totalPrice=subtotal + tax + shippingCharges;

    const address=`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`

    const proceedToPayment=()=>{
        const data={
            subtotal,
            shippingCharges,
            tax,
            totalPrice,
        };
        sessionStorage.setItem("orderInfo",JSON.stringify(data));
        history.push("/process/payment");
    }
    return (
        <>
            <MetaData title="Confirm Order" />
            <CheckoutSteps activeStep={1} />
            <div className="confirmOrderPage">
                <div>
                    <div className="confirmShippingArea">
                        <Typography>Shipping Info</Typography>
                        <div className="confirmShippingAreaBox">
                            <div>
                                <p>Name:</p>
                                <span>{user.name}</span>
                            </div>
                            <div>
                                <p>Phone:</p>
                                <span>{shippingInfo.phoneNo}</span>
                            </div>
                            <div>
                                <p>Address:</p>
                                <span>{address}</span>
                            </div>
                        </div>

                    </div>
                    <div className="confirmCartItems">
                        <Typography>Your Cart Items</Typography>
                        <div className="confirmCartItemsContainer">
                            {cartItems && cartItems.map((item)=>(
                                <div key={item.product}>
                                    <img src={item.image} alt="Product" />
                                    <Link to ={`/product/${item.product}`}>{item.name}</Link>
                                    <span>{item.quantity} X &#8360;{item.price} = <b>&#8360;{item.price * item.quantity}</b></span>
                                </div>
                            ))}

                        </div>

                    </div>

                </div>
                <div className="orderSummary">
                    <Typography>Order Summary</Typography>
                    <div>
                        <div>
                            <p>Subtotal:</p>
                            <span>&#8360;{subtotal}</span>
                        </div>
                        <div>
                            <p>shipping Charges:</p>
                            <span>&#8360;{shippingCharges}</span>
                        </div>
                        <div>
                            <p>GST:</p>
                            <span>&#8360;{tax}</span>
                        </div>

                    </div>
                    <div className="orderSummaryTotal">
                        <p>
                            <b>Total:</b>
                        </p>
                        <span>&#8360;{totalPrice}</span>
                    </div>
                    <button onClick={proceedToPayment}>Proceed To Payment</button>

                </div>
            </div>
        </>
    )
}

export default ConfirmOrder
