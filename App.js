import React from "react";
import {Login,Register,Home,Recipe} from "./screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";

const Stack = createNativeStackNavigator();

const App = () =>{
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions = {{
                headerShown: false,
            }}
            initialRouteName = "Login">
                <Stack.Screen name="Login" component={Login}/>
                <Stack.Screen name="Register" component={Register}/>
                <Stack.Screen name="Home" component={Home}/>
                <Stack.Screen name="Recipe" component={Recipe}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};
export default App;
