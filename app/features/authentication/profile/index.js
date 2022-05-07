import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { theme } from "../../../theme";
import Button from "../../../components/Button";
import { firebase } from "../../../../config/firebaseconfig";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import Icons from "@expo/vector-icons/Ionicons";
import { routesName } from "../../../navigation/routes";

const ProfileScreen = () => {
  const inset = useSafeAreaInsets();
  const [info, setInfo] = useState([]);

  const navigation = useNavigation();
  const isFocused = useIsFocused();
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
  return (
    <View style={[styles.container, { paddingTop: inset.top }]}>
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
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            {info[0]?.username}
          </Text>
          <View style={{ height: 5 }} />
          <Text>{info[0]?.email}</Text>
          <View style={{ height: 5 }} />
          <Text>{info[0]?.phone}</Text>
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
      </View>
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
