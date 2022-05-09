import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Alert,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { firebase } from "../../../../config/firebaseconfig";
import Header from "../../../components/Header";
import TextInputForm from "../../../components/TextInputForm";
import Button from "../../../components/Button";
import { theme } from "../../../theme";
import { useNavigation, useIsFocused } from "@react-navigation/core";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Rating, BottomSheet, ListItem } from "react-native-elements";
import {
  fetchFavoriteUser,
  setFavoriteList,
  setReviewList,
} from "../../../Redux/reduxSlice";
import {
  useFonts,
  Roboto_100Thin,
  Roboto_100Thin_Italic,
  Roboto_300Light,
  Roboto_300Light_Italic,
  Roboto_400Regular,
  Roboto_400Regular_Italic,
  Roboto_500Medium,
  Roboto_500Medium_Italic,
  Roboto_700Bold,
  Roboto_700Bold_Italic,
  Roboto_900Black,
  Roboto_900Black_Italic,
} from "@expo-google-fonts/roboto";
import {
  Oswald_200ExtraLight,
  Oswald_300Light,
  Oswald_400Regular,
  Oswald_500Medium,
  Oswald_600SemiBold,
  Oswald_700Bold,
} from "@expo-google-fonts/oswald";
import { useDispatch } from "react-redux";
import { fetchUserById, setRatingCount } from "../../../Redux/reduxSlice";
let bookOptions = [
  "Want to Read",
  "Start Reading",
  "Read",
  "Favorite Book",
  "Cancel Favorite Book",
  "Cancel",
];

const { width } = Dimensions.get("window");

