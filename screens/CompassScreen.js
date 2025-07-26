import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import { Magnetometer } from 'expo-sensors';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function CompassScreen() {
  const [magnetometer, setMagnetometer] = useState(0);
  const [subscription, setSubscription] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [carLocation, setCarLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const [bearing, setBearing] = useState(null);

  useEffect(() => {
    _subscribe();
    getCurrentLocation();
    loadCarLocation();
    return () => _unsubscribe();
  }, []);

  useEffect(() => {
    if (currentLocation && carLocation) {
      calculateDistanceAndBearing();
    }
  }, [currentLocation, carLocation]);

  const _subscribe = () => {
    setSubscription(
      Magnetometer.addListener((data) => {
        setMagnetometer(data);
      })
    );
    Magnetometer.setUpdateInterval(100);
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

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

  const calculateDistanceAndBearing = () => {
    if (!currentLocation || !carLocation) return;

    const R = 6371; // Rayon de la Terre en km
    const lat1 = currentLocation.latitude * Math.PI / 180;
    const lat2 = carLocation.latitude * Math.PI / 180;
    const deltaLat = (carLocation.latitude - currentLocation.latitude) * Math.PI / 180;
    const deltaLon = (carLocation.longitude - currentLocation.longitude) * Math.PI / 180;

    const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
              Math.cos(lat1) * Math.cos(lat2) *
              Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distanceKm = R * c;
    setDistance(distanceKm);

    const y = Math.sin(deltaLon) * Math.cos(lat2);
    const x = Math.cos(lat1) * Math.sin(lat2) -
              Math.sin(lat1) * Math.cos(lat2) * Math.cos(deltaLon);
    const bearingRad = Math.atan2(y, x);
    const bearingDeg = (bearingRad * 180 / Math.PI + 360) % 360;
    setBearing(bearingDeg);
  };

  const getCompassRotation = () => {
    if (!bearing) return 0;
    
    const compassHeading = magnetometer ? 
      Math.atan2(magnetometer.y, magnetometer.x) * 180 / Math.PI : 0;
    
    return bearing - compassHeading;
  };

  const formatDistance = (distance) => {
    if (distance < 1) {
      return `${Math.round(distance * 1000)} m`;
    } else {
      return `${distance.toFixed(1)} km`;
    }
  };

  const getDirectionText = (bearing) => {
    if (!bearing) return '';
    
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(bearing / 45) % 8;
    return directions[index];
  };

  if (!carLocation) {
    return (
      <View style={styles.container}>
        <View style={styles.noCarContainer}>
          <Ionicons name="car-outline" size={80} color="#ccc" />
          <Text style={styles.noCarText}>Aucune voiture enregistrée</Text>
          <Text style={styles.noCarSubtext}>
            Allez sur l'onglet Carte pour marquer la position de votre voiture
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Compass */}
      <View style={styles.compassContainer}>
        <View style={styles.compassOuter}>
          <View style={styles.compassInner}>
            <View
              style={[
                styles.compassArrow,
                { transform: [{ rotate: `${getCompassRotation()}deg` }] }
              ]}
            >
              <Ionicons name="car" size={40} color="#FF3B30" />
            </View>
          </View>
        </View>
      </View>

      {/* Distance and Direction Info */}
      <View style={styles.infoContainer}>
        <View style={styles.infoCard}>
          <Ionicons name="navigate" size={24} color="#007AFF" />
          <Text style={styles.infoLabel}>Distance</Text>
          <Text style={styles.infoValue}>
            {distance ? formatDistance(distance) : 'Calcul...'}
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Ionicons name="compass" size={24} color="#007AFF" />
          <Text style={styles.infoLabel}>Direction</Text>
          <Text style={styles.infoValue}>
            {bearing ? `${Math.round(bearing)}° ${getDirectionText(bearing)}` : 'Calcul...'}
          </Text>
        </View>
      </View>

      {/* Instructions */}
      <View style={styles.instructionsContainer}>
        <Text style={styles.instructionsText}>
          Pointez votre téléphone vers la flèche rouge pour trouver votre voiture
        </Text>
      </View>

      {/* Refresh Button */}
      <TouchableOpacity style={styles.refreshButton} onPress={getCurrentLocation}>
        <Ionicons name="refresh" size={24} color="white" />
        <Text style={styles.refreshButtonText}>Actualiser</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noCarContainer: {
    alignItems: 'center',
    padding: 40,
  },
  noCarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    textAlign: 'center',
  },
  noCarSubtext: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
    textAlign: 'center',
    lineHeight: 22,
  },
  compassContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  compassOuter: {
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  compassInner: {
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#e9ecef',
  },
  compassArrow: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  infoCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  instructionsContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginHorizontal: 20,
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  instructionsText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    lineHeight: 22,
  },
  refreshButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  refreshButtonText: {
    color: 'white',
    marginLeft: 8,
    fontWeight: '600',
  },
}); 