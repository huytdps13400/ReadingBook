import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { theme } from "../../../theme";
import { useNavigation, useIsFocused } from "@react-navigation/native";
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
import { fetchUserById, fetchFavoriteUser } from "../../../Redux/reduxSlice";
import { useSelector, useDispatch } from "react-redux";

const { width } = Dimensions.get("window");
let bookOptions = ["Want to Read", "Start Reading", "Read"];

const FavoriteScreen = () => {
  const inset = useSafeAreaInsets();
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
  const [type, setType] = useState("Want to Read");
  const dispatch = useDispatch();
  const bookFavorite = useSelector((state) => state.books.bookFavorite);

  useEffect(() => {
    if (isFocused) {
      dispatch(fetchFavoriteUser(type));
    }
  }, [type, isFocused]);

  const renderItemTab = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setType(item);
        }}
        key={index}
        style={{
          width: (width - 47) / 3,
          alignItems: "center",
          backgroundColor:
            type === item ? theme.colors.white : theme.colors.blue,
          justifyContent: "center",
          height: 45,
          borderRadius: 8,
          marginRight: 5,
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
        <Text
          style={{
            fontFamily: "Oswald_500Medium",
            color: type === item ? "black" : "white",
          }}
        >
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  const _renderItemBook = ({ item, index }) => {
    return (
      <View
        style={{
          width: width - 36,
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
          marginHorizontal: 2,
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
              maxWidth: (width - 32) * 0.45,
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
              Page: {item?.volumeInfo?.pageCount || 0}
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                // marginRight: 5,
                fontFamily: "Oswald_300Light",
              }}
            >
              Rating: {item?.volumeInfo?.averageRating || 0}
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
  console.log({ bookFavorite });
  return (
    <View style={[styles.container, { paddingTop: inset.top }]}>
      {fontsLoaded && (
        <View style={{ paddingHorizontal: 16 }}>
          <View style={{ flexDirection: "row" }}>
            {bookOptions.map(renderItemTab)}
          </View>
          <FlatList
            data={bookFavorite}
            renderItem={_renderItemBook}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      )}
    </View>
  );
};

export default FavoriteScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
});
