import { useIsFocused, useNavigation } from "@react-navigation/core";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "../../../components/Button";
import Header from "../../../components/Header";
import TextInputForm from "../../../components/TextInputForm";
import { theme } from "../../../theme";

const { width } = Dimensions.get("window");

const EditProfileScreen = ({ route }) => {
  const { profile } = route.params || {};
  const navigation = useNavigation();
  const isFocused = useIsFocused();
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
                uri: "https://freesvg.org/img/myAvatar.png",
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
            onPress={() => {}}
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
