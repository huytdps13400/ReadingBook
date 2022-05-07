import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { theme } from "../../../theme";
import Button from "../../../components/Button";
import { firebase } from "../../../../config/firebaseconfig";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import Icons from "@expo/vector-icons/Ionicons";
import { routesName } from "../../../navigation/routes";
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
import { fetchUserReview, setRatingCount } from "../../../Redux/reduxSlice";
import { useSelector, useDispatch } from "react-redux";
const { width } = Dimensions.get("window");

const ProfileScreen = () => {
  const inset = useSafeAreaInsets();
  const [info, setInfo] = useState([]);
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
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const reviewListsUser = useSelector((state) => state.books.reviewListsUser);
  const bookAll = useSelector((state) => state.books.bookmark);

  useEffect(() => {
    if (isFocused && bookAll) {
      dispatch(fetchUserReview(bookAll));
    }
  }, [isFocused]);
  console.log({ reviewListsUser });

  useEffect(async () => {
    const userRef = firebase.default.database().ref("/User");

    const OnLoadingListener = userRef.on("value", (snapshot) => {
      setInfo([]);
      snapshot.forEach(function (childSnapshot) {
        if (
          firebase.default.auth()?.currentUser?.uid === childSnapshot.val()?.uid
        ) {
          setInfo((users) => [...users, childSnapshot.val()]);
          console.log("alal", childSnapshot.val());
        }
      });
    });
    const reviewRef = firebase.default.database().ref("/Review");

    const OnLoadingListeners = reviewRef.on("value", (snapshot) => {
      snapshot.forEach(function (childSnapshot) {
        if (
          firebase.default.auth()?.currentUser?.uid === childSnapshot.val()?.uid
        ) {
          firebase
            .database()
            .ref("Review/" + childSnapshot.key)
            .update({
              imageAvatar: firebase.auth().currentUser?.photoURL,
              name: firebase.auth().currentUser?.displayName,
            })
            .then(() => {})
            .catch((error) => {
              console.log(error);
            });
        }
      });
    });
    return () => {
      userRef.off("value", OnLoadingListener);
      reviewRef.off("value", OnLoadingListeners);
    };
  }, [isFocused]);
  useEffect(() => {
    if (!isFocused) return;
  }, [isFocused]);

  console.log("info", info);
  const _renderItemBook = (item, index) => {
    return (
      <View
        style={{
          width: "100%",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          marginVertical: 10,
          borderRadius: 8,
          elevation: 5,
          paddingBottom: 10,

          backgroundColor: "white",
          flexDirection: "row",
        }}
      >
        {item.volumeInfo?.imageLinks?.thumbnail && (
          <Image
            resizeMode="cover"
            style={{
              width: (width - 32) * 0.5,
              height: 150,
              borderTopLeftRadius: 8,
              borderBottomLeftRadius: 8,
            }}
            source={{
              uri:
                item.volumeInfo?.imageLinks?.thumbnail.replace(
                  "zoom=1",
                  "zoom=1"
                ) ||
                "https://cogaidiem.com/wp-content/plugins/penci-portfolio//images/no-thumbnail.jpg",
            }}
          />
        )}

        <View style={{ width: (width - 32) * 0.5, paddingLeft: 4 }}>
          <Text
            style={{
              fontSize: 19,
              marginBottom: 10,
              fontWeight: "bold",
              fontFamily: "Oswald_700Bold",
            }}
            numberOfLines={3}
          >
            {item?.volumeInfo?.title}
          </Text>
          {typeof item?.volumeInfo?.authors !== "undefined" &&
            item?.volumeInfo?.authors.map((item, index) => {
              return (
                <Text
                  style={{
                    fontSize: 16,
                    marginBottom: 10,
                    fontFamily: "Oswald_500Medium",
                  }}
                  key={index}
                >
                  by {item}
                </Text>
              );
            })}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              flex: 1,
              width: (width - 32) * 0.4,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                fontFamily: "Oswald_300Light",
              }}
            >
              Page: {item.volumeInfo.pageCount || 0}
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                // marginRight: 5,
                fontFamily: "Oswald_300Light",
              }}
            >
              Rating: {item.volumeInfo.averageRating || 0}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate(routesName.BOOK_DETAIL_SCREEN, { item });
            }}
            style={{
              marginTop: 10,
              width: 100,
              height: 45,
              borderColor: "red",
              borderRadius: 50 / 2,
              borderWidth: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                fontFamily: "Oswald_500Medium",
              }}
            >
              Detail
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <View style={[styles.container, { paddingTop: inset.top }]}>
      <ScrollView>
        {fontsLoaded && (
          <>
            <View style={{ flexDirection: "row", paddingHorizontal: 16 }}>
              <Image
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: 90 / 2,
                }}
                source={{
                  uri: firebase.default.auth()?.currentUser?.photoURL
                    ? firebase.default.auth()?.currentUser?.photoURL
                    : "https://freesvg.org/img/myAvatar.png",
                }}
              />
              <View
                style={{
                  paddingLeft: 30,
                  paddingTop: 10,
                  flex: 1,
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    fontFamily: "Oswald_700Bold",
                  }}
                >
                  {info[0]?.username}
                </Text>
                <View style={{ height: 5 }} />
                <Text style={{ fontFamily: "Oswald_500Medium" }}>
                  {info[0]?.email}
                </Text>
                <View style={{ height: 5 }} />
                <Text style={{ fontFamily: "Oswald_500Medium" }}>
                  {info[0]?.phone}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(routesName.EDIT_PROFILE_SCREEN, {
                    profile: info[0],
                  })
                }
              >
                <Icons name="create-outline" size={24} />
              </TouchableOpacity>
            </View>
            <View style={{ marginHorizontal: 20 }}>
              <Button
                title={"Change Password"}
                backgroundColor={theme.colors.orange}
                onPress={() => {
                  navigation.navigate(routesName.CHANGE_PASSWORD_SCREEN);
                }}
              />
              <Button
                title={"LogOut"}
                backgroundColor={theme.colors.orange}
                onPress={() => {
                  firebase.default.auth().signOut();
                }}
              />
              <Text style={{ fontFamily: "Oswald_700Bold", fontSize: 20 }}>
                List Review
              </Text>
              {<View>{reviewListsUser.map(_renderItemBook)}</View>}
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
});
