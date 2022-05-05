import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Keyboard,
  Alert
} from "react-native";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { theme } from "../../../theme";
import TextInputForm from "../../../components/TextInputForm";
import Button from "../../../components/Button";
import FormContainer from "../../../components/FormContainer";
import { useNavigation } from "@react-navigation/native";
import { routesName } from "../../../navigation/routes";
import { Controller, useForm } from "react-hook-form";

// sử dụng thư viện react-hook-form để bắt lỗi cho form
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "./loginValidation";
import {firebase} from "../../../../config/firebaseconfig";
// import { signInWithEmailAndPassword } from "firebase/auth";
//thư viện yup lấy được từ hookform

const LoginScreen = () => {
  const inset = useSafeAreaInsets();
  const navigation = useNavigation();
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
    resolver: yupResolver(loginSchema),
  });
  const onSubmit = handleSubmit(({ email, password }) => {
    Keyboard.dismiss();
    setIsLoadingLogin(true);
  firebase.default.auth().signInWithEmailAndPassword( email, password)
      .then(() => {
        setIsLoadingLogin(false);
        // setTimeout(() => {
        //   navigation.navigate(routesName.BOTTOM_BAR);
        // }, 500);
      })
      .catch((error) => {
        setIsLoadingLogin(false);
        const { message} = error;

        Alert.alert(
          "Error",
          message,
          [
            {
              text: "OK",
              style:'cancel',
             
            },
          ]
        );
        console.log(error);
      });
  });

  // đây là thư viện để độ cao độ thấp của màn hình so với statusbar
  return (
    <View style={[styles.container, { paddingTop: inset.top }]}>
      {/* // FormContainer là keyboardAvoiding bao cả view */}
      <FormContainer>
        <View style={styles.boxLogo}>
          <Image
            source={{
              uri: "http://unblast.com/wp-content/uploads/2020/04/Man-Reading-a-Book-Vector-Illustration-1.jpg",
            }}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.textWelcome}>Welcome</Text>
        <Text style={styles.textLet}>Let's get started!</Text>
        <View>
          {/* Viết một input để sài cho nhiều lần */}
          {/* sử dụng Controller của react hook form để xử lí lấy được value và bắt lỗi  */}
          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInputForm
                style={{
                  marginVertical: 10,
                  borderRadius: 4,
                  borderWidth: 1,
                  paddingHorizontal: 12,
                  borderColor: theme.colors.lightGray,
                }}
                keyboardType="email-address"
                placeholder="Email"
                returnKeyType="next"
                placeholderTextColor={theme.colors.placeholder}
                onChangeText={onChange}
                value={value}
                errorMessage={errors?.email?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInputForm
                style={{
                  marginVertical: 10,
                  borderRadius: 4,
                  borderWidth: 1,
                  paddingHorizontal: 12,
                  borderColor: theme.colors.lightGray,
                }}
                issecure
                placeholder="Password"
                returnKeyType="done"
                placeholderTextColor={theme.colors.placeholder}
                errorMessage={errors?.password?.message}
                value={value}
                onSubmitEditing={onSubmit}
                onChangeText={onChange}
              />
            )}
          />

          {/* Button cũng vậy viết 1 lần sử dụng nhiều lần  */}
          <Button
            disabled={isLoadingLogin}
            backgroundColor={theme.colors.orange}
            title="Login"
            onPress={onSubmit}
            isLoading={isLoadingLogin}
          />
          <Button
            onPress={() => navigation.navigate(routesName.SIGNUP_SCREEN)}
            backgroundColor={theme.colors.blues}
            title="New to Book ? Sign Up"
          />
        </View>
      </FormContainer>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  iconLogin: {
    height: 45,
    width: 45,
    borderRadius: 45,
    marginHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 140,
    height: 140,
    marginTop: 100,
  },
  boxLogo: {
    alignItems: "center",
  },
  textWelcome: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 30,
    color: theme.colors.orange,
  },
  textLet: {
    fontSize: 20,
    marginTop: 10,
    color: theme.colors.opacityText,
  },
});
