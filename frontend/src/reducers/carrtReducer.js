import {ADD_TO_CART,REMOVE_CART_ITEM, SAVE_sHIPPING_INFO} from '../constants/cartConstants'

export const cartReducer=(state={cartItems:[],shippingInfo:{}},action)=>{
    switch(action.type){
        case ADD_TO_CART:
            const item=action.payload;
            const isItemExist=state.cartItems.find((id)=>id.product === item.product);
            if(isItemExist){
                return{
                    ...state,
                    cartItems:state.cartItems.map((i)=>(
                        i.product === isItemExist.product ? item : i
                    ))
                }
            }
            else{
                return{
                ...state,
                cartItems:[...state.cartItems,item],

            }
            }
            case REMOVE_CART_ITEM:
                return{
                    ...state,
                    cartItems:state.cartItems.filter((i)=>i.product !==action.payload)
                }
            case SAVE_sHIPPING_INFO:
                return{
                    ...state,
                    shippingInfo:action.payload,
                }
        
        default:
            return state;
}
}