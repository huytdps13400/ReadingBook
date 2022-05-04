import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";
import { theme } from "../../theme";

const Button = ({ title, backgroundColor, onPress, disabled, isLoading }) => {
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
      <Text
        style={{
          fontSize: 17,
          color: theme.colors.white,
          fontWeight: "bold",
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
