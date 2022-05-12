import {
  Oswald_200ExtraLight,
  Oswald_300Light,
  Oswald_400Regular,
  Oswald_500Medium,
  Oswald_600SemiBold,
  Oswald_700Bold,
} from "@expo-google-fonts/oswald";
import {
  Roboto_100Thin,
  Roboto_100Thin_Italic,
  Roboto_300Light,
  Roboto_300Light_Italic,
  Roboto_400Regular,
  Roboto_400Regular_Italic,
  Roboto_500Medium,
  Roboto_500Medium_Italic,
  Roboto_700Bold_Italic,
  Roboto_900Black,
  useFonts,
} from "@expo-google-fonts/roboto";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useIsFocused, useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BottomSheet, ListItem, Rating } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "../../../components/Button";
import Header from "../../../components/Header";
import TextInputForm from "../../../components/TextInputForm";
import { theme } from "../../../theme";
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
  const [openSheet, setOpenSheet] = useState(false);

  const isFocused = useIsFocused();
  const { item: bookDetail } = route.params || {};
  const [infoBook, setInfoBook] = useState({});
  // const [reviewList, setReviewList] = useState([]);

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

  const showFullSynopsis = () => {
    setShowSynopsis((value) => !value);
    // console.log('message: ', bookMark)
  };

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
                    uri: "https://cogaidiem.com/wp-content/plugins/penci-portfolio//images/no-thumbnail.jpg",
                  }}
                />
              </View>
              <View style={styles.titleInfo}>
                <Text style={styles.title}>Title</Text>
                <Text style={styles.author}>by authors</Text>
                <Text style={{ marginVertical: 10 }}>categories</Text>
                <View style={styles.rating}>
                  <Rating
                    type="star"
                    startingValue={0}
                    readonly
                    imageSize={30}
                    style={{ paddingVertical: 10 }}
                  />
                  <Text style={styles.ratingNumber}>
                    {0} ({0} ratings)
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setOpenSheet(true);
                  }}
                >
                  <MaterialCommunityIcons
                    name={"heart-outline"}
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
                  oakoasdsa...
                  <TouchableOpacity onPress={() => showFullSynopsis()}>
                    <Text style={styles.showMore}>Show more</Text>
                  </TouchableOpacity>
                </Text>
              )}
              {showSynopsis && (
                <Text style={{ fontFamily: "Roboto_400Regular_Italic" }}>
                  abc
                  <TouchableOpacity onPress={() => showFullSynopsis()}>
                    <Text style={styles.showMore}>Show less</Text>
                  </TouchableOpacity>
                </Text>
              )}
            </View>
            <View style={styles.bottomContent}>
              <Text style={{ fontFamily: "Oswald_500Medium" }}>
                <Text style={styles.bottom}>Published:</Text> {0}
              </Text>
              <Text style={{ fontFamily: "Oswald_500Medium" }}>
                <Text style={styles.bottom}>Pages:</Text> {0}
              </Text>
            </View>
            <View style={{ height: 10 }} />

            <FlatList
              data={[1, 2, 3, 4, 5]}
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
                      source={{
                        uri: "https://cogaidiem.com/wp-content/plugins/penci-portfolio//images/no-thumbnail.jpg",
                      }}
                      style={{ height: 50, width: 50, borderRadius: 50 / 2 }}
                    />
                    <View style={{ paddingLeft: 10 }}>
                      <Text style={{ fontFamily: "Roboto_500Medium" }}>
                        Tran Dinh Huy
                      </Text>
                      <Rating
                        type="star"
                        startingValue={0}
                        readonly
                        imageSize={15}
                        style={{ paddingVertical: 10 }}
                      />
                      <Text style={{ fontFamily: "Roboto_500Medium" }}>
                        review
                      </Text>
                    </View>

                    <MaterialCommunityIcons
                      name="window-close"
                      size={24}
                      color={"red"}
                      style={{ position: "absolute", right: 10, top: 5 }}
                      onPress={() => {}}
                    />
                  </View>
                );
              }}
              keyExtractor={(item, index) => index.toString()}
            />

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
              onPress={() => {}}
              backgroundColor={theme.colors.blue}
            />
            <BottomSheet modalProps={{}} isVisible={openSheet}>
              {bookOptions.map((l, i) => {
                return (
                  <ListItem
                    key={i}
                    // containerStyle={l.containerStyle}
                    onPress={() => {
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
