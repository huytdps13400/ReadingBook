import {
  createBottomTabNavigator,
  BottomTabBar,
} from "@react-navigation/bottom-tabs";
import { Platform, StyleSheet, View } from "react-native";
import { bottom } from "../features/authentication";
import { theme } from "../theme";
import { routesName } from "./routes";
const BottomBarTab = createBottomTabNavigator();
import { TabBarAdvancedButton } from "./tabBar";
import Icon from "@expo/vector-icons/Ionicons";

const BottomTabBars = () => {
  return (
    <BottomBarTab.Navigator
      tabBar={(props) => (
        <View style={styles.navigatorContainer}>
          <BottomTabBar {...props} />
          {Platform.OS === "ios" && (
            <View
              style={[
                styles.xFillLine,
                {
                  backgroundColor: theme.colors.white,
                },
              ]}
            />
          )}
        </View>
      )}
      screenOptions={{
        showIcon: true,
        style: styles.navigator,
        tabStyle: {
          backgroundColor: theme.colors.white,
        },
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
    >
      <BottomBarTab.Screen
        name={routesName.HOME_SCREEN}
        component={bottom.HOME_SCREEN}
        options={{
          title: "",

          tabBarIcon: ({ color }) => (
            <Icon name="home" size={24} color={color} />
          ),
        }}
      />

      <BottomBarTab.Screen
        name={routesName.FAVORITES_SCREEN}
        component={bottom.Favourite_Screen}
        options={{
          tabBarButton: (props) => (
            <TabBarAdvancedButton bgColor={"#fff"} {...props} />
          ),
        }}
      />
      <BottomBarTab.Screen
        name={routesName.PROFILE_SCREEN}
        component={bottom.Profile_Screen}
        options={{
          title: "",

          tabBarIcon: ({ color }) => (
            <Icon name="person-circle" size={24} color={color} />
          ),
        }}
      />
    </BottomBarTab.Navigator>
  );
};
export default BottomTabBars;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navigatorContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  navigator: {
    borderTopWidth: 0,
    backgroundColor: "transparent",
    elevation: 30,
  },
  xFillLine: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 34,
  },
});
