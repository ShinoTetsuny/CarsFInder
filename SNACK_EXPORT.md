# 📱 Comment avoir votre app CarFinder sur votre téléphone

## 🎯 **Solution simple : Expo Snack**

### **Étape 1 : Aller sur Expo Snack**
1. Ouvrez votre navigateur
2. Allez sur : https://snack.expo.dev
3. Cliquez sur "Create a new Snack"

### **Étape 2 : Copier le code**
Copiez ce code dans l'éditeur :

```javascript
// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

import MapScreen from './screens/MapScreen';
import CompassScreen from './screens/CompassScreen';
import SettingsScreen from './screens/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Carte') {
              iconName = focused ? 'map' : 'map-outline';
            } else if (route.name === 'Boussole') {
              iconName = focused ? 'compass' : 'compass-outline';
            } else if (route.name === 'Paramètres') {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: 'gray',
          headerStyle: {
            backgroundColor: '#f8f9fa',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        })}
      >
        <Tab.Screen name="Carte" component={MapScreen} />
        <Tab.Screen name="Boussole" component={CompassScreen} />
        <Tab.Screen name="Paramètres" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
```

### **Étape 3 : Ajouter les dépendances**
Dans la section "Dependencies" de Snack, ajoutez :
- @react-navigation/native
- @react-navigation/bottom-tabs
- react-native-screens
- react-native-safe-area-context
- expo-location
- expo-sensors
- expo-haptics
- @react-native-async-storage/async-storage

### **Étape 4 : Tester sur votre téléphone**
1. Installez "Expo Go" sur votre téléphone
2. Scannez le QR code affiché sur Snack
3. Votre application se télécharge automatiquement

### **Étape 5 : Sauvegarder**
1. Cliquez sur "Save" dans Snack
2. Notez l'URL générée
3. Vous pourrez y accéder à tout moment

## 🎉 **Avantages de cette méthode :**
- ✅ **Pas besoin de PC** après la création
- ✅ **Application fonctionnelle** sur votre téléphone
- ✅ **Mise à jour automatique** quand vous modifiez le code
- ✅ **Gratuit** et simple
- ✅ **Partageable** avec d'autres personnes

## 📱 **Pour utiliser votre app :**
1. Ouvrez Expo Go sur votre téléphone
2. Scannez le QR code de votre Snack
3. L'application se charge et fonctionne !

## 🔄 **Pour modifier l'app :**
1. Allez sur l'URL de votre Snack
2. Modifiez le code
3. Sauvegardez
4. L'app se met à jour automatiquement sur votre téléphone

---
**Votre application CarFinder sera maintenant disponible directement sur votre téléphone !** 