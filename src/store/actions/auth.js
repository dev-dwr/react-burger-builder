import * as actionTypes from './actionTypes'
import axios from 'axios'

export const authStart = () =>{
    return{
        type:actionTypes.AUTH_START
    }
}
export const authSuccess = (token,userId) =>{
    return{
        type:actionTypes.AUTH_SUCCESS,
        idToken:token,
        userId:userId
    }
}

export const authFail = (err) =>{
    return{
        type:actionTypes.AUTH_FAIL,
        error:err
    }
}

export const logout = () =>{
    localStorage.removeItem("token")
    localStorage.removeItem("experationDate")
    localStorage.removeItem('userId')
    return{
        type:actionTypes.AUTH_LOGOUT,


    }
}

export const checkAuthTimeout = (exporationTime)=>{
    return dispatch =>{
        setTimeout(()=>{
            dispatch(logout())
        },exporationTime * 1000)
    }
}


export const auth = (email,password,isSignup) =>{
    return dispatch =>{
        dispatch(authStart())

        const authData = {
            email:email,
            password:password,
            returnSecureToken: true
        }
        let url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCzleq-fGC5KQlOUPpcCBAwVbfOX8Rl7DE";
        if(!isSignup){
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCzleq-fGC5KQlOUPpcCBAwVbfOX8Rl7DE'
        }
        axios.post(url,authData)
        .then((response)=>{
            console.log(response)
            //accessing localStorage
            //getTime() gives us current time of the date couting from 1970 year
            const experationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
            localStorage.setItem('token',response.data.idToken )
            localStorage.setItem('experationDate',experationDate)
            localStorage.setItem('userId', response.data.localId)
            //localId is userId
            dispatch(authSuccess(response.data.idToken, response.data.localId))
            dispatch(checkAuthTimeout(response.data.expiresIn))
        }).catch(err=>{
            console.log(err.response.data.error.message)
            dispatch(authFail(err.response.data.error.message))
        })
    }
}

export const setAuthRedirect = (path) =>{
    return{
        type:actionTypes.SET_AUTH_REDIRECT,
        path:path
    }
}

export const authCheckState = () =>{
    return dispatch => {
        const token = localStorage.getItem("token")
        if(!token){
            dispatch(logout())
        }else{
            const experationDate = new Date(localStorage.getItem('experationDate'))
            if( new Date() >= experationDate ){
                dispatch(logout())
            }else{
                const userId = localStorage.getItem('userId')
                dispatch(authSuccess(token,userId))
                // WE devide by 1000 because parameter in checkAuthTimeout (exporationTime) is multiplied by 1000 and then this weill be too big number
                dispatch(checkAuthTimeout((experationDate.getTime() - new Date().getTime() ) / 1000  ))
            }
            //1 s = 1000 ms
        
    }
}
}