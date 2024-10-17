import 'react-native-gesture-handler';
import 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar'; 
import { StyleSheet, Image, View } from 'react-native';
import Home from './screens/Home.jsx';
import Profile from './screens/Profile.jsx';
import Login from './screens/Login.jsx';
import AddStoryModal from './components/AddStoryModal.jsx'; 
import ProfilePosts from './components/Profileposts.jsx';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import SessionProvider, { useSessionContext } from './utils/context.js';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const AddStory = () => null;

function Tabs() {  
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 50, 
          position: 'absolute', 
          bottom: 0, 
        },
        tabBarShowLabel: false, 
        tabBarItemStyle: {
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100%', 
        },
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={Home} 
        options={{ 
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="home-outline" color={color} size={size} /> 
          ),
        }} 
      />

      <Tab.Screen
        name="AddStory"
        component={AddStory}
        options={{
          tabBarIcon: () => (
            <View style={styles.addButton}>
              <Icon name="add" size={28} color="#FFF" />
            </View>
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate('AddStoryModal'); 
          },
        })}
      />

      <Tab.Screen 
        name="Profile" 
        options={{ 
          headerShown: false,
          tabBarIcon: () => (
            <Image 
              source={require('./assets/images.jpg')} 
              style={{ width: 25, height: 25, borderRadius: 25 }}
            />
          ),
        }}> 
        {(props) => <Profile {...props} />}  
      </Tab.Screen>
    </Tab.Navigator>
  );
}

const AppNavigator = () => {
  const value = useSessionContext()
  const logged = !!value.session

  useEffect(() => {
    console.log(`L'utente è ${logged ? 'loggato' : 'disconnesso'}`); 
  }, [logged]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {logged ? (
          <>
            <Stack.Screen name="Tabs" options={{ headerShown: false }}>
              {(props) => <Tabs {...props} />}  
            </Stack.Screen>
            <Stack.Screen 
              name="AddStoryModal" 
              component={AddStoryModal} 
              options={{ presentation: 'modal', headerShown: false }} 
            />
            <Stack.Screen 
              name="ProfilePosts" 
              component={ProfilePosts} 
              options={{ headerShown: false }} 
            />
          </>
        ) : (
          <Stack.Screen name="Login" options={{ headerShown: false }}>
            {(props) => <Login {...props} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  )
}

const App = () => {
  return (
    <SessionProvider>
      <AppNavigator />
    </SessionProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    width: 50,
    height: 50,
    backgroundColor: '#FF4500', 
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20, 
  },
});

export default App;
