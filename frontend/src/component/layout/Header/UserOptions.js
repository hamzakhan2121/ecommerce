import React,{useState} from 'react'
import { SpeedDial, SpeedDialAction } from '@material-ui/lab'
import { Dashboard, Person, ExitToApp, ListAlt } from '@material-ui/icons'
import { useHistory } from 'react-router-dom'
import { useAlert } from 'react-alert'
import {logout} from '../../../actions/userAction'
import { ShoppingCart } from '@material-ui/icons'
import { useDispatch } from 'react-redux'
import "./header.css"
import { Backdrop } from '@material-ui/core';
import { useSelector } from 'react-redux'

const UserOptions = ({user}) => {
    const {cartItems}=useSelector((state)=>state.cart);
    const [open, setOpen] = useState(false);
    const history = useHistory();
    const alert = useAlert();
    const dispatch = useDispatch();
    const options = [
        { icon: <ListAlt />, name: "orders", func: orders },
        { icon: <Person />, name: "Profile", func: account },
        {icon:<ShoppingCart style={{color:cartItems.length>0?"tomato" :"unset"}} /> ,name:`Cart(${cartItems.length})`, func:cart},
        { icon: <ExitToApp />, name: "Logout", func: logoutUser },
    ];

    if (user.role === "admin") {
        options.unshift({ icon: <Dashboard />, name: "Dashboard", func: dashBoard },)
    }

    function dashBoard() {
        history.push("/admin/dashboard");
    }
    function orders() {
        history.push("/orders");
    }
    function account() {
        history.push("/account");
    }
    function cart() {
        history.push("/cart");
    }
    function logoutUser() {
        dispatch(logout());
        alert.success("Logout Successfully");
    }
    return (
        <>
            <Backdrop open={open} style={{ zIndex: "10" }}/>
            <SpeedDial
                ariaLabel="SpeedDial tooltip example"
                onClose={() => setOpen(false)}
                onOpen={() => { setOpen(true) }}
                style={{zIndex:"11"}}
                open={open}
                className="speedDial"
                direction="down"
                icon={
                    <img className="speedDialIcon"
                        src={user.avatar.url ? user.avatar.url : "/Profile.png"}
                        alt="Profile" />
                }
            >
                {options.map((item) => (
                    <SpeedDialAction
                        key={item.name}
                        icon={item.icon}
                        tooltipTitle={item.name}
                        onClick={item.func}
                        tooltipOpen={window.innerWidth<=600?true:false} />
                ))}

            </SpeedDial>
        </>
    )
}

export default UserOptions
