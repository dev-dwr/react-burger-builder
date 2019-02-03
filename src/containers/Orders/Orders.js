import React, {Component} from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler'
import * as actions from '../../store/actions/index'
import {connect} from 'react-redux'
import Spinner from '../../components/UI/Spinner/Spinner'
class Orders extends Component{
 
    componentDidMount(){
        this.props.onFetchOrders(this.props.token, this.props.userId)
    }
    render(){
        let orders = <Spinner/>
        if(!this.props.loading){
            orders = this.props.orders.map(order=>(
                <Order ingredients = {order.ingredients} //onClick ={()=>this.props.onDeleteOrders(order.id)} 
                price = {+order.price} key ={order.id}/> // Order cuz of parameter  , id is from loop
            ))
        
        }
        
        return(
            <div>
                 {orders}
            </div>
           
        )
    }
}
const mapStateToProps = (state)=>{
    return{
        token: state.auth.token,
        orders:state.order.orders,
        loading:state.order.loading,
        userId:state.auth.userId
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        onFetchOrders: (token,userId) => dispatch(actions.fetchOrders(token, userId)),
       
    }
}

//withErrorHandler Pokazuje sie okienko modal z wiadomoscia o bledzie
export default connect(mapStateToProps,mapDispatchToProps) (withErrorHandler(Orders, axios))