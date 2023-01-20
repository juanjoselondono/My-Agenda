import Home from "./screens/Home";
import {StyleSheet, StatusBar, SafeAreaView} from 'react-native';
import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
export default function App() {
  const [fontsLoaded] = useFonts({
    'Monserrat': require('./assets/fonts/Montserrat-Medium.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <SafeAreaView style = {styles.container}>
      <Home style = {{ fontFamily: 'Monserrat'}}></Home>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex:1,
    marginTop:StatusBar.currentHeight
  }
})