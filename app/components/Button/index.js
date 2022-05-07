import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";
import { theme } from "../../theme";
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

const Button = ({ title, backgroundColor, onPress, disabled, isLoading }) => {
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
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={{
        flexDirection: "row",
        justifyContent: "center",
        height: 50,
        alignItems: "center",
        width: "100%",
        backgroundColor,
        borderRadius: 4,
        marginVertical: 20,
      }}
    >
      {isLoading ? <ActivityIndicator size={24} color="#fff" /> : null}
     {fontsLoaded && (<Text
        style={{
          fontSize: 17,
          color: theme.colors.white,
          fontWeight: "bold",
          fontFamily:'Roboto_900Black'
        }}
      >
        {title}
      </Text>)} 
    </TouchableOpacity>
  );
};

export default Button;
