import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Alert,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen() {
  const [hapticFeedback, setHapticFeedback] = useState(true);
  const [highAccuracy, setHighAccuracy] = useState(true);
  const [carLocation, setCarLocation] = useState(null);

  useEffect(() => {
    loadSettings();
    loadCarLocation();
  }, []);

  const loadSettings = async () => {
    try {
      const haptic = await AsyncStorage.getItem('hapticFeedback');
      const accuracy = await AsyncStorage.getItem('highAccuracy');
      
      if (haptic !== null) setHapticFeedback(JSON.parse(haptic));
      if (accuracy !== null) setHighAccuracy(JSON.parse(accuracy));
    } catch (error) {
      console.error('Erreur lors du chargement des paramètres:', error);
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

  const saveSetting = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    }
  };

  const clearAllData = () => {
    Alert.alert(
      'Supprimer toutes les données',
      'Cette action supprimera définitivement toutes les données de l\'application. Êtes-vous sûr ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.clear();
              setCarLocation(null);
              Alert.alert('Succès', 'Toutes les données ont été supprimées');
            } catch (error) {
              console.error('Erreur lors de la suppression:', error);
            }
          },
        },
      ]
    );
  };

  const showCarLocation = () => {
    if (carLocation) {
      Alert.alert(
        'Position de la voiture',
        `Latitude: ${carLocation.latitude.toFixed(6)}\nLongitude: ${carLocation.longitude.toFixed(6)}`,
        [{ text: 'OK' }]
      );
    } else {
      Alert.alert('Aucune voiture', 'Aucune voiture n\'est actuellement enregistrée');
    }
  };

  const SettingItem = ({ icon, title, subtitle, onPress, rightComponent }) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <View style={styles.settingLeft}>
        <Ionicons name={icon} size={24} color="#007AFF" style={styles.settingIcon} />
        <View style={styles.settingText}>
          <Text style={styles.settingTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      {rightComponent}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Général</Text>
        
        <SettingItem
          icon="car"
          title="Position de la voiture"
          subtitle={carLocation ? "Enregistrée" : "Non enregistrée"}
          onPress={showCarLocation}
          rightComponent={
            <Ionicons 
              name={carLocation ? "checkmark-circle" : "close-circle"} 
              size={24} 
              color={carLocation ? "#34C759" : "#FF3B30"} 
            />
          }
        />

        <SettingItem
          icon="vibrate"
          title="Retour haptique"
          subtitle="Vibrations lors des actions"
          onPress={() => {
            setHapticFeedback(!hapticFeedback);
            saveSetting('hapticFeedback', !hapticFeedback);
          }}
          rightComponent={
            <Switch
              value={hapticFeedback}
              onValueChange={(value) => {
                setHapticFeedback(value);
                saveSetting('hapticFeedback', value);
              }}
              trackColor={{ false: '#767577', true: '#007AFF' }}
              thumbColor={hapticFeedback ? '#fff' : '#f4f3f4'}
            />
          }
        />

        <SettingItem
          icon="locate"
          title="Précision élevée"
          subtitle="Utilise plus de batterie"
          onPress={() => {
            setHighAccuracy(!highAccuracy);
            saveSetting('highAccuracy', !highAccuracy);
          }}
          rightComponent={
            <Switch
              value={highAccuracy}
              onValueChange={(value) => {
                setHighAccuracy(value);
                saveSetting('highAccuracy', value);
              }}
              trackColor={{ false: '#767577', true: '#007AFF' }}
              thumbColor={highAccuracy ? '#fff' : '#f4f3f4'}
            />
          }
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Données</Text>
        
        <SettingItem
          icon="trash"
          title="Supprimer toutes les données"
          subtitle="Réinitialiser l'application"
          onPress={clearAllData}
          rightComponent={
            <Ionicons name="chevron-forward" size={24} color="#C7C7CC" />
          }
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>À propos</Text>
        
        <SettingItem
          icon="information-circle"
          title="Version"
          subtitle="1.0.0"
          onPress={() => {}}
          rightComponent={null}
        />

        <SettingItem
          icon="help-circle"
          title="Comment utiliser"
          subtitle="Guide d'utilisation"
          onPress={() => {
            Alert.alert(
              'Comment utiliser CarFinder',
              '1. Allez sur l\'onglet Carte\n2. Appuyez sur "Marquer voiture" pour enregistrer votre position\n3. Utilisez l\'onglet Boussole pour vous guider vers votre voiture\n4. Pointez votre téléphone vers la flèche rouge'
            );
          }}
          rightComponent={
            <Ionicons name="chevron-forward" size={24} color="#C7C7CC" />
          }
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          CarFinder - Trouvez votre voiture facilement
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  settingItem: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginHorizontal: 20,
    marginBottom: 1,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    marginRight: 15,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  footer: {
    alignItems: 'center',
    padding: 40,
  },
  footerText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
}); 