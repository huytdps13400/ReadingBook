import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { routesName } from "./routes";
import { unAuthentication } from "../features/unauthentication";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabBars from "./bottomNavigation";
import { firebase } from "../../config/firebaseconfig";
import { bottom } from "../features/authentication";
const Stack = createStackNavigator();

const RootStack = () => {
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
   firebase.default.auth().onAuthStateChanged( (user) => {
      setIsLogin(user);

      // Do other things
    });
    return () =>{
      setIsLogin(false);
    }
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={
          isLogin ? routesName.BOTTOM_BAR : routesName.LOGIN_SCREEN
        }
      >
        <>
          {isLogin ? (
            <>
              <Stack.Screen
                name={routesName.BOTTOM_BAR}
                component={BottomTabBars}
              />
              {/* <Stack.Screen
                name={routesName.HISTORY_SCREEN}
                component={bottom.HISTORY_SCREEN}
              />
              <Stack.Screen
                name={routesName.HISTORY_DETAIL_SCREEN}
                component={bottom.HISTORY_DETAIL_SCREEN}
              /> */}
                 <Stack.Screen
                name={routesName.EDIT_PROFILE_SCREEN}
                component={bottom.EditProfileScreen}
              />
                 <Stack.Screen
                name={routesName.CHANGE_PASSWORD_SCREEN}
                component={bottom.ChangePasswordScreen}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name={routesName.LOGIN_SCREEN}
                component={unAuthentication.LOGIN_SCREEN}
              />
              <Stack.Screen
                name={routesName.SIGNUP_SCREEN}
                component={unAuthentication.SIGNUP_SCREEN}
              />
            </>
          )}
        </>
        {/* <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Settings" component={Settings} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
