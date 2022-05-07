import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
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
const TextInputForm = ({
  style,
  inputStyle,
  issecure = false,
  errorMessage,
  label,
  ...rest
}) => {
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
  const [isSecure, setIsSecure] = useState(true);
  return (
    <>
      {label && <Text style={{ marginBottom: 5 ,          fontFamily:'Roboto_500Medium'
}}>{label}</Text>}
      <View
        style={[
          {
            height: 45,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          },
          style,
        ]}
      >
        <TextInput
          style={[inputStyle, { flex: 1 ,fontFamily:'Roboto_500Medium'}]}
          {...rest}
          secureTextEntry={isSecure && issecure}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          autoCorrect={false}
        />
        {/* check show mật khẩu */}
        {issecure ? (
          <TouchableOpacity onPress={() => setIsSecure(!isSecure)}>
            {isSecure ? (
              <Ionicons name="eye" size={24} color="black" />
            ) : (
              <Ionicons name="eye-off" size={24} color="black" />
            )}
          </TouchableOpacity>
        ) : null}
      </View>
      {/* kiểm tra xem có lỗi từ validation không ? */}
      {Boolean(errorMessage) && (
        <Text style={{ fontSize: 14, color: theme.colors.red }}>
          {errorMessage}
        </Text>
      )}
    </>
  );
};

export default TextInputForm;

const styles = StyleSheet.create({
  container: {},
});
