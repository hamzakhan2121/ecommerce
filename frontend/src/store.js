import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { deleteReviewReducer, newProductReducer, newReivewReducer, productDetailsReducer, productReducer, productReviewsReducer, productsReducer } from './reducers/productReducer';
import { allUsersReducer, forgotPasswordReducer, profileReducer, userDetailsReducer, UserReducer } from './reducers/userReducer';
import { cartReducer } from './reducers/carrtReducer';
import { allOrdersReducer,myOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer } from './reducers/orderReducer';


const reducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
    user: UserReducer,
    profile:profileReducer,
    forgotPassword:forgotPasswordReducer,
    cart:cartReducer,
    newOrder:newOrderReducer,
    myOrders:myOrdersReducer,
    orderDetails:orderDetailsReducer,
    newReview:newReivewReducer,
    newProduct:newProductReducer,
    product:productReducer,
    allOrders:allOrdersReducer,
    order:orderReducer,
    allUsers:allUsersReducer,
    userDetails:userDetailsReducer,
    productReviews:productReviewsReducer,
    review:deleteReviewReducer

});

let initialState = { cart:{
    cartItems:localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")):[],
    shippingInfo:localStorage.getItem("shippingInfo") ?JSON.parse(localStorage.getItem("shippingInfo")) :{}

}};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;