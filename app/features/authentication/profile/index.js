import { View, Text, StyleSheet ,Image,TouchableOpacity} from "react-native";
import React,{useState,useEffect} from "react";
import { theme } from "../../../theme";
import Button from "../../../components/Button";
import { firebase } from "../../../../config/firebaseconfig";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation,useIsFocused } from "@react-navigation/native";
import Icons from "@expo/vector-icons/Ionicons";
import { routesName } from "../../../navigation/routes";

const MoreScreen = () => {
  const inset = useSafeAreaInsets();
  const [info, setInfo] = useState([]);

  const navigation = useNavigation();
  const isFocused = useIsFocused();
  useEffect(async () => {
    const userRef = firebase.default.database().ref('/User');

    const OnLoadingListener = userRef.on('value', (snapshot) => {
      setInfo([]);
      snapshot.forEach(function (childSnapshot) {
        if(firebase.default.auth().currentUser.uid === childSnapshot.val()?.uid){
          setInfo((users) => [...users, childSnapshot.val()]);
          console.log('alal',childSnapshot.val())
        }
        
      });
    });
    return () => {
      userRef.off('value', OnLoadingListener);
    
    };
  }, [isFocused]);
  console.log('info',info)
  return (
    <View style={[styles.container, { paddingTop: inset.top }]}>
      <View style={{ flexDirection: "row" }}>
        <Image
          style={{ width: 90, height: 90, borderRadius: 90 }}
          resizeMode="contain"
          source={{
            uri: firebase.default.auth()?.currentUser?.photoURL
              ?firebase.default.auth()?.currentUser.photoURL
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
      <Button
        title={"LogOut"}
        backgroundColor={theme.colors.orange}
        onPress={() => {
         firebase.default.auth().signOut();
        }}
      />
      <Text>MoreScreen</Text>
    </View>
  );
};

export default MoreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
});
