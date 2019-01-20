import * as actionTypes from './actionTypes'

import axios from '../../axios-orders'

export const purchaseBurgerSuccess = (id, orderData) =>{
    return{
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId:id,
        orderData: orderData
    }
}

export const purchaseBurgerFail = (error) => {
    return{
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error:error
    }
}
export const purchaseBurgerStart = () =>{
    return{
        type:actionTypes.PURCHASE_BURGER_START
    }
}
//Dispatch when we click order button
export const purchaseBurger = (orderData) =>{
    return dispatch =>{
        dispatch(purchaseBurgerStart())
        axios.post('/orders.json', orderData).then(response =>{
            console.log(response.data)
            dispatch(purchaseBurgerSuccess(response.data.name, orderData))
        }).catch(error =>{
            dispatch(purchaseBurgerFail(error))
        })
    }

}

export const purchaseInit = () =>{
    return{
        type:actionTypes.PURCHASE_INIT
    }
}
export const fetchOrdersSuccess = (order) =>{
    return{
        type:actionTypes.FETCH_ORDERS_SUCCESS,
        orders:order
    }
}
export const fetchOrdersFailed = (error) =>{
    return{
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}
export const fetchOrdersInit = () =>{
    return{
        type:actionTypes.FETCH_ORDERS_INIT,

    }
}
export const fetchOrders = () =>{
    return dispatch =>{
        dispatch(fetchOrdersInit())
        axios.get('/orders.json').then(response =>{
            
            const fetchedOrders=[]
            //key to indyfikator z bazy danych,czyli customer , deliverMethod itd  //turning object into an array
            for(let key in response.data){
                //response.date[key] nowy obiekt zostanie wepchany na tablice fatchedOrders,gdzie bedzie mial wlasciwosci z obiektu z bazy danych
                fetchedOrders.push({...response.data[key], id:key})
                
            }
            dispatch(fetchOrdersSuccess(fetchedOrders))
        }).catch(err =>{
            dispatch(fetchOrdersFailed(err))
            
        })}
    }
//export const deleteOrders = () =>{
 // return dispatch =>{
  //    axios.delete('/orders.json')
 // }
     
    
//}