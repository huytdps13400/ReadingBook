import { createSlice } from "@reduxjs/toolkit"

const reduxSlice = createSlice({
    name: 'books',
    initialState: {
      loggedIn: false,
      bookmark: [],
      // bookdetails: []
      bookdetails: {
        current: [],
        wantTo: [],
        read: []
      },
      likedBooks: []
    },
    reducers: {
      // setBookmark(state, action) {
      //   state.bookmark = action.payload
      // },
      // setBookDetails(state, action) {
      //   state.bookdetails = action.payload
      // },
      // setLikedBooks(state, action) {
      //   state.likedBooks = action.payload
      // },
         setBook(state, action) {
        state.bookmark = action.payload
      },
    }
  })
  
  export const {  setBook,} = reduxSlice.actions
  export default reduxSlice.reducer