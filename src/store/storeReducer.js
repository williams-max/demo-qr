//import React from 'react'
const types = {
    authLogin: 'authLogin',
    authLogout: 'authLogout',
    updateUser: 'updateUser'
}
const initialStore = {
    isLogin: false,
    userActive: ""
}

const storeReducer = (state, action) => {

    switch (action.type) {

        case types.authLogin:


            return {
                ...state,
                isLogin: true
            }

        case types.authLogout:


            return {
                ...state,
                isLogin: false
            }

        case types.updateUser:
            return {
                ...state,
                userActive: action.payload
            }

            return {
                ...state,
                userActive: false
            }
        default:
            return state
    }
}

export { initialStore, types }
export default storeReducer