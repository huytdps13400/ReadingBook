import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Keyboard, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "../../../components/Button";
import Header from "../../../components/Header";
import TextInputForm from "../../../components/TextInputForm";
import { theme } from "../../../theme";
import { changepasswordSchema } from "./changepasswordValidation";

const ChangePasswordScreen = () => {
  const inset = useSafeAreaInsets();
  const [isLoadingChangePassword, setIsLoadingChangePassword] = useState(false);
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
      passwordConfirmation: "",
    },
    mode: "onChange",
    resolver: yupResolver(changepasswordSchema),
  });
  const onSubmit = handleSubmit(({ password }) => {
    Keyboard.dismiss();
  });
  return (
    <View style={[styles.container, { paddingTop: inset.top }]}>
      <Header title="Change Password" />
      <View style={{ marginHorizontal: 20 }}>
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
              placeholder="New Password"
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
        <Button
          backgroundColor={theme.colors.orange}
          title="Change"
          onPress={onSubmit}
          isLoading={isLoadingChangePassword}
          disabled={isLoadingChangePassword}
        />
      </View>
    </View>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
});
