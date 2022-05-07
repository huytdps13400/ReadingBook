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

export const fetchUserReview = createAsyncThunk(
  "books/reviewsUser",
  async (bookAll, thunkAPI) => {
    const userRef = firebase.default.database().ref("/Review");
    const data = [];
    console.log({ bookAll });
    await userRef.once("value", (snapshot) => {
      snapshot.forEach(function (childSnapshot) {
        if (firebase.auth().currentUser.uid === childSnapshot.val()?.uid) {
          const abc = bookAll?.filter(
            (V) => V.id === childSnapshot.val()?.idBook
          )[0];
          data.push(abc);
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
    reviewListsUser: [],

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
    builder.addCase(fetchUserReview.pending, (state, action) => {
      // Add user to the state array
      state.reviewListsUser = [];
    });
    builder.addCase(fetchUserReview.rejected, (state, action) => {
      // Add user to the state array
      state.reviewListsUser = [];
    });
    builder.addCase(fetchUserReview.fulfilled, (state, action) => {
      // Add user to the state array
      console.log({ action: action.payload });
      state.reviewListsUser = action.payload;
    });
  },
});

export const { setBook, setReviewList, setRatingCount } = reduxSlice.actions;
export default reduxSlice.reducer;
