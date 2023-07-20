import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    podcast:[]
}

const podcastSlice = createSlice({
    name:"podcast",
    initialState,
    reducers: {
        setPodcast(state,action){
          state.podcast = action.payload
          console.log(state.podcast)
        }
      },
    })

    export const {setPodcast} = podcastSlice.actions  //exporting actions which further can be use
    export default podcastSlice.reducer
