import * as actionTypes from '../actions/actionTypes'
import {updateObject} from '../utility'

const initialState = {
    orders:[],
    loading: false,
    purchased: false,

}
const purchaseInit = (state,action) =>{
    return updateObject(state, {purchased:false})
}
const purchaseBurgerStart = (state,action) =>{
    return updateObject(state, {loading:true})
}
const purchaseBurgerSuccess = (state,action) =>{
    const newOrder = updateObject(action.orderData,{id:action.orderId})     
        return updateObject(state,{
            loading:false,
            purchased:true,
            orders: state.orders.concat(newOrder)
        }) 
}

const purchaseBurgerFail = (state,action) =>{
    return updateObject(state,{loading:false})
}
const fetchOrdersInit = (state,action) =>{
    return updateObject(state,{loading:true})
}
const fetchOrdersSuccess = (state,action)=>{
     //in action -> order.js we have dispatch(fetchOrdersSuccess(fetchOrders)), in there fetchOrders is other orders in fetchOrdersSuccess export
    return updateObject(state,{
        loading:false,
        orders:action.orders
    })
} 
const fetchOrdersFail = (state,action) =>{
    return updateObject(state,{loading:false})
}
//const deleteOrders = (state,action) =>{
   // const updatedOrders = state.orders.filter(order=>order.id !== action.elementId)
  //  return updateObject(state,{orders:updatedOrders})
//}

const reducer = ( state = initialState , action) =>{
    switch(action.type){
        case actionTypes.PURCHASE_INIT: return purchaseInit(state)
        case actionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state)
        case actionTypes.PURCHASE_BURGER_SUCCESS:return purchaseBurgerSuccess(state,action)  
        case actionTypes.PURCHASE_BURGER_FAIL: return purchaseBurgerFail(state)
        case actionTypes.FETCH_ORDERS_INIT: return fetchOrdersInit(state)    
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state,action)
        case actionTypes.FETCH_ORDERS_FAIL: return fetchOrdersFail(state)
        //case actionTypes.DELETE_ORDERS: return deleteOrders(state,action)
        default:return state
       
    }
}

export default reducer  