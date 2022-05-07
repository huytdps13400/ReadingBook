import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Linking,
  FlatList,
  ImageBackground,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { theme } from "../../../theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Carousel from "react-native-snap-carousel";
import { firebase } from "../../../../config/firebaseconfig";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { routesName } from "../../../navigation/routes";
import TextInputForm from "../../../components/TextInputForm";
export const API_BOOKS_KEY = "AIzaSyB-OtACxBjF7rAudHEmIH_vT_CAu2d6p5U";
export const GOOGLE_BOOKS_URL = "https://www.googleapis.com/books";
export const KEY_HEADER = " :keyes&key=" + API_BOOKS_KEY;
export const ALL_EBOOKS_ENDPOInT = "/v1/volumes?q=";
export const FREE_BOOKS_ENPOINT = "/v1/volumes?q=flowers&filter=free-ebooks";
import { useDispatch } from "react-redux";
import { setBook } from "../../../Redux/reduxSlice";

export async function getData(url, endpoint) {
  try {
    const fullURL = url + endpoint;
    console.log(fullURL);
    const response = await fetch(fullURL);
    const responseJson = await response.json();
    return responseJson;
  } catch (error) {
    return error.toString();
  }
}
export const getAllEbooks = async (bookName) => {
  const endpoint = ALL_EBOOKS_ENDPOInT + bookName + KEY_HEADER;
  return await getData(GOOGLE_BOOKS_URL, endpoint);
};
export const getFreeEBooks = async () => {
  const endpoint = FREE_BOOKS_ENPOINT + KEY_HEADER;
  return await getData(GOOGLE_BOOKS_URL, endpoint);
};
const dataCategory = [
  { label: "Chính trị – pháp luật", value: 7 },
  { label: "Khoa học công nghệ – Kinh tế", value: 1 },
  { label: "Văn học nghệ thuật", value: 2 },

  { label: "Văn hóa xã hội – Lịch sử", value: 3 },
  { label: "Giáo trình", value: 4 },

  { label: "Truyện, tiểu thuyết", value: 5 },
  { label: "Tâm lý, tâm linh, tôn giáo", value: 6 },

  { label: "Sách thiếu nhi", value: 6 },
];
const { width } = Dimensions.get("window");
const HomeScreen = () => {
  const inset = useSafeAreaInsets();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [DataBook, setDataBook] = useState([]);
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();
  // useEffect(async () => {
  //   const userRef = firebase.default.database().ref('/Book');

  //   const OnLoadingListener = userRef.on('value', (snapshot) => {
  //     setDataBook([]);
  //     snapshot.forEach(function (childSnapshot) {
  //       if(firebase.default.auth()?.currentUser?.uid === childSnapshot.val()?.uid){
  //         setDataBook((users) => [...users, childSnapshot.val()]);
  //         console.log('alal',childSnapshot.val())
  //       }

  //     });
  //   });
  //   return () => {
  //     userRef.off('value', OnLoadingListener);

  //   };
  // }, [isFocused]);
  useEffect(async () => {
    await getAllEbooks(keyword).then((res) => {
      setDataBook(res.items);
      console.log({ data: res.items });
    });
  }, [isFocused, keyword]);

  useEffect(() => {
    const BookRef = firebase.default.database().ref("/Book");
    const data = [];
    const OnLoadingListener = BookRef.on("value", (snapshot) => {
      snapshot.forEach(function (childSnapshot) {
        data.push(childSnapshot.val());
      });
      dispatch(setBook(data));
    });
    return () => {
      BookRef.off("value", OnLoadingListener);
    };
  }, [isFocused]);
  const _renderItem = ({ item, index }) => {
    return (
      <ImageBackground
        imageStyle={{
          borderRadius: 5,
          height: 200,
          width: width - 32,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        }}
        style={{
          height: 200,
          width: width - 32,
          elevation: 8,
        }}
        resizeMode="contain"
        source={{
          uri:
            typeof item?.volumeInfo?.authors !== "undefined"
              ? item.volumeInfo?.imageLinks?.smallThumbnail?.replace(
                  "zoom=1",
                  "zoom=2"
                )
              : "",
        }}
      >
        <Text
          style={{
            fontSize: 30,
            position: "absolute",
            bottom: 50,
            left: 10,
            color: "black",
          }}
        >
          {item?.volumeInfo?.title}
        </Text>
        <Text
          style={{
            fontSize: 20,
            position: "absolute",
            bottom: 20,
            left: 10,
            color: "black",
          }}
        >
          {item.author}
        </Text>
      </ImageBackground>
    );
  };
  const _renderItemBook = ({ item, index }) => {
    console.log("rating", item.volumeInfo?.ratingsCount);
    const category = dataCategory.filter((v) => v?.value === item?.category)[0]
      ?.label;
    return (
      <View
        style={{
          width: width - 32,
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
          // paddingBottom:10,
          marginHorizontal: 16,
          backgroundColor: "white",
          flexDirection: "row",
        }}
      >
        {item.volumeInfo?.imageLinks?.thumbnail && (
          <Image
            resizeMode="cover"
            style={{ width: (width - 32) * 0.5, height: 300 }}
            source={{
              uri:
                item.volumeInfo?.imageLinks?.thumbnail.replace(
                  "zoom=1",
                  "zoom=1"
                ) || null,
            }}
          />
        )}

        <View style={{ width: (width - 32) * 0.5, paddingLeft: 10 }}>
          <Text
            style={{ fontSize: 19, marginBottom: 10, fontWeight: "bold" }}
            numberOfLines={3}
          >
            {item?.volumeInfo?.title}
          </Text>
          {typeof item?.volumeInfo?.authors !== "undefined" &&
            item?.volumeInfo?.authors.map((item, index) => {
              return (
                <Text style={{ fontSize: 16, marginBottom: 10 }} key={index}>
                  by {item}
                </Text>
              );
            })}
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontSize: 16, fontWeight: "600" }}>
              Page: {item.volumeInfo.pageCount || 0}
            </Text>
            <Text style={{ fontSize: 16, fontWeight: "600", marginRight: 5 }}>
              Rating: {item.volumeInfo.averageRating || 0}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate(routesName.BOOK_DETAIL_SCREEN, { item });
            }}
            style={{
              marginTop: 20,
              width: 100,
              height: 45,
              borderColor: "red",
              borderRadius: 100 / 2,
              borderWidth: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "600" }}>Detail</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const handleKeyword = React.useCallback((text) => {
    setKeyword(text);
  }, []);
  return (
    <View style={[styles.container, { paddingTop: inset.top }]}>
      <ScrollView
        style={{
          flex: 1,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ paddingHorizontal: 16 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>DashBoard</Text>
          <TextInputForm
            style={{
              marginVertical: 10,
              borderRadius: 4,
              borderWidth: 1,
              paddingHorizontal: 12,
              borderColor: theme.colors.lightGray,
            }}
            placeholder="Search Keyword...."
            value={keyword}
            onChangeText={(text) => handleKeyword(text)}
          />
          <View style={{ height: 30 }} />
          {DataBook ? (
            <Carousel
              data={DataBook?.slice(0, 5)}
              renderItem={_renderItem}
              sliderWidth={width - 32}
              itemWidth={width - 32}
              loop
              autoplay
              autoplayDelay={3000}
              horizontal
            />
          ) : null}

          <View style={{ height: 30 }} />

          <Text style={{ fontSize: 20, fontWeight: "bold" }}>List Book</Text>
          <View style={{ height: 30 }} />
        </View>
        <FlatList
          data={DataBook}
          renderItem={_renderItemBook}
          keyExtractor={(item, index) => item.id.toString()}
          contentContainerStyle={{ flex: 1 }}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => {
            return <View style={{ width: 10 }} />;
          }}
          ListEmptyComponent={() => {
            return (
              <View
                style={{
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontSize: 30 }}>No Data</Text>
              </View>
            );
          }}
        />
        <View style={{ height: inset.bottom + 100 }} />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
});
