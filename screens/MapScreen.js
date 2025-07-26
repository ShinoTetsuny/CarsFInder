import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
  Linking,
} from 'react-native';
import * as Location from 'expo-location';
import * as Haptics from 'expo-haptics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function MapScreen() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [carLocation, setCarLocation] = useState(null);

  useEffect(() => {
    getCurrentLocation();
    loadCarLocation();
  }, []);

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission refusée', 'Permission de localisation nécessaire');
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setCurrentLocation(location.coords);
    } catch (error) {
      console.error('Erreur de localisation:', error);
    }
  };

  const loadCarLocation = async () => {
    try {
      const savedLocation = await AsyncStorage.getItem('carLocation');
      if (savedLocation) {
        setCarLocation(JSON.parse(savedLocation));
      }
    } catch (error) {
      console.error('Erreur lors du chargement:', error);
    }
  };

  const saveCarLocation = async (location) => {
    try {
      await AsyncStorage.setItem('carLocation', JSON.stringify(location));
      setCarLocation(location);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      Alert.alert('Succès', 'Position de la voiture enregistrée !');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    }
  };

  const markCarLocation = () => {
    if (currentLocation) {
      saveCarLocation(currentLocation);
    } else {
      Alert.alert('Erreur', 'Impossible de déterminer votre position');
    }
  };

  const clearCarLocation = () => {
    Alert.alert(
      'Supprimer la position',
      'Êtes-vous sûr de vouloir supprimer la position de votre voiture ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('carLocation');
              setCarLocation(null);
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            } catch (error) {
              console.error('Erreur lors de la suppression:', error);
            }
          },
        },
      ]
    );
  };

  const openInMaps = (location, title) => {
    const { latitude, longitude } = location;
    const url = `https://maps.apple.com/?q=${title}&ll=${latitude},${longitude}`;
    const androidUrl = `geo:${latitude},${longitude}?q=${title}`;
    
    Alert.alert(
      'Ouvrir dans Maps',
      'Choisissez votre application de cartes préférée',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Apple Maps',
          onPress: () => Linking.openURL(url),
        },
        {
          text: 'Google Maps',
          onPress: () => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`),
        },
      ]
    );
  };

  const openCarInMaps = () => {
    if (carLocation) {
      openInMaps(carLocation, 'Ma voiture');
    }
  };

  const openMyLocationInMaps = () => {
    if (currentLocation) {
      openInMaps(currentLocation, 'Ma position');
    }
  };

  const formatCoordinates = (coords) => {
    if (!coords) return 'Non disponible';
    return `${coords.latitude.toFixed(6)}, ${coords.longitude.toFixed(6)}`;
  };

  return (
    <View style={styles.container}>
      {/* Carte simulée */}
      <View style={styles.mapContainer}>
        <View style={styles.mapPlaceholder}>
          <Ionicons name="map" size={80} color="#007AFF" />
          <Text style={styles.mapText}>Carte</Text>
          <Text style={styles.mapSubtext}>
            Utilisez les boutons ci-dessous pour naviguer
          </Text>
        </View>
        
        {/* Indicateurs de position */}
        {currentLocation && (
          <View style={styles.locationIndicator}>
            <Ionicons name="navigate" size={20} color="#34C759" />
            <Text style={styles.locationText}>Votre position</Text>
          </View>
        )}
        
        {carLocation && (
          <View style={[styles.locationIndicator, styles.carLocationIndicator]}>
            <Ionicons name="car" size={20} color="#FF3B30" />
            <Text style={styles.locationText}>Votre voiture</Text>
          </View>
        )}
      </View>

      {/* Informations de position */}
      <View style={styles.infoContainer}>
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Votre position</Text>
          <Text style={styles.infoValue}>{formatCoordinates(currentLocation)}</Text>
        </View>
        
        {carLocation && (
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>Position de la voiture</Text>
            <Text style={styles.infoValue}>{formatCoordinates(carLocation)}</Text>
          </View>
        )}
      </View>

      {/* Boutons de contrôle */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={markCarLocation}>
          <Ionicons name="car" size={24} color="white" />
          <Text style={styles.buttonText}>Marquer voiture</Text>
        </TouchableOpacity>

        {carLocation && (
          <>
            <TouchableOpacity style={styles.button} onPress={openCarInMaps}>
              <Ionicons name="map" size={24} color="white" />
              <Text style={styles.buttonText}>Voir voiture</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={clearCarLocation}>
              <Ionicons name="trash" size={24} color="white" />
              <Text style={styles.buttonText}>Supprimer</Text>
            </TouchableOpacity>
          </>
        )}

        <TouchableOpacity style={styles.button} onPress={openMyLocationInMaps}>
          <Ionicons name="navigate" size={24} color="white" />
          <Text style={styles.buttonText}>Ma position</Text>
        </TouchableOpacity>
      </View>

      {/* Indicateur de statut */}
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>
          {carLocation ? 'Voiture localisée' : 'Aucune voiture enregistrée'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  mapContainer: {
    flex: 1,
    backgroundColor: '#e9ecef',
    margin: 20,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  mapPlaceholder: {
    alignItems: 'center',
    padding: 40,
  },
  mapText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  mapSubtext: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
    textAlign: 'center',
  },
  locationIndicator: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 8,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  carLocationIndicator: {
    top: 20,
    right: 20,
  },
  locationText: {
    marginLeft: 5,
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  infoContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  infoCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  buttonContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 25,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    marginLeft: 8,
    fontWeight: '600',
    fontSize: 16,
  },
  statusContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 15,
    marginHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
}); 