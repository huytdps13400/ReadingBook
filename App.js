import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,LogBox } from 'react-native';
import RootStack from "./app/navigation/rootStack";

LogBox.ignoreAllLogs();
console.ignoredYellowBox = ["Setting a timer"];
const App = () => {
  return (
    <>
      <StatusBar style="dark" />
      <RootStack />
    </>
  );
};
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
