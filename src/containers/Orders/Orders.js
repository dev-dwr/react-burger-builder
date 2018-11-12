import React, {Component} from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler'
class Orders extends Component{
    state = {
        orders:[],
        loading:true
    }
    componentDidMount(){
        axios.get('/orders.json').then(response =>{
            
            const fetchedOrders=[]
            //key to indyfikator z bazy danych,czyli customer , deliverMethod itd  //turning object into an array
            for(let key in response.data){
                //response.date[key] nowy obiekt zostanie wepchany na tablice fatchedOrders,gdzie bedzie mial wlasciwosci z obiektu z bazy danych
                fetchedOrders.push({...response.data[key], id:key})
                
            }
            this.setState({
                loading: false,
                orders: fetchedOrders
            })
        }).catch(err =>{
            this.setState({
            loading: false,
        })})
    }
    render(){
        return(
            <div>
                {this.state.orders.map(order=>(
                    <Order ingredients = {order.ingredients} price = {+order.price} key ={order.id}/> // Order cuz of parameter  , id is from loop
                ))}
            </div>
        )
    }
}
//withErrorHandler Pokazuje sie okienko modal z wiadomoscia o bledzie
export default withErrorHandler(Orders, axios)