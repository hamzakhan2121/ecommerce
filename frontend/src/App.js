import Header from "./component/layout/Header/Header.js"
import { BrowserRouter as Router,Route,Switch } from "react-router-dom";
import './App.css';
import webFont from 'webfontloader';
import React,{useEffect, useState} from "react";
import { useSelector } from "react-redux";

import Footer from "./component/layout/footer/Footer.js"
import Home from './component/Home/Home.js'
import ProductDetails from './component/Product/ProductDetails.js'
import Products from "./component/Product/Products.js"
import Search from "./component/Product/Search.js"
import LoginSignUP from "./component/user/LoginSignup.js";
import store from './store'
import UserOptions from './component/layout/Header/UserOptions.js'
import { loadUser } from "./actions/userAction.js";
import Profile from"./component/user/Profile.js";
import ProtectedRoute from "./component/route/ProtectedRoute.js";
import UpdateProfile from './component/user/UpdateProfile.js'
import UpdatePassword from './component/user/UpdatePassword.js'
import ForgotPassword from './component/user/ForgotPassword.js'
import ResetPassword from './component/user/ResetPassword.js';
import Cart from './component/cart/Cart.js'
import Shipping from './component/cart/Shipping.js'
import ConfirmOrder from "./component/cart/ConfirmOrder.js"
import Payment from "./component/cart/Payment.js"
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/cart/OrderSuccess.js"
import MyOrders from "./component/Order/MyOrders.js"
import OrderDetails from "./component/Order/OrderDetails.js"
import Dashboard from "./component/admin/Dashboard.js";
import ProductList from "./component/admin/ProductList.js"
import axios from "axios";
import NewProduct from "./component/admin/newProduct.js";
import UpdateProduct from "./component/admin/UpdateProduct.js"
import OrderList from "./component/admin/OrderList.js";
import ProcessOrder from "./component/admin/ProcessOrder.js";
import UsersList from "./component/admin/UsersList.js"
import UpdateUser from "./component/admin/UpdateUser.js"
import ProductReviews from "./component/admin/ProductReviews.js"
import Contact from "./component/layout/contact/Contact.js";
import NotFound from "./component/layout/NotFound/NotFound.js";

function App() {
  const {isAuthenticated,user} = useSelector((state)=>state.user)
  const [stripeApiKey,setStripeApiKey]=useState("")
  async function getStripeApiKey(){
    const {data}= await axios.get("/api/v1/stripeApiKey")
    setStripeApiKey(data.stripeApiKey)
  }
  useEffect(() => {
    webFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    });
    store.dispatch(loadUser());
    getStripeApiKey();
  }, [])
  // window.addEventListener("contextmenu",(e)=>e.preventDefault());
  return (
    <Router >
      <Header />
      {isAuthenticated && <UserOptions user={user} /> }

      {stripeApiKey && (
      <Elements stripe={loadStripe(stripeApiKey)}><ProtectedRoute exact path="/process/payment" component={Payment} /></Elements>
      )}

      <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/product/:id" component={ProductDetails} />
      <Route exact path="/products" component={Products} />
      <Route path="/products/:keyword" component={Products} />
      <Route exact path="/search" component={Search} />
      <Route exact path="/login" component={LoginSignUP}/>
      <ProtectedRoute exact path="/account" component={Profile} />
      <ProtectedRoute exact path="/me/update" component={UpdateProfile} />
      <ProtectedRoute exact path="/password/update" component={UpdatePassword} />
      <Route exact path="/password/forgot" component={ForgotPassword} />
      <Route exact path="/password/reset/:token" component={ResetPassword} />
      <Route exact path="/cart" component={Cart} />
      <ProtectedRoute exact path="/shipping" component={Shipping} />
      
      
      <ProtectedRoute exact path="/success" component={OrderSuccess} />
      <ProtectedRoute exact path="/orders" component={MyOrders} />
      
      <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />
      <ProtectedRoute exact path="/order/:id" component={OrderDetails} />
      <ProtectedRoute isAdmin={true} exact path="/admin/dashboard" component={Dashboard} />
      <ProtectedRoute isAdmin={true} exact path="/admin/products" component={ProductList} />
      <ProtectedRoute isAdmin={true} exact path="/admin/product" component={NewProduct} />
      <ProtectedRoute isAdmin={true} exact path="/admin/product/:id" component={UpdateProduct} />
      <ProtectedRoute isAdmin={true} exact path="/admin/orders" component={OrderList} />
      <ProtectedRoute isAdmin={true} exact path="/admin/order/:id" component={ProcessOrder} />
      <ProtectedRoute isAdmin={true} exact path="/admin/users" component={UsersList} />
      <ProtectedRoute isAdmin={true} exact path="/admin/user/:id" component={UpdateUser} />
      <ProtectedRoute isAdmin={true} exact path="/admin/reviews" component={ProductReviews} />
      <Route exact path="/contact" component={Contact} />
      <Route component={window.location.pathname === "/process/payment" ? null : NotFound} />

      
      </Switch>
      <Footer />
      </Router>
  );
}

export default App;
