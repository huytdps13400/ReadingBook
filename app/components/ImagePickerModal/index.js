import React from "react";
import { Image, TouchableOpacity, View, Text } from "react-native";
import styles from "./styles";
import ReactNativeModal from "react-native-modal";
import { theme } from "../../theme";
import { icons } from "../../assets";

const ImagePickerModal = ({
  isVisible,
  setIsVisible,
  onBackdropPress,
  openPicker,
  openCamera,
}) => {
  return (
    <ReactNativeModal
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      onBackdropPress={onBackdropPress}
    >
      <View
        style={{
          padding: 25,
          backgroundColor: "white",
        }}
      >
        <TouchableOpacity onPress={openPicker}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Image
              source={icons.openPicker}
              resizeMode="contain"
              style={{ ...styles.icon, tintColor: theme.colors.blue }}
            />
            <Text>Chọn ảnh từ thư viện</Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            height: 1,
            marginVertical: 5,
            backgroundColor: theme.colors.smoke,
          }}
        />
        <TouchableOpacity onPress={openCamera}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 10,
            }}
          >
            <Image
              source={icons.openCamera}
              resizeMode="contain"
              style={{ ...styles.icon, tintColor: theme.colors.blue }}
            />
            <Text>Chụp ảnh mới</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ReactNativeModal>
  );
};

export default ImagePickerModal;
