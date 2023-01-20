import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import Clock from '../components/Clock';
const Stack = createStackNavigator();

export default function NavigationStack() {
  return (
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen name="Home" component={Home}
        options={() => ({
            title: (<Clock/>),
            headerTitleAlign: "center",
            headerTintColor: "#fff",
            headerStyle: {
              backgroundColor: "#f1c40f",
            }
          })}
      />
    </Stack.Navigator>
  );
}