import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slice/Userslice";  //as we change name of export here ,actually it is userSlice
import podcastReducer from "./Slice/Podcastslice" //as we change name of export here ,actually it is podcastslice

export default configureStore({
    reducer:{

        user:userReducer,
        podcast:podcastReducer
    }
   

})