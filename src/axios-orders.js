import axios from 'axios'

const instance = axios.create({
    baseURL:'https://react-burger-builder-135e4.firebaseio.com/',

    
})
export default instance