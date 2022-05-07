import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { theme } from "../../../theme";
import Button from "../../../components/Button";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icons from "@expo/vector-icons/Ionicons";
import Header from "../../../components/Header";
import TextInputForm from "../../../components/TextInputForm";
import { routesName } from "../../../navigation/routes";
import { useNavigation, useIsFocused } from "@react-navigation/core";
import { firebase } from "../../../../config/firebaseconfig";
import * as ImagePicker from "expo-image-picker";
import uuid from "react-native-uuid";

const { width } = Dimensions.get("window");

const EditProfileScreen = ({ route }) => {
  const { profile } = route.params || {};
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const uid = firebase.default.auth().currentUser.uid;
  const inset = useSafeAreaInsets();
  const [info, setInfo] = useState([]);
  const [username, setUserName] = useState(profile?.username);
  const [address, setAddress] = useState(profile?.address);
  const [phone, setPhone] = useState(profile?.phone);
  const [age, setAge] = useState(profile?.age);
  const [image, setImage] = useState(null);
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [isLoadingSave, setIsLoadingSave] = useState(false);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(`${result.uri}`);
    }
  };
  async function uploadImageAsync(uri, checkId, key) {
    const user = firebase.default.auth().currentUser;
    let imageUrl = "";
    if (uri) {
      const blob = await new Promise((resolve, reject) => {
        setIsLoadingImage(true);

        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e) {
          console.log(e);
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
      });
      const uid22 = uuid.v4();
      const fileRef = firebase.default.storage().ref("Avatar/" + uid22);
      const result = await firebase.default
        .storage()
        .ref("Avatar/" + uid22)
        .put(blob)
        .then(() => {
          fileRef.getDownloadURL().then((url) => {
            imageUrl = url;
            if (url) {
              user
                .updateProfile({
                  photoURL: imageUrl,
                  displayName: username,
                })
                .then(() => {
                  const data = {
                    photoURL: imageUrl,
                    address: address,
                    email: profile?.email,
                    username,
                    phone,
                    age,
                  };
                  firebase.default
                    .database()
                    .ref("User/" + uid)
                    .update(data)
                    .then(() => {
                      Alert.alert(
                        "Success",
                        "Congratulations on your successful save",
                        [
                          {
                            text: "OK",
                            onPress: () =>
                              navigation.navigate(routesName.PROFILE_SCREEN),
                          },
                        ]
                      );
                    })
                    .catch((error) => {
                      console.error(error);
                    });
                });
              return;
            }
          });
        });
      blob.close();
      setIsLoadingImage(false);
      console.log({ imageUrl });
    } else {
      const data = {
        address: address,
        email: profile?.email,
        username,
        phone,
        age,
      };
      console.log("data", data);
      firebase.default
        .database()
        .ref("User/" + uid)
        .update(data)
        .then(() => {
          Alert.alert("Success", "Congratulations on your successful save", [
            {
              text: "OK",
              onPress: () => navigation.navigate(routesName.PROFILE_SCREEN),
            },
          ]);
        })
        .catch((error) => {
          console.log(error, "kaka22");
        });
    }
  }
  useEffect(async () => {
    const userRef = firebase.default.database().ref("/User");

    const OnLoadingListener = userRef.on("value", (snapshot) => {
      setInfo([]);
      snapshot.forEach(function (childSnapshot) {
        if (
          firebase.default.auth().currentUser.uid === childSnapshot.val()?.uid
        ) {
          setInfo((users) => [...users, childSnapshot.val()]);
        }
      });
    });
    return () => {
      userRef.off("value", OnLoadingListener);
      firebase.default.auth().currentUser.uid = "";
    };
  }, [isFocused]);

  // console.log("info", info);
  return (
    <View style={[styles.container, { paddingTop: inset.top }]}>
      <Header title="Edit Profile" />
      <ScrollView>
        <View style={{ paddingHorizontal: 16, paddingTop: 20 }}>
          <TouchableOpacity
            style={{
              width: 90,
              height: 90,
              borderRadius: 90,
              alignSelf: "center",
            }}
            onPress={() => {
              pickImage();
            }}
          >
            <Image
              style={{
                width: 90,
                height: 90,
                borderRadius: 90,
                alignItems: "center",
              }}
              resizeMode="contain"
              source={{
                uri: image
                  ? image
                  : firebase.default.auth()?.currentUser?.photoURL
                  ? firebase.default.auth()?.currentUser.photoURL
                  : "https://freesvg.org/img/myAvatar.png",
              }}
            />
          </TouchableOpacity>

          <TextInputForm
            placeholder={"Username"}
            style={{
              borderWidth: 1,
              borderColor: theme.colors.placeholder,
              borderRadius: 4,
              paddingHorizontal: 12,
            }}
            value={username}
            label="Username"
            onChangeText={(text) => setUserName(text)}
          />
          <View style={{ height: 10 }} />
          <TextInputForm
            placeholder={"Address"}
            style={{
              borderWidth: 1,
              borderColor: theme.colors.placeholder,
              borderRadius: 4,
              paddingHorizontal: 12,
            }}
            value={address}
            label="Address"
            onChangeText={(text) => setAddress(text)}
          />
          <View style={{ height: 10 }} />
          <TextInputForm
            placeholder={"Phone"}
            style={{
              borderWidth: 1,
              borderColor: theme.colors.placeholder,
              borderRadius: 4,
              paddingHorizontal: 12,
            }}
            value={phone}
            label="Phone"
            onChangeText={(text) => setPhone(text)}
          />
          <View style={{ height: 10 }} />
          <TextInputForm
            placeholder={"Age"}
            style={{
              borderWidth: 1,
              borderColor: theme.colors.placeholder,
              borderRadius: 4,
              paddingHorizontal: 12,
            }}
            value={age}
            label="Age"
            onChangeText={(text) => setAge(text)}
          />
          <Button
            isLoading={isLoadingImage}
            title="Save"
            onPress={() => {
              uploadImageAsync(image, "", "");
            }}
            backgroundColor={theme.colors.orange}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
});
