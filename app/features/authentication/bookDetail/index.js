import { View, Text } from 'react-native'
import React,{ useEffect, useState } from 'react'
import { firebase } from "../../../../config/firebaseconfig";
import Header from "../../../components/Header";
import TextInputForm from "../../../components/TextInputForm";
import Button from "../../../components/Button";
import { theme } from "../../../theme";
import { useNavigation,useIsFocused } from "@react-navigation/core";

const BookDetail = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  return (
    <View style={[styles.container, { paddingTop: inset.top }]} >
              <Header title="Edit Profile" />

      <Text>BookDetail</Text>
    </View>
  )
}

export default BookDetail
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
});