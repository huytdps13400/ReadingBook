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

export const fetchFavoriteUser = createAsyncThunk(
  "books/favoriteUser",
  async (type, thunkAPI) => {
    const userRef = firebase.default.database().ref("/Favorite");
    const data = [];
    console.log({ type });
    await userRef.once("value", (snapshot) => {
      snapshot.forEach(function (childSnapshot) {
        if (type) {
          if (
            firebase.auth().currentUser.uid === childSnapshot.val()?.uid &&
            type === childSnapshot.val()?.type
          ) {
            const dataFilterBooks = thunkAPI
              .getState()
              .books.bookmark?.filter(
                (v) => v.id === childSnapshot.val()?.idBook
              )[0];
            data.push(dataFilterBooks);
          }
        } else {
          console.log("isCHeck---");
          if (firebase.auth().currentUser.uid === childSnapshot.val()?.uid) {
            data.push({ ...childSnapshot.val(), id: childSnapshot.key });
          }
        }
      });
    });
    return data;
  }
);

export const fetchBookUser = createAsyncThunk(
  "books/bookUser",
  async (userId, thunkAPI) => {
    const userRef = firebase.default.database().ref("/BookUser");
    const data = [];
    console.log({ userId });
    await userRef.once("value", (snapshot) => {
      snapshot.forEach(function (childSnapshot) {
        if (firebase.auth().currentUser.uid === childSnapshot.val()?.uid) {
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
    const filterData = data.filter((item, index) => {
      return data.indexOf(item) === index;
    });
    return filterData;
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
    bookFavorite: [],
    ratingCount: 0,
    bookUser: [],
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
    setFavoriteList(state, action) {
      state.bookFavorite = action.payload;
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
    builder.addCase(fetchFavoriteUser.pending, (state, action) => {
      // Add user to the state array
      state.bookFavorite = [];
    });
    builder.addCase(fetchFavoriteUser.rejected, (state, action) => {
      // Add user to the state array
      state.bookFavorite = [];
    });
    builder.addCase(fetchFavoriteUser.fulfilled, (state, action) => {
      // Add user to the state array
      console.log({ action: action.payload });
      state.bookFavorite = action.payload;
    });
    builder.addCase(fetchBookUser.pending, (state, action) => {
      // Add user to the state array
      state.bookUser = [];
    });
    builder.addCase(fetchBookUser.rejected, (state, action) => {
      // Add user to the state array
      state.bookUser = [];
    });
    builder.addCase(fetchBookUser.fulfilled, (state, action) => {
      // Add user to the state array
      console.log({ action: action.payload });
      state.bookUser = action.payload;
    });
  },
});

export const { setBook, setReviewList, setRatingCount, setFavoriteList } =
  reduxSlice.actions;
export default reduxSlice.reducer;
