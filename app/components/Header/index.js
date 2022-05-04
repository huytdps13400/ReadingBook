import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Icons from "@expo/vector-icons/Ionicons";
import { theme } from "../../theme";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
const Header = ({ title }) => {
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
        <Text style={styles.title}>{title}</Text>
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
  },
});
