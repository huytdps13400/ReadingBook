import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Icons from "@expo/vector-icons/Ionicons";
import { theme } from "../../theme";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
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
} from '@expo-google-fonts/roboto';
import {
  Oswald_200ExtraLight,
  Oswald_300Light,
  Oswald_400Regular,
  Oswald_500Medium,
  Oswald_600SemiBold,
  Oswald_700Bold,
} from '@expo-google-fonts/oswald';

const Header = ({ title }) => {
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
  return (
    <>
      <StatusBar backgroundColor={theme.colors.orange} />

      <View
        style={[styles.container, { backgroundColor: theme.colors.orange }]}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icons name="arrow-back" size={24} color={"#fff"} />
        </TouchableOpacity>
       {fontsLoaded&& (<Text style={styles.title}>{title}</Text>)} 
      </View>
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    fontFamily:'Oswald_700Bold'
  },
});
