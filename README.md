# CarFinder 🚗

Une application mobile simple et élégante pour localiser votre voiture facilement.

## Fonctionnalités

- **Carte interactive** : Marquez l'emplacement de votre voiture sur une carte
- **Boussole intelligente** : Utilisez la boussole pour vous guider vers votre voiture
- **Interface épurée** : Design moderne et intuitif
- **Stockage local** : Vos données restent sur votre appareil
- **Retour haptique** : Vibrations pour une meilleure expérience utilisateur

## Installation

### Prérequis

- Node.js (version 14 ou supérieure)
- Expo CLI
- Un appareil mobile ou émulateur

### Étapes d'installation

1. **Cloner le projet**
   ```bash
   git clone <votre-repo>
   cd CarFinder
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Lancer l'application**
   ```bash
   npx expo start
   ```

4. **Installer sur votre appareil**
   - Scannez le QR code avec l'application Expo Go (iOS/Android)
   - Ou appuyez sur 'a' pour Android ou 'i' pour iOS dans le terminal

## Utilisation

### Première utilisation

1. **Autoriser la localisation** : L'application demandera l'autorisation d'accéder à votre position
2. **Marquer votre voiture** : Allez sur l'onglet "Carte" et appuyez sur "Marquer voiture"
3. **Trouver votre voiture** : Utilisez l'onglet "Boussole" pour vous guider

### Onglets de l'application

#### 🗺️ Carte
- **Marquer voiture** : Enregistre votre position actuelle comme celle de votre voiture
- **Voir voiture** : Centre la carte sur l'emplacement de votre voiture
- **Ma position** : Centre la carte sur votre position actuelle
- **Supprimer** : Efface la position enregistrée de votre voiture

#### 🧭 Boussole
- **Flèche rouge** : Pointe vers votre voiture
- **Distance** : Affiche la distance jusqu'à votre voiture
- **Direction** : Indique la direction cardinale
- **Actualiser** : Met à jour votre position

#### ⚙️ Paramètres
- **Retour haptique** : Active/désactive les vibrations
- **Précision élevée** : Améliore la précision GPS (utilise plus de batterie)
- **Supprimer données** : Réinitialise complètement l'application
- **Guide d'utilisation** : Instructions détaillées

## Permissions requises

- **Localisation** : Pour déterminer votre position et celle de votre voiture
- **Magnétomètre** : Pour le fonctionnement de la boussole (Android)

## Technologies utilisées

- **React Native** : Framework de développement mobile
- **Expo** : Plateforme de développement et déploiement
- **React Native Maps** : Intégration de cartes
- **Expo Location** : Services de géolocalisation
- **Expo Sensors** : Accès aux capteurs (magnétomètre)
- **AsyncStorage** : Stockage local des données

## Développement

### Structure du projet

```
CarFinder/
├── App.js                 # Point d'entrée principal
├── screens/               # Écrans de l'application
│   ├── MapScreen.js      # Écran de carte
│   ├── CompassScreen.js  # Écran de boussole
│   └── SettingsScreen.js # Écran des paramètres
├── assets/               # Images et ressources
└── package.json          # Dépendances du projet
```

### Scripts disponibles

- `npm start` : Lance le serveur de développement
- `npm run android` : Lance sur émulateur Android
- `npm run ios` : Lance sur émulateur iOS
- `npm run web` : Lance en mode web

## Support

Pour toute question ou problème :
1. Vérifiez que votre GPS est activé
2. Assurez-vous d'avoir accordé les permissions de localisation
3. Redémarrez l'application si nécessaire

## Version

Version actuelle : 1.0.0

---

Développé avec ❤️ pour vous aider à ne plus perdre votre voiture ! 