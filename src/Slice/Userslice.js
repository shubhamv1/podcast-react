import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user:null
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers: {
        setUser(state,action){
          state.user = action.payload
          //console.log(state.user.user)
        },
        clearUser(state){
            state.user = null
        }
      },
    })
   
    export const {setUser,clearUser} = userSlice.actions  //exporting actions which further can be use
    export default userSlice.reducer
