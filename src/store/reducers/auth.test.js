import reducer from './auth.js'
import * as  actionTypes from '../actions/actionTypes'

describe('auth reducer', ()=>{

    it('should return initial state', ()=>{
        //reducer first parameter is state, second action
        expect(reducer(undefined,{})).toEqual({
            token: null,
            userId:null,
            error: null,
            loading: false,
            authRedirect: '/'
        })
    })
    it('should store the token upon login',()=>{
        expect(reducer({
            token: null,
            userId:null,
            error: null,
            loading: false,
            authRedirect: '/'
        },{
            type:actionTypes.AUTH_SUCCESS,
            //Payloads in AUTH_SUCCESS case
            idToken:'example-token',
            userId:'example-localId'
        })).toEqual({
            token: 'example-token',
            userId: 'example-localId',
            error: null,
            loading: false,
            authRedirect: '/'
        })
    })

})