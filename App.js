import Home from "./screens/Home";
import {StyleSheet, StatusBar, SafeAreaView} from 'react-native';
export default function App() {
  return (
    <SafeAreaView style = {styles.container}>
      <Home></Home>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex:1,
    marginTop:StatusBar.currentHeight
  }
})