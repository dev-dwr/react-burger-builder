import React, {Component} from 'react'
import Button from '../../../components/UI/Button/Button'
import styles from './ContactData.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
class ContactData extends Component{
    state = {
        name: '',
        email: '',
        addres:{
            street:'',
            postalCode: ''
        },
        loading: false,
    }
    componentDidMount(){
        console.log(this.props)
    }
    orderHandler = (e)=>{
        e.preventDefault()
        this.setState({
            loading: true
        })
        const order = {
            
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer:{
                name: 'Dawid Rymarczyk',
                address:{
                    street: 'teststreet 1',
                    zipCode:'55-100',
                    country: 'Poland'
                    
                },
                email: 'test@test.com',
                
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json',order).then((response)=>{
                  this.setState({loading:false})
                  this.props.history.push('/')
                }).catch(error=>this.setState({loading:false}))
    }
    render(){
        
        let form = (<form>
            <input className={styles.Input} type ="text" name = "name" placeholder = "Your name"></input>
            <input className={styles.Input} type ="email" name = "email" placeholder = "Your email"></input>
            <input className={styles.Input} type ="text" name = "street" placeholder = "Your street"></input>
            <input className={styles.Input} type ="text" name = "postal" placeholder = "Your postal code"></input>
            <Button btnType="Success" hasClicked = {this.orderHandler}>ORDER</Button>
            </form>);
        if(this.state.loading){
            form = <Spinner/>
        }
        return(
            <div className = {styles.ContactData}>
            
            <h4>Contact Data:</h4>
            {form}
            </div>
            )
        }
    }
    
    
    export default ContactData