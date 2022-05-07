import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,LogBox } from 'react-native';
import RootStack from "./app/navigation/rootStack";
import { store } from './app/Redux/store'
import { Provider } from 'react-redux'
LogBox.ignoreAllLogs();
console.ignoredYellowBox = ["Setting a timer"];
const App = () => {
  return (
    <Provider store={store}>

      <StatusBar style="dark" />
      <RootStack />
   </Provider>
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
