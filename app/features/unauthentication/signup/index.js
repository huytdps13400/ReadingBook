import { View, Text, StyleSheet, Image, Keyboard } from "react-native";
import React, { useState } from "react";
import FormContainer from "../../../components/FormContainer";
import TextInputForm from "../../../components/TextInputForm";
import Button from "../../../components/Button";
import { theme } from "../../../theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { routesName } from "../../../navigation/routes";
import { Controller, useForm } from "react-hook-form";

// sử dụng thư viện react-hook-form để bắt lỗi cho form
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "./signupValidation";
import { firebase } from "../../../../config/firebaseconfig";



const SignUpScreen = () => {
  const inset = useSafeAreaInsets();

  const navigation = useNavigation();
  const [isLoadingSignUp, setIsLoadingSignUp] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      address: "",
      phone: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      age:""
    },
    mode: "onChange",
    resolver: yupResolver(signupSchema),
  });
  const onSubmit = handleSubmit(
    ({ email, password, address, phone, username ,age}) => {
      Keyboard.dismiss();
      setIsLoadingSignUp(true);
    firebase.default.auth().createUserWithEmailAndPassword( email, password)
        .then(() => {
          const uid = firebase.default.auth().currentUser.uid;
          const reference = firebase.default.database().ref('User/'+uid)

          firebase.default.database().ref(reference).update({ username,
            address,
            phone,
            email,
            age,
            uid: uid,}).then(()=>{
              setIsLoadingSignUp(false);
            }).catch((error)=>{
              console.log({error})
            });
       
          // setTimeout(() => {
          //   navigation.navigate(routesName.LOGIN_SCREEN);
          // }, 500);
        })
        .catch((error) => {
          setIsLoadingSignUp(false);

          console.log(error);
        });
    }
  );
  return (
    <View style={[styles.container, { paddingTop: inset.top }]}>
      {/* // FormContainer là keyboardAvoiding bao cả view */}
      <FormContainer>
        <View style={styles.boxLogo}>
          <Image
            source={{
              uri: "https://suno.vn/blog/wp-content/uploads/2014/12/nike-lich-su-thiet-ke-logo.jpg",
            }}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.textWelcome}>Welcome</Text>
        <Text style={styles.textLet}>Let's get started!</Text>
        <View>
          {/* Viết một input để sài cho nhiều lần */}
          <Controller
            name="username"
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
                placeholder="User name"
                value={value}
                onChangeText={onChange}
                placeholderTextColor={theme.colors.placeholder}
                errorMessage={errors?.username?.message}
              />
            )}
          />

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
                value={value}
                onChangeText={onChange}
                placeholderTextColor={theme.colors.placeholder}
                errorMessage={errors?.email?.message}
              />
            )}
          />

          <Controller
            name="phone"
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
                placeholder="Phone"
                keyboardType="phone-pad"
                value={value}
                onChangeText={onChange}
                placeholderTextColor={theme.colors.placeholder}
                errorMessage={errors?.phone?.message}
              />
            )}
          />
  <Controller
            name="age"
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
                placeholder="Age"
                keyboardType="numeric"
                value={value}
                onChangeText={onChange}
                placeholderTextColor={theme.colors.placeholder}
                errorMessage={errors?.age?.message}
              />
            )}
          />
          <Controller
            name="address"
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
                placeholder="Address"
                value={value}
                onChangeText={onChange}
                placeholderTextColor={theme.colors.placeholder}
                errorMessage={errors?.address?.message}
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
                issecure={true}
                placeholder="Password"
                value={value}
                onChangeText={onChange}
                placeholderTextColor={theme.colors.placeholder}
                errorMessage={errors?.password?.message}
              />
            )}
          />

          <Controller
            name="passwordConfirmation"
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
                issecure={true}
                placeholder="Password Confirmation"
                value={value}
                onChangeText={onChange}
                onSubmitEditing={onSubmit}
                placeholderTextColor={theme.colors.placeholder}
                errorMessage={errors?.passwordConfirmation?.message}
              />
            )}
          />

          {/* Button cũng vậy viết 1 lần sử dụng nhiều lần  */}
          <Button
            backgroundColor={theme.colors.orange}
            title="Sign Up"
            onPress={onSubmit}
            isLoading={isLoadingSignUp}
            disabled={isLoadingSignUp}
          />
          <Button
            onPress={() => navigation.navigate(routesName.LOGIN_SCREEN)}
            backgroundColor={theme.colors.blues}
            title="I Already have an account"
          />
        </View>
      </FormContainer>
    </View>
  );
};

export default SignUpScreen;

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
    height: 70,
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