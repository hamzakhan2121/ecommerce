import React from 'react'
import "./orderSuccess.css";
import { CheckCircle } from '@material-ui/icons';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
    return (
        <div className="orderSuccess">
            <CheckCircle />
            <Typography>Your order has been placed successfully</Typography>
            <Link to="/orders">View Orders</Link>
            
        </div>
    )
}

export default OrderSuccess
