import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user_register_data:{},
    auth_data: {},
    email: ''
}

export const authSlice = createSlice({
    name: 'auth', 
    initialState,
    reducers: {
        UserRegisterData: (state, action) => {
            state.user_register_data = action.payload
        },
        AuthData: (state, action) => {
            state.auth_data = action.payload
        },
        EmailStore: (state, action) => {
            state.email = action.payload
        },
        LogoutAction: (state, action) => {
            return initialState
        }
    }
})

export const { UserRegisterData,AuthData, LogoutAction, EmailStore } = authSlice.actions
export default authSlice.reducer