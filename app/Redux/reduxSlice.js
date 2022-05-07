import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { firebase } from "../../config/firebaseconfig";

export const fetchUserById = createAsyncThunk(
  "books/reviews",
  async (userId, thunkAPI) => {
    const userRef = firebase.default.database().ref("/Review");
    const data = [];
    console.log({ userId });
    await userRef.once("value", (snapshot) => {
      snapshot.forEach(function (childSnapshot) {
        if (userId === childSnapshot.val()?.idBook) {
          data.push({ ...childSnapshot.val(), id: childSnapshot.key });
        }
      });
    });
    return data;
  }
);
const reduxSlice = createSlice({
  name: "books",
  initialState: {
    loggedIn: false,
    bookmark: [],
    // bookdetails: []
    bookdetails: {
      current: [],
      wantTo: [],
      read: [],
    },
    likedBooks: [],
    reviewLists: [],
    ratingCount: 0,
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
      state.bookmark = action.payload;
    },
    setReviewList(state, action) {
      state.reviewLists = action.payload;
    },
    setRatingCount(state, action) {
      state.ratingCount = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserById.pending, (state, action) => {
      // Add user to the state array
      state.reviewLists = [];
    });
    builder.addCase(fetchUserById.rejected, (state, action) => {
      // Add user to the state array
      state.reviewLists = [];
    });
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      // Add user to the state array
      console.log({ action: action.payload });
      state.reviewLists = action.payload;
    });
  },
});

export const { setBook, setReviewList, setRatingCount } = reduxSlice.actions;
export default reduxSlice.reducer;