const BookDetail = ({ route }) => {
  const navigation = useNavigation();
  const inset = useSafeAreaInsets();
  const [showSynopsis, setShowSynopsis] = useState(false);
  const dispatch = useDispatch();
  const [openSheet, setOpenSheet] = useState(false);

  const isFocused = useIsFocused();
  const { item: bookDetail } = route.params || {};
  const [infoBook, setInfoBook] = useState({});
  // const [reviewList, setReviewList] = useState([]);

  const bookAll = useSelector((state) => state.books.bookmark);
  const bookUser = useSelector((state) => state.books.bookUser);

  const reviewLists = useSelector((state) => state.books.reviewLists);
  const ratingCounts = useSelector((state) => state.books.ratingCount);
  const bookFavorite = useSelector((state) => state.books.bookFavorite);

  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  let [fontsLoaded] = useFonts({
    Roboto_100Thin,
    Roboto_100Thin_Italic,
    Roboto_300Light,
    Roboto_300Light_Italic,
    Roboto_400Regular,
    Roboto_400Regular_Italic,
    Roboto_500Medium,
    Roboto_500Medium_Italic,
    // Roboto_700Bold,
    Roboto_700Bold_Italic,
    Roboto_900Black,
    // Roboto_900Black_Italic,
    Oswald_200ExtraLight,
    Oswald_300Light,
    Oswald_400Regular,
    Oswald_500Medium,
    Oswald_600SemiBold,
    Oswald_700Bold,
  });
  // console.log({ bookAll });
  useEffect(() => {
    // console.log(
    //   "huy",
    //   bookAll,
    //   bookAll?.filter((v) => v.id === bookDetail?.id)[0]?.length > 0
    // );
    try {
      const dataBook = bookAll?.filter((v) => v.id === bookDetail?.id)[0];
      if (bookAll?.filter((v) => v.id === bookDetail?.id)[0]) {
        setInfoBook(dataBook);
      } else {
        firebase.default
          .database()
          .ref("Book/" + bookDetail?.id)
          .update(bookDetail)
          .then(() => {
            // Alert.alert(
            //         "Success",
            //         "Congratulations on your successful save",
            //         [
            //           {
            //             text: "OK",
            //             onPress: () =>
            //               navigation.navigate(routesName.HOME_SCREEN),
            //           },
            //         ]
            //       );
          })
          .catch((error) => {
            console.log("hahaa", error);
            console.error(error);
          });
        // firebase.default
        //   .database()
        //   .ref("BookUser/" + bookDetail?.id)
        //   .update(
        //     Object.assign(bookDetail, { uid: firebase.auth().currentUser.uid })
        //   )
        //   .then(() => {
        //     // Alert.alert(
        //     //         "Success",
        //     //         "Congratulations on your successful save",
        //     //         [
        //     //           {
        //     //             text: "OK",
        //     //             onPress: () =>
        //     //               navigation.navigate(routesName.HOME_SCREEN),
        //     //           },
        //     //         ]
        //     //       );
        //   })
        //   .catch((error) => {
        //     console.error(error);
        //   });
        setInfoBook(bookDetail);
      }
      // if (bookUser?.filter((v) => v.id === bookDetail?.id)[0]) {
      // } else {
      //   firebase.default
      //     .database()
      //     .ref("BookUser/" + bookDetail?.id)
      //     .update(
      //       Object.assign(bookDetail, { uid: firebase.auth().currentUser.uid })
      //     )
      //     .then(() => {
      //       // Alert.alert(
      //       //         "Success",
      //       //         "Congratulations on your successful save",
      //       //         [
      //       //           {
      //       //             text: "OK",
      //       //             onPress: () =>
      //       //               navigation.navigate(routesName.HOME_SCREEN),
      //       //           },
      //       //         ]
      //       //       );
      //     })
      //     .catch((error) => {
      //       console.error(error);
      //     });
      // }
    } catch (error) {
      console.log({ error });
    }
  }, [bookDetail?.id]);
  const showFullSynopsis = () => {
    setShowSynopsis((value) => !value);
    // console.log('message: ', bookMark)
  };
  useEffect(() => {
    if (infoBook?.id) {
      dispatch(fetchUserById(infoBook?.id));
      dispatch(fetchFavoriteUser(false));
    }
  }, [infoBook?.id, isFocused]);
  useEffect(() => {
    if (infoBook?.volumeInfo?.ratingsCount) {
      dispatch(setRatingCount(infoBook?.volumeInfo?.ratingsCount));
    }
  }, [infoBook?.id, isFocused]);
  console.log(
    bookFavorite?.some((v) => v.idBook === infoBook?.id),
    "kaka",
    bookFavorite
  );
  return (
    <View style={[styles.container, { paddingTop: inset.top }]}>
      <Header title="Book Details" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            alignItems: "center",
            paddingTop: 20,
            paddingHorizontal: 16,
          }}
        >
          {fontsLoaded && (
            <View
              style={{
                borderColor: "teal",
                borderWidth: 1,
                borderRadius: 10,
                padding: 20,
                width: width - 32,
              }}
            >
              <View style={styles.imageContainer}>
                <Image
                  style={styles.tinyLogo}
                  source={{
                    uri: infoBook?.volumeInfo?.imageLinks?.smallThumbnail,
                  }}
                />
              </View>
              <View style={styles.titleInfo}>
                <Text style={styles.title}>{infoBook?.volumeInfo?.title}</Text>
                <Text style={styles.author}>
                  by {infoBook?.volumeInfo?.authors}
                </Text>
                {infoBook?.volumeInfo?.categories ? (
                  <Text style={{ marginVertical: 10 }}>
                    {infoBook?.volumeInfo?.categories
                      ? infoBook?.volumeInfo?.categories[0]
                      : ""}
                  </Text>
                ) : null}
                <View style={styles.rating}>
                  <Rating
                    type="star"
                    startingValue={infoBook?.volumeInfo?.averageRating || 0}
                    readonly
                    imageSize={30}
                    style={{ paddingVertical: 10 }}
                  />
                  <Text style={styles.ratingNumber}>
                    {infoBook?.volumeInfo?.averageRating || 0} (
                    {ratingCounts || 0} ratings)
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    if (bookFavorite?.some((v) => v.idBook === infoBook?.id)) {
                      // const id = bookFavorite?.filter(
                      //   (v) => v.idBook === infoBook?.id
                      // )[0]?.id;
                      // firebase
                      //   .database()
                      //   .ref(`Favorite/${id}`)
                      //   .remove()
                      //   .then(() => {
                      //     const dataFilter = bookFavorite?.filter(
                      //       (v) => v.idBook !== infoBook?.id
                      //     );
                      //     setTimeout(() => {
                      //       dispatch(setFavoriteList(dataFilter));
                      //     }, 1000);
                      //     Alert.alert("Success", "successful evaluation");
                      //   })
                      //   .catch((error) => {
                      //     Alert.alert("Error", error.message);
                      //   });
                      setOpenSheet(true);
                    } else {
                      setOpenSheet(true);
                    }
                  }}
                >
                  <MaterialCommunityIcons
                    name={
                      bookFavorite?.some((v) => v.idBook === infoBook?.id)
                        ? "heart"
                        : "heart-outline"
                    }
                    // name="heart-outline"
                    size={32}
                    color={"red"}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
          <View style={{ width: "100%" }}>
            <View style={{ marginTop: 5 }}>
              <Text style={styles.synopsis}>Synopsis</Text>
              {!showSynopsis && (
                <Text style={{ fontFamily: "Roboto_400Regular_Italic" }}>
                  {infoBook?.volumeInfo?.description?.substring(0, 450)}...
                  <TouchableOpacity onPress={() => showFullSynopsis()}>
                    <Text style={styles.showMore}>Show more</Text>
                  </TouchableOpacity>
                </Text>
              )}
              {showSynopsis && (
                <Text style={{ fontFamily: "Roboto_400Regular_Italic" }}>
                  {infoBook?.volumeInfo?.description}
                  <TouchableOpacity onPress={() => showFullSynopsis()}>
                    <Text style={styles.showMore}>Show less</Text>
                  </TouchableOpacity>
                </Text>
              )}
            </View>
            <View style={styles.bottomContent}>
              <Text style={{ fontFamily: "Oswald_500Medium" }}>
                <Text style={styles.bottom}>Published:</Text>{" "}
                {infoBook?.volumeInfo?.publishedDate || 0}
              </Text>
              <Text style={{ fontFamily: "Oswald_500Medium" }}>
                <Text style={styles.bottom}>Pages:</Text>{" "}
                {infoBook?.volumeInfo?.pageCount || 0}
              </Text>
            </View>
            <View style={{ height: 10 }} />
            {reviewLists && reviewLists.length > 0 && (
              <FlatList
                data={reviewLists}
                renderItem={({ item, index }) => {
                  console.log({ item });
                  return (
                    <View
                      style={{
                        width: width - 40,
                        marginLeft: 5,
                        padding: 12,
                        flexDirection: "row",
                        marginVertical: 10,
                        backgroundColor: "white",
                        borderRadius: 8,
                        shadowColor: "#000",
                        shadowOffset: {
                          width: 0,
                          height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,

                        elevation: 5,
                      }}
                    >
                      <Image
                        source={{ uri: item.imageAvatar }}
                        style={{ height: 50, width: 50, borderRadius: 50 / 2 }}
                      />
                      <View style={{ paddingLeft: 10 }}>
                        <Text style={{ fontFamily: "Roboto_500Medium" }}>
                          {item.name}
                        </Text>
                        <Rating
                          type="star"
                          startingValue={item.rating || 0}
                          readonly
                          imageSize={15}
                          style={{ paddingVertical: 10 }}
                        />
                        <Text style={{ fontFamily: "Roboto_500Medium" }}>
                          {item.review}
                        </Text>
                      </View>
                      {item.uid === firebase.auth().currentUser.uid && (
                        <MaterialCommunityIcons
                          name="window-close"
                          size={24}
                          color={"red"}
                          style={{ position: "absolute", right: 10, top: 5 }}
                          onPress={() => {
                            firebase
                              .database()
                              .ref("Review/" + item.id)
                              .remove()
                              .then(() => {
                                Alert.alert("Success", "successful evaluation");
                                const arrayData = reviewLists?.filter(
                                  (v) => v.id !== item.id
                                );
                                dispatch(setReviewList(arrayData));
                                setTimeout(() => {
                                  dispatch(
                                    setRatingCount(
                                      ratingCounts ? ratingCounts - 1 : 1
                                    )
                                  );
                                }, 500);
                              })
                              .catch(() => {
                                Alert.alert("Error", "error evaluation");
                              });
                          }}
                        />
                      )}
                    </View>
                  );
                }}
                keyExtractor={(item, index) => index.toString()}
              />
            )}

            <Rating
              type="star"
              startingValue={rating}
              // ratingCount={rating}
              imageSize={30}
              style={{ paddingVertical: 10 }}
              onFinishRating={(rating) => {
                setRating(Number(rating));
                console.log("abc rating", rating);
              }}
            />
            <TextInputForm
              placeholder={"Review"}
              style={{
                borderWidth: 1,
                borderColor: theme.colors.placeholder,
                borderRadius: 4,
                paddingHorizontal: 12,
                height: width / 2,
              }}
              inputStyle={{
                height: width / 2,
              }}
              value={review}
              multiline={true}
              label="Review"
              onChangeText={(text) => setReview(text)}
              textAlignVertical={"top"}
            />
            <Button
              title={"Submit"}
              onPress={() => {
                if (review && rating) {
                  const key = firebase.database().ref("/Review").push().key;
                  firebase
                    .database()
                    .ref("Review/" + key)
                    .update({
                      uid: firebase.auth().currentUser.uid,
                      imageAvatar: firebase.auth().currentUser.photoURL,
                      name: firebase.auth().currentUser.displayName,
                      idBook: infoBook?.id,
                      rating: Number(rating),
                      review,
                    })
                    .then(() => {
                      setRating(Number(0));
                      const data = {
                        uid: firebase.auth().currentUser.uid,
                        imageAvatar: firebase.auth().currentUser.photoURL,
                        name: firebase.auth().currentUser.displayName,
                        idBook: infoBook?.id,
                        rating: Number(rating),
                        review,
                      };
                      const arrayData = [...reviewLists, data];
                      // setReviewList((value) => [...value, data]);
                      dispatch(setReviewList(arrayData));
                      setReview("");
                      setTimeout(() => {
                        firebase
                          .database()
                          .ref("Book/" + infoBook?.id)
                          .update({
                            volumeInfo: {
                              ...infoBook?.volumeInfo,
                              ratingsCount: ratingCounts ? ratingCounts + 1 : 1,
                            },
                          })
                          .then(() => {
                            setTimeout(() => {
                              dispatch(
                                setRatingCount(
                                  ratingCounts ? ratingCounts + 1 : 1
                                )
                              );
                            }, 500);

                            Alert.alert("Success", "successful evaluation");
                          })
                          .catch((error) => {
                            Alert.alert("Success", error?.message);
                          });
                      }, 1000);
                    })
                    .catch(() => {
                      Alert.alert("Error", "error evaluation");
                    });
                } else {
                  Alert.alert("Error", "Please complete review with rating");
                }
              }}
              backgroundColor={theme.colors.blue}
            />
            <BottomSheet modalProps={{}} isVisible={openSheet}>
              {bookOptions.map((l, i) => {
                if (
                  bookFavorite?.filter((v) => v.idBook === infoBook?.id)[0]
                    ?.type === l
                ) {
                  return null;
                }
                if (
                  !bookFavorite?.some((v) => v.idBook === infoBook?.id) &&
                  l === "Cancel Favorite Book"
                ) {
                  return null;
                }
                return (
                  <ListItem
                    key={i}
                    // containerStyle={l.containerStyle}
                    onPress={() => {
                      if (i !== 5) {
                        setOpenSheet(false);
                        if (i === 4) {
                          if (
                            bookFavorite?.some((v) => v.idBook === infoBook?.id)
                          ) {
                            const id = bookFavorite?.filter(
                              (v) => v.idBook === infoBook?.id
                            )[0]?.id;
                            firebase
                              .database()
                              .ref(`Favorite/${id}`)
                              .remove()
                              .then(() => {
                                const dataFilter = bookFavorite?.filter(
                                  (v) => v.idBook !== infoBook?.id
                                );
                                setTimeout(() => {
                                  dispatch(setFavoriteList(dataFilter));
                                }, 1000);
                                Alert.alert("Success", "successful evaluation");
                              })
                              .catch((error) => {
                                Alert.alert("Error", error.message);
                              });
                          }
                        } else {
                          if (
                            bookFavorite?.some((v) => v.idBook === infoBook?.id)
                          ) {
                            // const key = firebase
                            // .database()
                            // .ref("Favorite")
                            // .push().key;
                            const id = bookFavorite?.filter(
                              (v) => v.idBook === infoBook?.id
                            )[0]?.id;
                            firebase
                              .database()
                              .ref("Favorite/" + id)
                              .update({
                                idBook: infoBook?.id,
                                uid: firebase.auth().currentUser.uid,
                                type: l,
                              })
                              .then(() => {
                                // const data = [
                                //   ...bookFavorite,
                                //   {
                                //     idBook: infoBook?.id,
                                //     uid: firebase.auth().currentUser.uid,
                                //     type: l,
                                //   },
                                // ];
                                // dispatch(setFavoriteList(data));
                                Alert.alert("Success", "successful evaluation");
                              })
                              .catch((error) => {
                                Alert.alert("Success", error.message);
                              });
                          } else {
                            const key = firebase
                              .database()
                              .ref("Favorite")
                              .push().key;
                            firebase
                              .database()
                              .ref("Favorite/" + key)
                              .update({
                                idBook: infoBook?.id,
                                uid: firebase.auth().currentUser.uid,
                                type: l,
                              })
                              .then(() => {
                                const data = [
                                  ...bookFavorite,
                                  {
                                    idBook: infoBook?.id,
                                    uid: firebase.auth().currentUser.uid,
                                    type: l,
                                  },
                                ];
                                dispatch(setFavoriteList(data));
                                Alert.alert("Success", "successful evaluation");
                              })
                              .catch((error) => {
                                Alert.alert("Success", error.message);
                              });
                          }
                        }
                      }
                      setOpenSheet(false);
                    }}
                  >
                    <ListItem.Content>
                      <ListItem.Title>
                        <View style={styles.bottomSheet}>
                          <Text>{l}</Text>
                          {/* {i !== 3 && selectedOption === i ? (
                                <Text>
                                  <Icon name="done" color="green" />
                                </Text>
                              ) : i === 3 ? (
                                <Text>
                                  <Icon name="close" color="red" />
                                </Text>
                              ) : (
                                <></>
                              )} */}
                        </View>
                      </ListItem.Title>
                    </ListItem.Content>
                  </ListItem>
                );
              })}
            </BottomSheet>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default BookDetail;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  imageContainer: {
    display: "flex",
    alignItems: "center",
    paddingBottom: 20,
  },
  titleInfo: {
    alignItems: "center",
    padding: 5,
  },
  title: {
    // fontWeight: 'bold',
    fontSize: 20,
    fontFamily: "Oswald_700Bold",
  },
  author: {
    color: "grey",
    fontSize: 14,
    fontFamily: "Oswald_500Medium",
  },
  rating: {
    display: "flex",
    flexDirection: "row",
  },
  ratingNumber: {
    padding: 15,
    fontFamily: "Oswald_500Medium",
  },
  tinyLogo: {
    width: 130,
    height: 200,
  },
  synopsis: {
    // fontWeight: 'bold',
    fontSize: 18,
    paddingBottom: 10,
    fontFamily: "Oswald_700Bold",
  },
  showMore: {
    textDecorationLine: "underline",
    color: "teal",
    fontSize: 14,
  },
  bottomContent: {
    width: "100%",
    flexDirection: "row",
    marginTop: 15,
    justifyContent: "space-between",
  },
  bottomSheet: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: 400,
  },
});
