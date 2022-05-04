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

const TextInputForm = ({
  style,
  inputStyle,
  issecure = false,
  errorMessage,
  label,
  ...rest
}) => {
  const [isSecure, setIsSecure] = useState(true);
  return (
    <>
      {label && <Text style={{ marginBottom: 5 }}>{label}</Text>}
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
          style={[inputStyle, { flex: 1 }]}
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
